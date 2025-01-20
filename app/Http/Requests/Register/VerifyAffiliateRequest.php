<?php

namespace App\Http\Requests\Register;

use Illuminate\Foundation\Http\FormRequest;

class VerifyAffiliateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'Cedula' => 'required|string|max:11',
            'Numero' => 'required|string|size:6',
            'FechaNacimiento' => 'required|string',
        ];
    }
}
