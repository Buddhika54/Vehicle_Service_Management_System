<?php

namespace App\Http\Requests;

use App\Models\Customer;
use App\Models\Vehicle;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'vehicle_id' => [
                'required',
                'integer',
                'exists:vehicles,id',
                function ($attribute, $value, $fail) {
                    $user = $this->user();
                    if (! $user) {
                        return;
                    }

                    if ($user->hasRole('customer')) {
                        $customer = Customer::where('user_id', $user->id)
                            ->orWhere('email', $user->email)
                            ->first();

                        if (! $customer) {
                            $fail('Customer profile not found.');

                            return;
                        }

                        $belongsToCustomer = Vehicle::where('id', $value)
                            ->where('customer_id', $customer->id)
                            ->exists();

                        if (! $belongsToCustomer) {
                            $fail('The selected vehicle does not belong to your account.');
                        }
                    }
                },
            ],
            'scheduled_at' => ['required', 'date', 'after:now'],
            'service_type' => ['required', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
