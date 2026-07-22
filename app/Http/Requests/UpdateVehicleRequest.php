<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->hasAnyRole(['admin', 'service_advisor']) ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $vehicleId = $this->route('vehicle')?->id ?? $this->route('vehicle');

        return [
            'customer_id' => ['required', 'exists:customers,id'],
            'registration_no' => ['required', 'string', 'max:50', Rule::unique('vehicles', 'registration_no')->ignore($vehicleId)],
            'make' => ['required', 'string', 'max:100'],
            'model' => ['required', 'string', 'max:100'],
            'year' => ['required', 'integer', 'min:1900', 'max:2099'],
            'vin' => ['nullable', 'string', 'max:50', Rule::unique('vehicles', 'vin')->ignore($vehicleId)],
            'mileage' => ['required', 'integer', 'min:0'],
        ];
    }
}
