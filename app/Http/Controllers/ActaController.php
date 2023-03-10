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
                        ->orderBy('junta_string', 'ASC')
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
                        ->orderBy('junta_string', 'ASC')
                        ->get();

        return response()->json(['status' => 'success', 'actas' => $actas]);
    }

    public function getTotalActasIngresadasCanton(Request $request)
    {
        $totalActasIngresadas = Detalle::from('acta as a')
                                ->select(DB::raw('COUNT(*) AS digitadas'))
                                ->join('acta_estado as ae', 'a.fr_id_acta_estado', 'ae.idacta_estado')
                                ->join('provincia as p', 'p.cne_cod_prov', 'a.cod_provincia')
                                ->join('cantones as c', 'c.cod_canton', 'a.cod_canton')
                                ->join('parroquias as pa', 'pa.cod_parroquia', 'a.cod_parroquia')
                                ->join('zonas as z', 'z.idzonas', 'a.cod_zona')
                                ->join('dignidad as d', 'd.iddignidad', 'a.fr_id_dignidad')
                                ->join('junta as j', 'j.idjunta', 'a.fr_id_junta')
                                ->join('usuario as us', 'us.idusuario', 'a.acta_usu_ing')
                                ->where('a.fr_id_dignidad', $request->iddignidad)
                                ->where('c.cod_canton', $request->cod_canton)
                                ->get();

        return response()->json(['status' => 'success', 'totalActasIngresadas' => $totalActasIngresadas]);
    }

    public function getTotalJuntasCantonesUrbanos(Request $request)
    {
        $totalJuntasCantonesUrbanos = DB::table('junta as j')
                        ->join('zonas as zo', 'zo.idzonas', 'j.fr_id_zona')
                        ->join('parroquias as pa', 'pa.cod_parroquia', 'zo.cod_parroquia')
                        ->join('cantones as ca', 'ca.cod_canton', 'pa.cod_canton')
                        ->where('pa.cod_canton', $request->cod_canton)
                        ->where('pa.estado_parroquia', 'U')
                        ->selectRaw('COUNT(*) as total')
                        ->get();


        return response()->json(['status' => 'success', 'totalJuntasCantonesUrbanos' => $totalJuntasCantonesUrbanos]);

    }

    public function getTotalJuntasCantonesRurales(Request $request)
    {
        $totalJuntasCantonesRurales = DB::table('junta as j')
                        ->join('zonas as zo', 'zo.idzonas', 'j.fr_id_zona')
                        ->join('parroquias as pa', 'pa.cod_parroquia', 'zo.cod_parroquia')
                        ->join('cantones as ca', 'ca.cod_canton', 'pa.cod_canton')
                        ->where('pa.cod_canton', $request->cod_canton)
                        ->where('pa.estado_parroquia', 'R')
                        ->selectRaw('COUNT(*) as total')
                        ->get();


        return response()->json(['status' => 'success', 'totalJuntasCantonesRurales' => $totalJuntasCantonesRurales]);

    }

    public function getTotalJuntasParroquia(Request $request)
    {
        $totalJuntasParroquia = DB::table('junta as ju')
                                ->join('zonas as zo', 'zo.idzonas', 'ju.fr_id_zona')
                                ->join('parroquias as pa', 'pa.cod_parroquia', 'zo.cod_parroquia')
                                ->join('cantones as ca', 'ca.cod_canton', 'pa.cod_canton')
                                ->where('pa.cod_parroquia', $request->cod_parroquia)
                                ->selectRaw('COUNT(*) as total')
                                ->get();

        return response()->json(['status' => 'success', 'totalJuntasParroquia' => $totalJuntasParroquia]);
    }

    public function getTotalActasIngresadasParr(Request $request)
    {
        $totalActasIngresadasParr = DB::table('acta as a')
                                    ->join('provincia as p', 'p.cne_cod_prov', 'a.cod_provincia')
                                    ->join('cantones as c', 'c.cod_canton', 'a.cod_canton')
                                    ->join('parroquias as pa', 'pa.cod_parroquia', 'a.cod_parroquia')
                                    ->join('zonas as z', 'z.idzonas', 'a.cod_zona')
                                    ->join('dignidad as d', 'd.iddignidad', 'a.fr_id_dignidad')
                                    ->join('junta as j', 'j.idjunta', 'a.fr_id_junta')
                                    ->join('usuario as us', 'us.idusuario', 'a.acta_usu_ing')
                                    ->where('a.fr_id_dignidad', $request->iddignidad)
                                    ->where('pa.cod_parroquia', $request->cod_parroquia)
                                    ->selectRaw('COUNT(*) as digitadas')
                                    ->get();

        return response()->json(['status' => 'success', 'totalActasIngresadasParr' => $totalActasIngresadasParr]);
    }
}
