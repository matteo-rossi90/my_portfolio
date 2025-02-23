<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ViewController extends Controller
{
    public function totalViews()
    {
        $totalViews = View::count();

        return response()->json($totalViews, 200);
    }

    public function view(Request $request)
    {
        // Recupera i parametri dalla richiesta
        // $id = $request->query('id');
        // $startDate = $request->query('start_date');
        // $endDate = $request->query('end_date');

        // Esegui la query per trovare le viste suddivise per mese
        $views = View::select(
                        DB::raw("YEAR(date_view) as year"),
                        DB::raw("MONTH(date_view) as month"),
                        DB::raw("COUNT(*) as view_count")
                    )
                    // ->where('project_id', $id)
                    // ->whereBetween('date_view', [$startDate, $endDate])
                    ->groupBy(DB::raw("YEAR(date_view)"), DB::raw("MONTH(date_view)"))
                    ->orderBy(DB::raw("YEAR(date_view)"), 'asc')
                    ->orderBy(DB::raw("MONTH(date_view)"), 'asc')
                    ->get();

        // Restituisci i risultati come risposta JSON
        return response()->json($views, 200);
    }
}
