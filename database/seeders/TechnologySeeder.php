<?php

namespace Database\Seeders;

use App\Functions\Helper;
use App\Models\Technology;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TechnologySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            'HTML',
            'CSS',
            'JavaScript',
            'Vue.js',
            'Vite',
            'PHP',
            'Laravel',
            'Git',
            'Docker',
            'AWS'
        ];

        foreach ($data as $technology) {

            $new_technology = new Technology();
            $new_technology->name = $technology;
            $new_technology->slug = Helper::generateSlug($new_technology->name, Technology::class);
            $new_technology->save();
        }

    }
}
