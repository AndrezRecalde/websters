<?php

namespace App\Http\Controllers;

use App\Models\Detalle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/* Tabla: acta */

class ActaController extends Controller
{
    public function getActas(Request $request)
    {
        $actas = Detalle::from('acta as acta')
                        ->select(DB::raw('acta.idacta,
                                            acta.cod_provincia,
                                            acta.cod_canton,acta.cod_parroquia,
                                            acta.cod_zona,fr_id_junta,
                                            junta1.junta_nombre as junta_string,
                                            acta.fr_id_dignidad,
                                            acta.cne_cod_acta,
                                            acta.num_validos,
                                            acta.num_no_voto,
                                            acta.num_blancos,
                                            acta.num_nulos,
                                            acta.acta_usu_ing,
                                            acta.acta_usu_mod,
                                            acta.acta_fi,
                                            acta.acta_um,
                                            acta.cuadrada,
                                            acta.legible,
                                            acta.fr_id_acta_estado,
                                            dignidad.nombre_dignidad,
                                            zonas.nombre_zona,
                                            parroquias.nombre_parroquia,
                                            cantones.nombre_canton,
                                            recintos.nombre_recinto,
                                            usuario.nombres'))
                        ->join('dignidad as dignidad', 'dignidad.iddignidad', 'acta.fr_id_dignidad')
                        ->join('junta as junta1', 'acta.fr_id_junta', 'junta1.idjunta')
                        ->join('zonas as zonas', 'junta1.fr_id_zona', 'zonas.idzonas')
                        ->join('parroquias as parroquias', 'parroquias.cod_parroquia', 'zonas.cod_parroquia')
                        ->join('cantones as cantones', 'cantones.cod_canton', 'parroquias.cod_canton')
                        ->join('usuario as usuario', 'usuario.idusuario', 'acta.acta_usu_ing')
                        ->leftJoin('recintos as recintos', 'recintos.cod_recinto', 'junta1.cod_recinto')
                        ->dignidad($request->iddignidad)
                        ->canton($request->cod_canton)
                        ->parroquia($request->cod_parroquia)
                        ->cuadrada($request->tipo_acta)
                        ->orderBy('nombre_parroquia', 'ASC')
                        ->get();

        return response()->json(['status' => 'success', 'actas' => $actas]);
    }

    public function getAllActas(Request $request)
    {
        $actas = Detalle::from('acta as acta')
                        ->select(DB::raw('acta.idacta,
                                            acta.cod_provincia,
                                            acta.cod_canton,acta.cod_parroquia,
                                            acta.cod_zona,fr_id_junta,
                                            junta1.junta_nombre as junta_string,
                                            acta.fr_id_dignidad,
                                            acta.cne_cod_acta,
                                            acta.num_validos,
                                            acta.num_no_voto,
                                            acta.num_blancos,
                                            acta.num_nulos,
                                            acta.acta_usu_ing,
                                            acta.acta_usu_mod,
                                            acta.acta_fi,
                                            acta.acta_um,
                                            acta.cuadrada,
                                            acta.legible,
                                            acta.fr_id_acta_estado,
                                            dignidad.nombre_dignidad,
                                            zonas.nombre_zona,
                                            parroquias.nombre_parroquia,
                                            cantones.nombre_canton,
                                            recintos.nombre_recinto,
                                            usuario.nombres'))
                        ->join('dignidad as dignidad', 'dignidad.iddignidad', 'acta.fr_id_dignidad')
                        ->join('junta as junta1', 'acta.fr_id_junta', 'junta1.idjunta')
                        ->join('zonas as zonas', 'junta1.fr_id_zona', 'zonas.idzonas')
                        ->join('parroquias as parroquias', 'parroquias.cod_parroquia', 'zonas.cod_parroquia')
                        ->join('cantones as cantones', 'cantones.cod_canton', 'parroquias.cod_canton')
                        ->join('usuario as usuario', 'usuario.idusuario', 'acta.acta_usu_ing')
                        ->leftJoin('recintos as recintos', 'recintos.cod_recinto', 'junta1.cod_recinto')
                        ->dignidad($request->iddignidad)
                        ->canton($request->cod_canton)
                        ->parroquia($request->cod_parroquia)
                        ->orderBy('nombre_parroquia', 'ASC')
                        ->get();

        return response()->json(['status' => 'success', 'actas' => $actas]);
    }
}
