<?php

namespace App\Http\Controllers\Admin;

use App\Functions\Helper;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Technology;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
            $projects = Project::with(['type', 'technologies', 'views'])->orderby('id', 'desc')->paginate(10);
            return response()->json($projects);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $data = json_decode($request->input('projects'), true);
        // $data = $request->validate([
        // 'title' => 'required|string|max:255',
        // 'type_id' => 'nullable|exists:types,id',
        // //'technologies' => 'nullable|exists:technologies,id',
        // 'theme' => 'nullable|string',
        // 'company' => 'nullable|string',
        // 'start_date' => 'nullable|date',
        // 'end_date' => 'nullable|date',
        // 'description' => 'nullable|string',
        // ]);

        // Se type_id è mancante o non valido, assegna un valore di default
        // if (!isset($data['type_id']) || !Type::find($data['type_id'])) {
        // $data['type_id'] = null;
        // }

        // if (!isset($data['end_date']) || !Project::find($data['end_date'])) {
        // $data['end_date'] = null;
        // }

        // Genera lo slug
        // $data['slug'] = Helper::generateSlug($data['title'], Project::class);

        // $project = Project::create($data);

        // if (!empty($data['technologies'])) {
        // $technologyIds = Technology::whereIn('name', $data['technologies'])->pluck('id')->toArray();
        // $project->technologies()->attach($technologyIds);
        // }
        // $project->technologies()->attach($data['technologies']);

        // Validazione dei dati, inclusa l'immagine
        $request->validate([
            'title' => 'required|string|max:255',
            'theme' => 'nullable|string',
            'company' => 'nullable|string',
            'description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'type_id' => 'nullable|exists:types,id',
            'technologies' => 'array',
            'technologies.*' => 'exists:technologies,id',
            'img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048' // Controllo immagine
        ]);

        // Creazione del progetto
        $data = $request->all();

        // Se è presente un'immagine, salvarla nella cartella storage/app/public/projects/
        if ($request->hasFile('img')) {
            $imagePath = $request->file('img')->store('projects', 'public');
            $data['img'] = $imagePath;
        }

        // Creazione del progetto
        $data['slug'] = Helper::generateSlug($data['title'], Project::class);
        $project = Project::create($data);

        // Associazione delle tecnologie
        if (!empty($request->technologies)) {
            $project->technologies()->attach($request->technologies);
        }


        return response()->json($project, 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $project = Project::with(['type', 'technologies', 'views'])->find($id);
        return response()->json($project);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $project = Project::find($id);

        if($project){
            $project->delete();
            return response()->json(['message' => 'Progetto eliminato con successo'], 201);
        }

        return response()->json(['message' => 'Progetto non trovato'], 404);
    }

    public function projectsPerType()
    {
        $projects = DB::table('projects')
            ->join('types', 'projects.type_id', '=', 'types.id')
            ->select('types.name as type_name', DB::raw('COUNT(*) as count'))
            ->groupBy('type_name')
            ->get();

        return response()->json($projects, 200);
    }
}
