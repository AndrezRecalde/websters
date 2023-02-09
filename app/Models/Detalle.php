<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detalle extends Model
{
    use HasFactory;

    protected $table = 'acta';

    public function scopeDignidad($query, $iddignidad)
    {
        if ($iddignidad > 0) {
           return $query->where('acta.fr_id_dignidad', $iddignidad);
        }
    }

    public function scopeCanton($query, $cod_canton)
    {
        if($cod_canton > 0) {
            return $query->where('acta.cod_canton', $cod_canton);
        }
    }

    public function scopeParroquia($query, $cod_parroquia)
    {
        if($cod_parroquia > 0){
            return $query->where('acta.cod_parroquia', $cod_parroquia);
        }
    }

    public function scopeCuadrada($query, $tipo_acta)
    {

            return $query->where('acta.cuadrada', $tipo_acta);

    }


}
