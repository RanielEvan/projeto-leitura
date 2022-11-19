<?php

namespace App\Http\Controllers\relatorio;

use App\Http\Controllers\Controller;
use App\Models\Frase;
use App\Models\User;
use Illuminate\Http\Request;

class RelatorioController extends Controller
{
    protected $user;
    protected $frase;

    public function __construct(User $user, Frase $frase)
    {
        $this->user = $user;
        $this->frase = $frase;
    }

    public function buscarRelatorioGeral(Request $request)
    {
        try {
            $params['id_user'] = $request['id_user'];
            $params['selects'] = ['respostas.id', 'respostas.id_frase', 'respostas.porcentagem_acerto', 'frases.texto as frase', 'frases.nivel'];

            $ultimo_nivel = $this->frase->orderBy('nivel', 'desc')->first()->nivel;

            $niveis = [];
            for($nivel = 1; $nivel <= $ultimo_nivel; $nivel++) {
                $dadosNivel['titulo'] = 'Nível ' . $nivel;

                $params['nivel'] = $dadosNivel['id'] = $nivel;
                $respostas = $this->frase->findRespostas($params);

                if($dadosNivel['situacao'] = (bool)$respostas->first()){
                    $dadosNivel['frases'] = $this->frase->whereIn('id', $respostas->pluck('id_frase'))->get();

                    foreach($dadosNivel['frases'] as $frase){
                        $respostas_frase = $respostas->where('id_frase', $frase->id);
                        $frase->tentativas = $respostas_frase->count();
                        $frase->porcentagem_acerto =  round(($respostas_frase->sum('porcentagem_acerto') / $respostas_frase->count()));
                    }
                    $dadosNivel['porcentagem_geral'] = round(($respostas->sum('porcentagem_acerto') / $respostas->count()));
                }else{
                    $dadosNivel['frases'] = [];
                    $dadosNivel['porcentagem_geral'] = 0;
                }

                $niveis[] = $dadosNivel;
            }

            return response()->json(['success' => true, 'niveis' => $niveis]);
        } catch (\Exception $exception) {
            return response()->json(['success' => false, 'message' => $exception->getMessage()], 500);
        }
    }
}
