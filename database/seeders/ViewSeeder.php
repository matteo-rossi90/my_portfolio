<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\View;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ViewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $projects = Project::all();
        $totalProjects = $projects->count();
        $start = strtotime("2024-01-01 00:00:00");
        $end = strtotime("2025-10-28 17:45:33");

        for ($i = 0; $i < $totalProjects; $i++) {
            for ($j = 0; $j < 40; $j++) {
                $new_view = new View();
                $currentProject = $projects[$i];

                $new_view->project_id = $currentProject->id;

                $randomTimestamp = rand($start, $end);
                $new_view->date_view = date("Y-m-d H:i:s", $randomTimestamp);

                $new_view->save();
            }
        }

    }
}
