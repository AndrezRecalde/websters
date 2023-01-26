<?php

namespace App\Http\Controllers;

use App\Models\Acta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WebsterController extends Controller
{
    public function getConcejalesUrbanos(Request $request)
    {
        $concejales = Acta::from('acta_detalle as ad')
            ->select(DB::raw('cn.nombre_canton,
                                        di.nombre_dignidad,
                                          ca.nombre,
                                          org.lista, org.idorganizacion, org.color, org.siglas,
                                          SUM(num_votos) as total_votos,
                                          SUM(ac.num_validos) as total_votos_validos,
                                          SUM(ac.num_no_voto) as total_votos_no_voto,
                                          SUM(ac.num_blancos) as total_votos_blancos,
                                          SUM(ac.num_nulos) as total_votos_nulos,
                                          cc.cantidad_urbanos as cantidad'))
            ->join('acta as ac', 'ad.fr_id_acta', 'ac.idacta')
            ->join('dignidad as di', 'ac.fr_id_dignidad', 'di.iddignidad')
            ->join('candidato as ca', 'ad.fr_id_candidato', 'ca.idcandidato')
            ->join('organizacion as org', 'org.idorganizacion', 'ca.fr_id_organizacion')
            ->join('junta as ju', 'ju.idjunta', 'ac.fr_id_junta')
            ->join('zonas as z', 'z.idzonas', 'ac.cod_zona')
            ->join('parroquias as pa', 'ac.cod_parroquia', 'pa.cod_parroquia')
            ->join('cantones as cn', 'cn.cod_canton', 'pa.cod_canton')
            ->join('cantidad_concejales as cc', 'cc.cod_canton', 'ac.cod_canton')
            ->dignidad($request->iddignidad)
            ->canton($request->cod_canton)
            /* ->parroquia($request->cod_parroquia) */
            ->groupBy('ad.fr_id_candidato', 'di.nombre_dignidad', 'ca.nombre', 'cn.nombre_canton', 'cc.cantidad_urbanos')
            ->orderBy('total_votos', 'DESC')
            ->get();

        return response()->json(['status' => 'success', 'concejales' => $concejales]);
    }

    public function getConcejalesRurales(Request $request)
    {
        $concejales = Acta::from('acta_detalle as ad')
            ->select(DB::raw('cn.nombre_canton,
                                        di.nombre_dignidad,
                                          ca.nombre,
                                          org.lista, org.idorganizacion, org.color, org.siglas,
                                          SUM(num_votos) as total_votos,
                                          SUM(ac.num_validos) as total_votos_validos,
                                          SUM(ac.num_no_voto) as total_votos_no_voto,
                                          SUM(ac.num_blancos) as total_votos_blancos,
                                          SUM(ac.num_nulos) as total_votos_nulos,
                                          cc.cantidad_rurales as cantidad'))
            ->join('acta as ac', 'ad.fr_id_acta', 'ac.idacta')
            ->join('dignidad as di', 'ac.fr_id_dignidad', 'di.iddignidad')
            ->join('candidato as ca', 'ad.fr_id_candidato', 'ca.idcandidato')
            ->join('organizacion as org', 'org.idorganizacion', 'ca.fr_id_organizacion')
            ->join('junta as ju', 'ju.idjunta', 'ac.fr_id_junta')
            ->join('zonas as z', 'z.idzonas', 'ac.cod_zona')
            ->join('parroquias as pa', 'ac.cod_parroquia', 'pa.cod_parroquia')
            ->join('cantones as cn', 'cn.cod_canton', 'pa.cod_canton')
            ->join('cantidad_concejales as cc', 'cc.cod_canton', 'ac.cod_canton')
            ->dignidad($request->iddignidad)
            ->canton($request->cod_canton)
            /* ->parroquia($request->cod_parroquia) */
            ->groupBy('ad.fr_id_candidato', 'di.nombre_dignidad', 'ca.nombre', 'cn.nombre_canton', 'cc.cantidad_rurales')
            ->orderBy('total_votos', 'DESC')
            ->get();

        return response()->json(['status' => 'success', 'concejales' => $concejales]);
    }

    public function getJuntas(Request $request)
    {
        $juntas = Acta::from('acta_detalle as ad')
                    ->select(DB::raw('di.nombre_dignidad,
                                    pa.nombre_parroquia,
                                    ca.nombre, org.lista, org.color,
                                    org.nombre_organizacion, org.siglas,
                                    SUM(num_votos) as total_votos,
                                    SUM(ac.num_validos) as total_votos_validos,
                                    SUM(ac.num_no_voto) as total_votos_no_voto,
                                    SUM(ac.num_blancos) as total_votos_blancos,
                                    SUM(ac.num_nulos) as total_votos_nulos'))
                    ->join('acta as ac', 'ad.fr_id_acta', 'ac.idacta')
                    ->join('dignidad as di', 'ac.fr_id_dignidad', 'di.iddignidad')
                    ->join('candidato as ca', 'ad.fr_id_candidato', 'ca.idcandidato')
                    ->join('organizacion as org', 'org.idorganizacion', 'ca.fr_id_organizacion')
                    ->join('junta as ju', 'ju.idjunta', 'ac.fr_id_junta')
                    ->join('zonas as z', 'z.idzonas', 'ac.cod_zona')
                    ->join('parroquias as pa', 'ac.cod_parroquia', 'pa.cod_parroquia')
                    ->join('cantones as cn', 'cn.cod_canton', 'pa.cod_canton')
                    ->dignidad($request->iddignidad)
                    ->parroquia($request->cod_parroquia)
                    ->groupBy('ad.fr_id_candidato', 'di.nombre_dignidad', 'ca.nombre', 'pa.nombre_parroquia')
                    ->orderBy('total_votos', 'DESC')
                    ->get();

        return response()->json(['status' => 'success', 'juntas' => $juntas]);
    }

    public function getProvinciales(Request $request)
    {
        $candidatos = Acta::from('acta_detalle as ad')
                        ->select(DB::raw('di.nombre_dignidad, ca.nombre,
                                            org.lista, org.color, org.siglas, org.nombre_organizacion,
                                            SUM(ad.num_votos) as total_votos,
                                            SUM(ac.num_validos) as total_votos_validos,
                                            SUM(ac.num_no_voto) as total_votos_no_voto,
                                            SUM(ac.num_blancos) as total_votos_blancos,
                                            SUM(ac.num_nulos) as total_votos_nulos'))
                        ->join('acta as ac', 'ad.fr_id_acta', 'ac.idacta')
                        ->join('dignidad as di', 'ac.fr_id_dignidad', 'di.iddignidad')
                        ->join('candidato as ca', 'ad.fr_id_candidato', 'ca.idcandidato')
                        ->join('organizacion as org', 'org.idorganizacion', 'ca.fr_id_organizacion')
                        ->join('junta as ju', 'ju.idjunta', 'ac.fr_id_junta')
                        ->join('zonas as z', 'z.idzonas', 'ac.cod_zona')
                        ->join('parroquias as pa', 'ac.cod_parroquia', 'pa.cod_parroquia')
                        ->join('cantones as cn', 'cn.cod_canton', 'pa.cod_canton')
                        ->where('di.iddignidad', $request->iddignidad)
                        ->where('ca.fr_id_provincia', 8)
                        ->groupBy('ad.fr_id_candidato', 'di.nombre_dignidad')
                        ->orderBy('total_votos', 'DESC')
                        ->get();
        return response()->json(['status' => 'success', 'candidatos' => $candidatos]);

    }

    public function getCantonales(Request $request)
    {
        $candidatos = Acta::from('acta_detalle as ad')
                    ->select(DB::raw('di.nombre_dignidad, ca.nombre,
                                    org.lista, org.color, org.siglas, org.nombre_organizacion,
                                    SUM(ad.num_votos) as total_votos,
                                    SUM(ac.num_validos) as total_votos_validos,
                                    SUM(ac.num_no_voto) as total_votos_no_voto,
                                    SUM(ac.num_blancos) as total_votos_blancos,
                                    SUM(ac.num_nulos) as total_votos_nulos'))
                    ->join('acta as ac', 'ad.fr_id_acta', 'ac.idacta')
                    ->join('dignidad as di', 'ac.fr_id_dignidad', 'di.iddignidad')
                    ->join('candidato as ca', 'ad.fr_id_candidato', 'ca.idcandidato')
                    ->join('organizacion as org', 'org.idorganizacion', 'ca.fr_id_organizacion')
                    ->join('junta as ju', 'ju.idjunta', 'ac.fr_id_junta')
                    ->join('zonas as z', 'z.idzonas', 'ac.cod_zona')
                    ->join('parroquias as pa', 'ac.cod_parroquia', 'pa.cod_parroquia')
                    ->join('cantones as cn', 'cn.cod_canton', 'pa.cod_canton')
                    ->where('di.iddignidad', $request->iddignidad)
                    ->where('cn.cod_canton', $request->cod_canton)
                    ->groupBy('ad.fr_id_candidato', 'di.nombre_dignidad')
                    ->orderBy('total_votos', 'DESC')
                    ->get();
        return response()->json(['status' => 'success', 'candidatos' => $candidatos]);


    }

    public function getParroquial(Request $request)
    {
        $candidatos = Acta::from('acta_detalle as ad')
        ->select(DB::raw('di.nombre_dignidad, ca.nombre,
                        org.lista, org.color, org.siglas, org.nombre_organizacion,
                        SUM(ad.num_votos) as total_votos,
                        SUM(ac.num_validos) as total_votos_validos,
                        SUM(ac.num_no_voto) as total_votos_no_voto,
                        SUM(ac.num_blancos) as total_votos_blancos,
                        SUM(ac.num_nulos) as total_votos_nulos'))
        ->join('acta as ac', 'ad.fr_id_acta', 'ac.idacta')
        ->join('dignidad as di', 'ac.fr_id_dignidad', 'di.iddignidad')
        ->join('candidato as ca', 'ad.fr_id_candidato', 'ca.idcandidato')
        ->join('organizacion as org', 'org.idorganizacion', 'ca.fr_id_organizacion')
        ->join('junta as ju', 'ju.idjunta', 'ac.fr_id_junta')
        ->join('zonas as z', 'z.idzonas', 'ac.cod_zona')
        ->join('parroquias as pa', 'ac.cod_parroquia', 'pa.cod_parroquia')
        ->join('cantones as cn', 'cn.cod_canton', 'pa.cod_canton')
        ->where('di.iddignidad', $request->iddignidad)
        ->where('pa.cod_parroquia', $request->cod_parroquia)
        ->groupBy('ad.fr_id_candidato', 'di.nombre_dignidad')
        ->orderBy('total_votos', 'DESC')
        ->get();
        return response()->json(['status' => 'success', 'candidatos' => $candidatos]);
    }

    public function getRecinto(Request $request)
    {
        $candidatos = Acta::from('acta_detalle as ad')
                        ->select(DB::raw('di.nombre_dignidad, ca.nombre,
                                org.lista, org.color, org.siglas, org.nombre_organizacion,
                                SUM(ad.num_votos) as total_votos,
                                SUM(ac.num_validos) as total_votos_validos,
                                SUM(ac.num_no_voto) as total_votos_no_voto,
                                SUM(ac.num_blancos) as total_votos_blancos,
                                SUM(ac.num_nulos) as total_votos_nulos'))
                        ->join('acta as ac', 'ad.fr_id_acta', 'ac.idacta')
                        ->join('dignidad as di', 'ac.fr_id_dignidad', 'di.iddignidad')
                        ->join('candidato as ca', 'ad.fr_id_candidato', 'ca.idcandidato')
                        ->join('organizacion as org', 'org.idorganizacion', 'ca.fr_id_organizacion')
                        ->join('junta as ju', 'ju.idjunta', 'ac.fr_id_junta')
                        ->join('zonas as z', 'z.idzonas', 'ac.cod_zona')
                        ->join('parroquias as pa', 'ac.cod_parroquia', 'pa.cod_parroquia')
                        ->join('cantones as cn', 'cn.cod_canton', 'pa.cod_canton')
                        ->join('recintos as re', 're.cod_recinto', 'ju.cod_recinto')
                        ->where('di.iddignidad', $request->iddignidad)
                        ->where('re.cod_recinto', $request->cod_recinto)
                        ->groupBy('ad.fr_id_candidato', 'di.nombre_dignidad')
                        ->orderBy('total_votos', 'DESC')
                        ->get();
        return response()->json(['status' => 'success', 'candidatos' => $candidatos]);

    }
}
