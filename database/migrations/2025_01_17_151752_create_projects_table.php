<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('type_id')->nullable();
            $table->foreign('type_id')
                    ->references('id')
                    ->on('types')
                    ->cascadeOnDelete();
            $table->string('title', 100);
            $table->string('theme', 100);
            $table->string('company', 100);
            $table->string('slug', 100);
            $table->string('img')->nullable();
            $table->string('original_name_img')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
};
