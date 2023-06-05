<?php

namespace App\News;

class NewsCollector
{
    private $NEWS_API_ORG_BASE_URL;
    private $NEWS_API_ORG_API_KEY;
    private $GUARDIAN_BASE_URL;
    private $GUARDIAN_API_KEY;
    private $NEW_YORK_TIMES_BASE_URL;
    private $NEW_YORK_TIMES_API_KEY;

    public function __construct()
    {
        $this->NEWS_API_ORG_BASE_URL = env('NEWS_API_ORG_BASE_URL');
        $this->NEWS_API_ORG_API_KEY = env('NEWS_API_ORG_API_KEY');
        $this->GUARDIAN_BASE_URL = env('GUARDIAN_BASE_URL');
        $this->GUARDIAN_API_KEY = env('GUARDIAN_API_KEY');
        $this->NEW_YORK_TIMES_BASE_URL = env('NEW_YORK_TIMES_BASE_URL');
        $this->NEW_YORK_TIMES_API_KEY = env('NEW_YORK_TIMES_API_KEY');
    }


    public function collectNews($category, $fromDate, $toDate)
    {
        $newsApiUrl = $this->NEWS_API_ORG_BASE_URL . "category=$category&from=$fromDate&to=$toDate&language=en&apiKey=" . $this->NEWS_API_ORG_API_KEY;
        $guardianUrl = $this->GUARDIAN_BASE_URL . "q=$category&from-date=$fromDate&to-date=$toDate&api-key=" . $this->GUARDIAN_API_KEY;
        $newYorkTimesUrl = $this->NEW_YORK_TIMES_BASE_URL . "fq=$category&begin_date=$fromDate&end_date=$toDate&api-key=" . $this->NEW_YORK_TIMES_API_KEY;

        $newsApiData = $this->fetchUrl($newsApiUrl);
        $guardianData = $this->fetchUrl($guardianUrl);
        $newYorkTimesData = $this->fetchUrl($newYorkTimesUrl);

        return [
            'newsApiData' => $newsApiData["articles"] ?? [],
            'guardianData' => $guardianData['response']['results'] ?? [],
            'newYorkTimesData' => $newYorkTimesData['response']['docs'] ?? [],
        ];
    }

    private function fetchUrl($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36');
        $response = curl_exec($ch);
        curl_close($ch);

        return json_decode($response, true);
    }
}
