<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $url = env("APP_URL") . '/login/authenticate';

        $request->validate([
            'Username' => 'required|string',
            'Password' => 'required|string',
        ]);

        // Enviar la solicitud POST a la API externa
        $response = Http::post($url, [
            'Username' => $request->Username,
            'Password' => $request->Password,
        ]);

        return $response->json();
    }

    
}
