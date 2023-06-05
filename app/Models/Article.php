<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'source',
        'title',
        'description',
        'url',
        'published_at',
        'image',
        'category',
    ];
}
