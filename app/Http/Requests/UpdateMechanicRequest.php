<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateMechanicRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->hasRole('admin') ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $mechanicId = $this->route('mechanic')?->id;

        return [
            'user_id' => ['nullable', 'exists:users,id'],
            'employee_id' => ['required', 'string', 'max:50', 'unique:mechanics,employee_id,'.$mechanicId],
            'name' => ['required', 'string', 'max:255'],
            'specialization' => ['nullable', 'string', 'max:255'],
            'contact' => ['required', 'string', 'max:50'],
        ];
    }
}
