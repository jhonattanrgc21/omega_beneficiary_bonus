<?php

namespace App\Http\Requests\Register;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'desafio1' => 'required|string',
            "desafio2" => 'required|string',
            'desafio3' => 'required|string',
            'Respuesta1' => 'required|string|max:100',
            "Respuesta2" => 'required|string|max:100',
            'Respuesta3' => 'required|string|max:100',
            'IdEmisor' => 'required|string',
            "Usuario" => 'required|string',
            'Contrasena' => 'required|string|min:8',
            'ConfirmarContrasena' => 'required|string|min:8',
            "Correo" => 'required|string|email|max:80',
            "Celular" => 'required|string|size:11',
        ];
    }
}
