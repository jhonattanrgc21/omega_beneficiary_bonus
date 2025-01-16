<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class CheckOTPRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'IdAfiliado' => 'required|string',
            'Correo' => 'required|string|mail|max:80',
            'TokenCorreo' => 'required|string|size:6',
        ];
    }
}
