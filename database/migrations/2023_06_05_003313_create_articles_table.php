<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesTable extends Migration
{
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('source')->nullable();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->text('url')->nullable();
            $table->dateTime('published_at')->default(now());
            $table->text('image')->nullable();
            $table->text('category')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('articles');
    }
}
