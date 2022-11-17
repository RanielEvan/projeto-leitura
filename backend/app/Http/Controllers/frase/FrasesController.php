<?php

namespace App\Http\Controllers\frase;

use App\Http\Controllers\Controller;
use App\Models\Frase;
use App\Models\User;
use Illuminate\Http\Request;

class FrasesController extends Controller
{
    protected $user;
    protected $frase;

    public function __construct(User $user, Frase $frase)
    {
        $this->user = $user;
        $this->frase = $frase;
    }

    public function enviarAdicionarFrase(Request $request)
    {
        try {

            if ($request['senha'] != 'brena123') {
                return response()->json(['success' => false, 'message' => 'Erro ao tentar adicionar uma nova frase, senha incorreta. Procure os desenvolvedores!'], 500);
            }

            $request['created_at'] = now();
            $this->frase->insert($request->except('senha'));

            return response()->json(['success' => true, 'message' => 'Frase adicionada com sucesso']);
        } catch (\Exception $exception) {
            return response()->json(['success' => false, 'message' => $exception->getMessage()], 500);
        }
    }

    public function buscarFrase(Request $request)
    {
        try {
            $user = $this->user->where('id', $request['id_user'])->first();

            $params['id_user'] = $request['id_user'];
            $params['nivel'] = $user->nivel;
            $params['respostas_corretas'] = true;
            $params['selects'] = ['respostas.*', 'frases.nivel'];
            $respostas_corretas = $this->frase->findRespostas($params)->pluck('id_frase');

            $ultimo_nivel = $this->frase->orderBy('nivel', 'desc')->first()->nivel;

            if (!$respostas_corretas) {
                $frase = $this->frase->where('nivel', $user->nivel)->inRandomOrder()->first();
            } else {
                do {
                    $frase = $this->frase->whereNotIn('id', $respostas_corretas)->where('nivel', $user->nivel)->inRandomOrder()->first();

                    if (!$frase && $user->nivel <= $ultimo_nivel) {
                        $novo_nivel = $user->nivel + 1;
                        $this->user->where('id', $request['id_user'])->update(['nivel' => $novo_nivel]);
                        $user->nivel = $novo_nivel;
                    }

                } while (!$frase && $user->nivel < $ultimo_nivel);
            }

            if (!$frase) {
                return response()->json(['success' => false, 'message' => 'Parabéns, você completou o desafio da leitura!'], 500);
            } else {
                return response()->json(['success' => true, 'frase' => $frase]);
            }

        } catch (\Exception $exception) {
            return response()->json(['success' => false, 'message' => $exception->getMessage()], 500);
        }
    }

    public function enviarRespostaFrase(Request $request)
    {
        try {
            $dados = $request->all();
            $dados['created_at'] = now();
            $this->frase->createResposta($dados);

            return response()->json(['success' => true]);
        } catch (\Exception $exception) {
            return response()->json(['success' => false, 'message' => $exception->getMessage()], 500);
        }
    }
}
