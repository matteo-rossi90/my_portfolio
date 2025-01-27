<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    use HasFactory;

    protected $fillable = [

        'project_id',
        'IP_address',
        'date_view'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
