<?php

namespace App\Services;

use App\Models\Part;
use App\Models\Service;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CostEstimatorService
{
    public function estimate(array $serviceIds, array $partIds): array
    {
        $services = Service::whereIn('id', $serviceIds)->get();
        $parts = Part::whereIn('id', $partIds)->get();

        $aiSuggestion = $this->getAiSuggestion($services, $parts);

        $baseHours = (float) $services->sum('base_labor_hours');
        if ($baseHours <= 0) {
            $baseHours = count($services) * 1.5;
        }

        $laborHours = isset($aiSuggestion['estimated_labor_hours']) && is_numeric($aiSuggestion['estimated_labor_hours']) && $aiSuggestion['estimated_labor_hours'] > 0
            ? (float) $aiSuggestion['estimated_labor_hours']
            : $baseHours;

        $avgHourlyRate = (float) ($services->avg('hourly_rate') ?: 65.00);
        $laborCost = round($laborHours * $avgHourlyRate, 2);
        $partsCost = round((float) $parts->sum('unit_price'), 2);
        $total = round($laborCost + $partsCost, 2);

        $suggestedServices = $aiSuggestion['suggested_services'] ?? [];
        if (empty($suggestedServices)) {
            $serviceNames = $services->pluck('name')->map(fn ($n) => strtolower($n))->toArray();
            if (in_array('brake pad replacement', $serviceNames) || in_array('brake service', $serviceNames)) {
                $suggestedServices[] = 'Brake Rotor Inspection & Brake Fluid Replacement';
            }
            if (in_array('oil change', $serviceNames)) {
                $suggestedServices[] = 'Engine Air Filter & Cabin Filter Inspection';
            }
            if (in_array('tire rotation', $serviceNames)) {
                $suggestedServices[] = 'Wheel Alignment & Pressure Calibration';
            }
            if (empty($suggestedServices)) {
                $suggestedServices[] = 'Comprehensive Multi-Point Safety Inspection';
            }
        }

        $notes = $aiSuggestion['notes'] ?? 'Estimated using vehicle service labor benchmarks ($'.$avgHourlyRate.'/hr rate) and parts pricing.';

        return [
            'services' => $services->pluck('name')->toArray(),
            'parts' => $parts->pluck('name')->toArray(),
            'labor_hours' => $laborHours,
            'hourly_rate' => $avgHourlyRate,
            'labor_cost' => $laborCost,
            'parts_cost' => $partsCost,
            'total_estimate' => $total,
            'ai_suggested_services' => $suggestedServices,
            'ai_notes' => $notes,
        ];
    }

    protected function getAiSuggestion($services, $parts): array
    {
        $servicesList = $services->map(fn ($s) => "{$s->name} (base {$s->base_labor_hours}h)")->implode(', ');
        $partsList = $parts->map(fn ($p) => "{$p->name} (\${$p->unit_price})")->implode(', ');

        $prompt = <<<PROMPT
        A customer's vehicle is being serviced. Selected services: {$servicesList}.
        Selected parts: {$partsList}.

        Based on this, suggest any additional related services or parts the 
        customer might reasonably need, and estimate total labor hours for 
        ALL selected services combined (a realistic mechanic estimate, not 
        just the sum of base hours).

        Respond with ONLY valid JSON, no other text, in this exact format:
        {"suggested_services": ["string", "string"], "estimated_labor_hours": number, "notes": "short string"}
        PROMPT;

        try {
            $apiKey = config('services.anthropic.key');
            if (! $apiKey) {
                return [];
            }

            $response = Http::withHeaders([
                'x-api-key' => $apiKey,
                'anthropic-version' => '2023-06-01',
                'content-type' => 'application/json',
            ])->timeout(15)->post('https://api.anthropic.com/v1/messages', [
                'model' => 'claude-3-5-sonnet-20241022',
                'max_tokens' => 500,
                'messages' => [
                    ['role' => 'user', 'content' => $prompt],
                ],
            ]);

            if ($response->failed()) {
                Log::warning('AI cost estimator request failed', ['body' => $response->body()]);

                return [];
            }

            $text = $response->json('content.0.text', '{}');
            $cleaned = trim(preg_replace('/```json|```/', '', $text));

            return json_decode($cleaned, true) ?? [];
        } catch (\Throwable $e) {
            Log::warning('AI cost estimator error: '.$e->getMessage());

            return [];
        }
    }
}
