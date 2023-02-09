<?php

namespace App\Exports;

use App\Models\Detalle;
use App\Models\Veedor;
use DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;



class ActasExport implements FromCollection, WithHeadings, WithColumnWidths, WithStyles, WithColumnFormatting
{
    protected $iddignidad, $cod_canton, $cod_parroquia, $tipo_acta;

    public function __construct(int $iddignidad, int $cod_canton, int $cod_parroquia, int $tipo_acta) {
        $this->iddignidad = $iddignidad;
        $this->cod_canton = $cod_canton;
        $this->cod_parroquia = $cod_parroquia;
        $this->tipo_acta = $tipo_acta;

    }

    public function columnWidths(): array
    {
        return [
            'A' => 22,
            'B' => 30,
            'C' => 27,
            'D' => 50,
            'E' => 15,
            'F' => 20,
            'G' => 20,
            'H' => 20,
            'I' => 20,
            'J' => 20,
            'K' => 30
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('A1')->getFont()->setBold(true);
        $sheet->getStyle('B1')->getFont()->setBold(true);
        $sheet->getStyle('C1')->getFont()->setBold(true);
        $sheet->getStyle('D1')->getFont()->setBold(true);
        $sheet->getStyle('E1')->getFont()->setBold(true);
        $sheet->getStyle('F1')->getFont()->setBold(true);
        $sheet->getStyle('G1')->getFont()->setBold(true);
        $sheet->getStyle('H1')->getFont()->setBold(true);
        $sheet->getStyle('I1')->getFont()->setBold(true);
        $sheet->getStyle('J1')->getFont()->setBold(true);
        $sheet->getStyle('K1')->getFont()->setBold(true);


    }

    public function columnFormats(): array
    {
        return [
            'A' => NumberFormat::FORMAT_TEXT,
        ];
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function headings(): array
    {
        return [
            'Canton',
            'Parroquia',
            'Zona',
            'Recinto',
            'Junta',
            'Dignidad',
            'Total Huellas',
            'Votos Blancos',
            'Votos Nulos',
            'Cuadrada',
            'Digitador'
        ];
    }

    public function collection()
    {

        $actas = Detalle::from('acta as acta')
                        ->select(DB::raw('  cantones.nombre_canton,
                                            parroquias.nombre_parroquia,
                                            zonas.nombre_zona,
                                            recintos.nombre_recinto,
                                            junta1.junta_nombre as junta_string,
                                            dignidad.nombre_dignidad,
                                            acta.num_validos,
                                            acta.num_blancos,
                                            acta.num_nulos,
                                            acta.cuadrada,
                                            usuario.nombres'))
                        ->join('dignidad as dignidad', 'dignidad.iddignidad', 'acta.fr_id_dignidad')
                        ->join('junta as junta1', 'acta.fr_id_junta', 'junta1.idjunta')
                        ->join('zonas as zonas', 'junta1.fr_id_zona', 'zonas.idzonas')
                        ->join('parroquias as parroquias', 'parroquias.cod_parroquia', 'zonas.cod_parroquia')
                        ->join('cantones as cantones', 'cantones.cod_canton', 'parroquias.cod_canton')
                        ->join('usuario as usuario', 'usuario.idusuario', 'acta.acta_usu_ing')
                        ->leftJoin('recintos as recintos', 'recintos.cod_recinto', 'junta1.cod_recinto')
                        ->dignidad($this->iddignidad)
                        ->canton($this->cod_canton)
                        ->parroquia($this->cod_parroquia)
                        ->cuadrada($this->tipo_acta)
                        ->orderBy('nombre_parroquia', 'ASC')
                        ->get();

        return $actas;
    }
}
