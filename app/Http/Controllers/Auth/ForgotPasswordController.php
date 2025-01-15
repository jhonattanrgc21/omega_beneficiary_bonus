<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPassword\AnswerChallengeRequest;
use App\Http\Requests\ForgotPassword\ValidateAffiliateRequest;
use App\Services\HttpService;

class ForgotPasswordController extends Controller
{
    protected $validateAffiliateUrl = '/validar/afiliado';
    protected $answerChallengeUrl = '/desafio/responder';
    protected $apiService;

    public function __construct(HttpService $apiService)
    {
        $this->apiService = $apiService;
    }

    public function validateAffiliate(ValidateAffiliateRequest $request)
    {
        $contentType = $request->header('Content-Type');
        $accept = $request->header('Accept');

        $headers = [
            'Content-Type' => $contentType,
            'Accept' => $accept,
        ];

        return $this->apiService->post($this->validateAffiliateUrl, $request->validated(), $headers);
    }

    public function answerChallenge(AnswerChallengeRequest $request)
    {
        $contentType = $request->header('Content-Type');
        $accept = $request->header('Accept');

        $headers = [
            'Content-Type' => $contentType,
            'Accept' => $accept,
        ];

        return $this->apiService->post($this->answerChallengeUrl, $request->validated(), $headers);
    }
}
