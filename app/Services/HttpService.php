<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class HttpService
{
    protected $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('services.api_externa.base_url');
    }

    /**
     * Realiza una solicitud GET.
     *
     * @param string $uri
     * @param array $headers
     * @param array $query
     * @return array
     */
    public function get(string $uri, array $headers = [], array $query = [])
    {
        return Http::withHeaders($headers)->get($this->baseUrl . $uri, $query);
    }

    /**
     * Realiza una solicitud POST.
     *
     * @param string $uri
     * @param array $data
     * @param array $headers
     * @return array
     */
    public function post(string $uri, array $data = [], array $headers = [])
    {
        return Http::withHeaders($headers)->post($this->baseUrl . $uri, $data);
    }

    /**
     * Realiza una solicitud PUT.
     *
     * @param string $uri
     * @param array $data
     * @param array $headers
     * @return array
     */
    public function put(string $uri, array $data = [], array $headers = [])
    {
        return Http::withHeaders($headers)->put($this->baseUrl . $uri, $data);
    }

    /**
     * Realiza una solicitud DELETE.
     *
     * @param string $uri
     * @param array $data
     * @param array $headers
     * @return array
     */
    public function delete(string $uri, array $data = [], array $headers = [])
    {
        return Http::withHeaders($headers)->delete($this->baseUrl . $uri, $data);
    }
}
