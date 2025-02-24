<?php

namespace App\Http\Controllers\Admin;

use App\Functions\Helper;
use App\Http\Controllers\Controller;
use App\Models\Technology;
use Illuminate\Http\Request;

class TechnologyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $technologies = Technology::orderby('id', 'desc')->get();
        return response()->json($technologies);
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
        $data = $request->all();
        $data['slug'] = Helper::generateSlug($data['name'], Technology::class);
        $technology = Technology::create($data);
        return response()->json($technology, 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        // $request->validate([
        // 'name' => 'required|string|max:100|min:5',
        // ]);
        $data = $request->all();
        $technology = Technology::find($id);

        if ($data['name'] != $technology->name) {
            $data['slug'] = Helper::generateSlug($technology['name'], Technology::class);
        }

        if (!$technology) {
            return response()->json(['error' => 'Tipo non trovato'], 404);
        }

        $technology->update([
            'name' => $request->name,
            'slug' => $request->slug
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $technology = Technology::find($id);
        if ($technology) {
            $technology->delete();
            return response()->json(['message' => 'Tecnologia eliminata con successo'], 201);
        }
        return response()->json(['message' => 'Tecnologia non trovata'], 404);
    }
}
