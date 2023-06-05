<?php
namespace App\News;
class NewsProcessor {
    public static function processArticles($newsApiArticles, $guardianArticles, $nyTimesArticles) {
        $processedArticles = [];

        // Process NewsAPI articles
        foreach ($newsApiArticles as $article) {
            $processedArticles[] = [
                'source' => 'NewsAPI',
                'id' => $article['source']['id'],
                'title' => $article['title'],
                'description' => $article['description'],
                'url' => $article['url'],
                'publishedAt' => $article['publishedAt'],
                'image' => isset($article['urlToImage']) ? $article['urlToImage'] : null,
            ];
        }

        // Process Guardian articles
        foreach ($guardianArticles as $article) {
            $processedArticles[] = [
                'source' => 'The Guardian',
                'id' => $article['id'],
                'title' => $article['webTitle'],
                'description' => $article['fields']['trailText'],
                'url' => $article['webUrl'],
                'publishedAt' => $article['webPublicationDate'],
                'image' => isset($article['fields']['thumbnail']) ? $article['fields']['thumbnail'] : null,
            ];
        }

        // Process New York Times articles
        foreach ($nyTimesArticles as $article) {
            $processedArticles[] = [
                'source' => 'The New York Times',
                'id' => $article['_id'],
                'title' => $article['headline']['main'],
                'description' => $article['abstract'],
                'url' => $article['web_url'],
                'publishedAt' => $article['pub_date'],
                'image' => isset($article['multimedia'][0]['url']) ? $article['multimedia'][0]['url'] : null,
            ];
        }

        return $processedArticles;
    }
}
