<?php

namespace App\Http\Controllers;

use App\Models\Dignidad;
use Illuminate\Http\Request;

class DignidadController extends Controller
{
    public function getConcejales()
    {
        $dignidades = Dignidad::get(['iddignidad', 'nombre_dignidad']);

        return response()->json(array('status' => 'success', 'dignidades' => $dignidades->filter(function($value) {
            if($value->iddignidad > 2 && $value->iddignidad < 5){
                return $value;
            }
        })->values()
    ));

    }

    public function getJuntas()
    {
        $dignidades = Dignidad::get(['iddignidad', 'nombre_dignidad']);

        return response()->json(array('status' => 'success', 'dignidades' => $dignidades->filter(function($value) {
            if($value->iddignidad > 4){
                return $value;
            }
        })->values()
    ));

    }

    public function getPrefectosAlcaldes()
    {
        $dignidades = Dignidad::get(['iddignidad', 'nombre_dignidad']);

        return response()->json(array('status' => 'success', 'dignidades' => $dignidades->filter(function($value) {
            if($value->iddignidad > 0 && $value->iddignidad < 3){
                return $value;
            }
        })->values()
    ));
    }
}
