<?php

namespace App\Http\Requests\ForgotPassword;

use Illuminate\Foundation\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'IdUsuario'=> 'required|string',
            'IdEmisor' => 'required|string',
            'ContrasenaNuevaTMP' => 'required|string|min:8',
            "ConfirmarcontrasenaTMP" => 'required|string|min:8'
        ];
    }
}
