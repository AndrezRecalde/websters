<?php

namespace App\Http\Controllers;

use App\Models\Canton;
use App\Models\Parroquia;
use App\Models\Recinto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatesController extends Controller
{
    public function getCantones()
    {
        $cantones = Canton::get(['cod_canton','nombre_canton']);

        return response()->json(['status' => 'success', 'cantones' => $cantones]);

    }

    public function getParroquias(Request $request)
    {
        $parroquias = Parroquia::from('parroquias as p')
                        ->select(DB::raw('p.cod_parroquia, p.nombre_parroquia'))
                        ->join('cantones as c', 'p.cod_canton', 'c.cod_canton')
                        ->where('p.cod_canton', $request->cod_canton)
                        ->get();

        return response()->json(['status' => 'success', 'parroquias' => $parroquias]);
    }

    public function getParroquiasRurales(Request $request)
    {
        $parroquias = Parroquia::from('parroquias as p')
                        ->select(DB::raw('p.cod_parroquia, p.nombre_parroquia'))
                        ->join('cantones as c', 'p.cod_canton', 'c.cod_canton')
                        ->where('p.cod_canton', $request->cod_canton)
                        ->where('p.estado_parroquia', 'R')
                        ->get();

        return response()->json(['status' => 'success', 'parroquias' => $parroquias]);
    }

    public function getRecintos(Request $request)
    {
        $recintos = Recinto::from('recintos as re')
                            ->select(DB::raw('re.cod_recinto, re.nombre_recinto'))
                            ->join('parroquias as p', 're.cod_parroquia', 'p.cod_parroquia')
                            ->where('re.cod_parroquia', $request->cod_parroquia)
                            ->get();
        return response()->json(['status' => 'success', 'recintos' => $recintos]);

    }

    public function getCantonesUrbanos()
    {
        $cantones = Canton::get(['cod_canton','nombre_canton']);

        return response()->json(array('status' => 'success', 'cantones' => $cantones->filter(function($value) {
            if($value->cod_canton !== 3 && $value->cod_canton !== 6){
                return $value;
            }
        })->values()
    ));
    }

    public function getCantonesRurales()
    {
        $cantones = Canton::get(['cod_canton','nombre_canton']);

        return response()->json(array('status' => 'success', 'cantones' => $cantones->filter(function($value) {
            if( $value->cod_canton !== 3 && $value->cod_canton !== 4 && $value->cod_canton !== 5 ){
                return $value;
            }
        })->values()
    ));
    }
}
