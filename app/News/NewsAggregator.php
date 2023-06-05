<?php
namespace App\News;
class NewsAggregator {
    public static function aggregateArticles($articles) {
        $aggregatedArticles = [];

        foreach ($articles as $article) {
            $aggregatedArticles[] = [
                'source' => $article['source'],
                'id' => $article['id'],
                'title' => $article['title'],
                'description' => $article['description'],
                'url' => $article['url'],
                'publishedAt' => $article['publishedAt'],
                'image' => $article['image'],
            ];
        }

        return $aggregatedArticles;
    }
}
