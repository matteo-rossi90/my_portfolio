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
        Schema::create('projects_technologies', function (Blueprint $table) {

            $table->unsignedBigInteger('project_id');
            $table->foreign('project_id')
                    ->references('id')
                    ->on('projects')
                    ->cascadeOnDelete();

            $table->unsignedBigInteger('technology_id');
            $table->foreign('technology_id')
                    ->references('id')
                    ->on('technologies')
                    ->cascadeOnDelete();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects_technologies');
    }
};
