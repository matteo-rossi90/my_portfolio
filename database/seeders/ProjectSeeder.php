<?php

namespace Database\Seeders;

use App\Functions\Helper;
use App\Models\Project;
use App\Models\Type;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        for ($i = 0; $i < 20; $i++) {
            $new_project = new Project();
            $new_project->type_id = Type::inRandomOrder()->first()->id;
            $new_project->title = $faker->sentence(3);
            $new_project->theme = $faker->sentence(3);
            $new_project->company = $faker->sentence(3, true);
            $new_project->slug = Helper::generateSlug($new_project->title, Project::class);
            $new_project->start_date = $faker->dateTimeBetween('-8 years', '-5 years');
            $new_project->end_date = $faker->dateTimeBetween('-6 years', '-3 years');
            $new_project->description = $faker->paragraph(4);
            $new_project->save();
        }
    }

}
