<?php

namespace App\Http\Requests\ForgotPassword;

use Illuminate\Foundation\Http\FormRequest;

class AnswerChallengeRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'IdUsuario' => 'required|string',
            'IdEmisor' => 'required|string',
            'Celular' => 'required|string|size:11',
            'Respuesta1' => 'required|string|max:100',
            'Respuesta2' => 'required|string|max:100',
            'Respuesta3' => 'required|string|max:100',
        ];
    }
}
