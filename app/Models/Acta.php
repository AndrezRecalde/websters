<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Acta extends Model
{
    use HasFactory;

    protected $table = 'acta_detalle';

    public function scopeDignidad($query, $iddignidad)
    {
        if ($iddignidad > 0) {
           return $query->where('di.iddignidad', $iddignidad);
        }
    }

    public function scopeCanton($query, $cod_canton)
    {
        if($cod_canton > 0) {
            return $query->where('cn.cod_canton', $cod_canton);
        }
    }

    public function scopeParroquia($query, $cod_parroquia)
    {
        if($cod_parroquia > 0){
            return $query->where('pa.cod_parroquia', $cod_parroquia);
        }
    }
}
