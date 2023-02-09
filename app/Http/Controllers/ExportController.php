<?php

namespace App\Http\Controllers;

use App\Exports\ActasAllExport;
use App\Exports\ActasExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;


class ExportController extends Controller
{
    public function actaExportExcel(Request $request)
    {
        return Excel::download(new ActasExport(
            $request->iddignidad,
            $request->cod_canton,
            $request->cod_parroquia,
            $request->tipo_acta
        ), 'actasExport.xlsx');
    }

    public function actaAllExportExcel(Request $request)
    {
        return Excel::download(new ActasAllExport(
            $request->iddignidad,
            $request->cod_canton,
            $request->cod_parroquia
        ), 'actasAllExport.xlsx');
    }
}
