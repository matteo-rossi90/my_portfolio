<?php

namespace App\Http\Controllers\Admin;

use App\Functions\Helper;
use App\Http\Controllers\Controller;
use App\Models\Type;
use Dotenv\Validator;
use Illuminate\Http\Request;

class TypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $types = Type::orderby('id', 'desc')->get();
        return response()->json($types);
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

        $data['slug'] = Helper::generateSlug($data['name'], Type::class);
        $type = Type::create($data);

        return response()->json($type, 201);
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
        $type = Type::find($id);

        if ($data['name'] != $type->name) {
            $data['slug'] = Helper::generateSlug($type['name'], Type::class);
        }

        if (!$type) {
            return response()->json(['error' => 'Tipo non trovato'], 404);
        }

        $type->update([
            'name' => $request->name,
            'slug' => $request->slug
        ]);

        return response()->json($type);






    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $type = Type::find($id);
        if ($type) {
            $type->delete();
            return response()->json(['message' => 'Tipo eliminato con successo'], 201);
        }
        return response()->json(['message' => 'Tipo non trovato'], 404);
    }
}
