<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Turma extends Model
{
    protected $table = 'turmas';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nome',
        'escola',
        'descricao',
        'cidade',
        'created_at',
        'updated_at'
    ];

    public function findAll($props)
    {
        $selects = isset($props['selects']) ? $props['selects'] : ['turmas.8'];
        return Turma::select($selects)->get();
    }
}
