<?php

namespace App\News\Enums;

class NewsCategory
{
    public const SPORTS = 'sports';
    public const TECHNOLOGY = 'technology';
    public const ENTERTAINMENT = 'entertainment';
    public const POLITICS = 'politics';
    public const HEALTH = 'health';
    public const BUSINESS = 'business';
    public const SCIENCE = 'science';
    public const LIFESTYLE = 'lifestyle';
    public const TRAVEL = 'travel';
    public const FASHION = 'fashion';

    public static function getCategories()
    {
        return [
            self::SPORTS,
            self::TECHNOLOGY,
            self::ENTERTAINMENT,
            self::POLITICS,
            self::HEALTH,
            self::BUSINESS,
            self::SCIENCE,
            self::LIFESTYLE,
            self::TRAVEL,
            self::FASHION,
        ];
    }
}
