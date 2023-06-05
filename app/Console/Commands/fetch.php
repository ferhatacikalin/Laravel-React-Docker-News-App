<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models\Article;
use App\News\NewsCollector;
use App\News\NewsProcessor;
use App\News\NewsAggregator;
use App\News\Enums\NewsCategory;
use Carbon\Carbon;

class fetch extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:fetchDaily {--dateRange=30}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch news articles from NewsAPI, The Guardian, and The New York Times.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */










    public function handle()
    {

        // Create an instance of the NewsCollector class
        $newsCollector = new NewsCollector();

        // Define the categories
        $categories = NewsCategory::getCategories();
        $currentDate = Carbon::today();
        $dateRange = $this->option('dateRange');
        // Iterate over the categories and fetch/save news articles
        for ($i = 0; $i < $dateRange; $i++) {
            // Calculate the current date and the next date
            $fromDate = $currentDate->subDays(1)->toDateString();
            $toDate = $currentDate->toDateString();
            foreach ($categories as $category) {



                // Collect news articles
                $newsData = $newsCollector->collectNews($category, $fromDate, $toDate);

                // Extract the article data from the collected news data
                $newsApiArticles = $newsData['newsApiData'];
                $guardianArticles = $newsData['guardianData'];
                $nyTimesArticles = $newsData['newYorkTimesData'];


                // Process the articles using the NewsProcessor class
                $processedArticles = NewsProcessor::processArticles($newsApiArticles, $guardianArticles, $nyTimesArticles);

                // Aggregate the processed articles using the NewsAggregator class
                $aggregatedArticles = NewsAggregator::aggregateArticles($processedArticles);

                // Display and save the aggregated articles
                foreach ($aggregatedArticles as $articleData) {
                    $articleData['category'] = $category;
                    $url = $articleData['url'];

                    // Check if the article with the same URL already exists
                    $existingArticle = Article::where('url', $url)->first();

                    if ($existingArticle === null) {
                        // Print out the article details
                        echo 'Id: ' . $articleData['id'] . PHP_EOL;
                        echo 'Source: ' . $articleData['source'] . PHP_EOL;
                        echo 'Title: ' . $articleData['title'] . PHP_EOL;
                        echo 'Description: ' . $articleData['description'] . PHP_EOL;
                        echo 'URL: ' . $articleData['url'] . PHP_EOL;
                        echo 'Published At: ' . $articleData['publishedAt'] . PHP_EOL;
                        echo 'Image: ' . $articleData['image'] . PHP_EOL;
                        echo PHP_EOL;

                        // Save the article to the database
                        $article = new Article($articleData);
                        $article->save();
                    }
                }
            }
        }

        return 0;
    }
}
