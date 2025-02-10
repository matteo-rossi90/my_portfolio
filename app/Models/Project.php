<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'type_id',
        'theme',
        'slug',
        'company',
        'img',
        'original_name_img',
        'start_date',
        'end_date',
        'description',
    ];

    public function type()
    {
        return $this->belongsTo(Type::class);
    }

    public function technologies()
    {
        return $this->belongsToMany(Technology::class, 'project_technology');
    }

    public function views()
    {
        return $this->hasMany(View::class);
    }
}
