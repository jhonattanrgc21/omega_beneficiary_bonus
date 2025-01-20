<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Register\RegisterRequest;
use App\Http\Requests\Register\VerifyAffiliateRequest;
use App\Services\HttpService;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    protected $verifyAffiliateUrl = '/verificar/afiliado';
    protected $questionsListUrl = '/desafio';
    protected $registerUrl = '/register';
    protected $apiService;

    public function __construct(HttpService $apiService)
    {
        $this->apiService = $apiService;
    }

    public function verifyAffiliate(VerifyAffiliateRequest $request)
    {
        $contentType = $request->header('Content-Type');
        $accept = $request->header('Accept');

        $headers = [
            'Content-Type' => $contentType,
            'Accept' => $accept,
        ];

        return $this->apiService->post($this->verifyAffiliateUrl, $request->validated(), $headers);
    }

    public function getQuestionsList(Request $request)
    {
        $contentType = $request->header('Content-Type');
        $accept = $request->header('Accept');

        $headers = [
            'Content-Type' => $contentType,
            'Accept' => $accept,
        ];

        return $this->apiService->get($this->questionsListUrl, $headers);
    }

    public function register(RegisterRequest $request)
    {
        $contentType = $request->header('Content-Type');
        $accept = $request->header('Accept');

        $headers = [
            'Content-Type' => $contentType,
            'Accept' => $accept,
        ];

        return $this->apiService->post($this->registerUrl, $request->validated(), $headers);
    }
}
