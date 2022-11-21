<?php

namespace App\Http\Controllers\relatorio;

use App\Exports\RelatorioExport;
use App\Http\Controllers\Controller;
use App\Models\Frase;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

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
            for ($nivel = 1; $nivel <= $ultimo_nivel; $nivel++) {
                $dadosNivel['titulo'] = 'Nível ' . $nivel;

                $params['nivel'] = $dadosNivel['id'] = $nivel;
                $respostas = $this->frase->findRespostas($params);

                if ($dadosNivel['situacao'] = (bool)$respostas->first()) {
                    $dadosNivel['frases'] = $this->frase->whereIn('id', $respostas->pluck('id_frase'))->get();

                    foreach ($dadosNivel['frases'] as $frase) {
                        $respostas_frase = $respostas->where('id_frase', $frase->id);
                        $frase->tentativas = $respostas_frase->count();
                        $frase->porcentagem_acerto = round(($respostas_frase->sum('porcentagem_acerto') / $respostas_frase->count()));
                    }
                    $dadosNivel['porcentagem_geral'] = round(($respostas->sum('porcentagem_acerto') / $respostas->count()));
                } else {
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

    public function buscarRelatorioGeralSistema(Request $request)
    {
        try {
            $users = User::select('users.id', 'users.nome', 'users.idade', 'users.sexo', 'users.profissao', 'users.motivo_deixar_escola', 'users.motivo_voltar_escola', 'turmas.nome as turma', 'turmas.escola', 'users.nivel')
                ->join('turmas', 'turmas.id', '=', 'users.id_turma')
                ->where('users.status', 'Ativo')
                ->get();

            $respostas = DB::table('respostas')
                ->select('respostas.*', 'frases.nivel')
                ->join('users', 'users.id', '=', 'respostas.id_user')
                ->join('frases', 'frases.id', '=', 'respostas.id_frase')
                ->whereIn('respostas.id_user', $users->pluck('id'))
                ->get();

            $relatorio_geral['qtd_usuarios'] = $users->count();
            $relatorio_geral['qtd_respostas'] = $respostas->count();

            $frases = $this->frase->orderBy('nivel', 'desc')->get();
            $ultimo_nivel = $frases->first()->nivel;

            $niveis = [];
            for ($nivel = 1; $nivel <= $ultimo_nivel; $nivel++) {
                $dadosNivel['nivel'] = $nivel;
                $dadosNivel['qtd_frases'] = $frases->where('nivel', $nivel)->count();

                $respostas_nivel_user = $respostas->where('nivel', $nivel);

                $dadosNivel['qtd_respostas'] = $respostas_nivel_user->count();
                $dadosNivel['qtd_respostas_certas'] = $respostas_nivel_user->where('porcentagem_acerto', '>=', 70)->count();

                if ($respostas_nivel_user->count() > 0) {
                    $dadosNivel['porcentagem_acerto'] = round(($respostas_nivel_user->sum('porcentagem_acerto') / $respostas_nivel_user->count())) . '%';
                } else {
                    $dadosNivel['porcentagem_acerto'] = '0%';
                }

                $niveis[] = $dadosNivel;
            }

            foreach ($users as $user) {
                $respostas_user = $respostas->where('id_user', $user->id);

                $user->qtd_respostas = $respostas_user->count();
                $user->qtd_respostas_certas = $respostas_user->where('porcentagem_acerto', '>=', 70)->count();

                for ($nivel = 1; $nivel <= $ultimo_nivel; $nivel++) {
                    $respostas_user_nivel = $respostas_user->where('nivel', $nivel);
                    $user['qtd_respostas_nivel' . $nivel] = $respostas_user_nivel->count();
                    if ($respostas_user_nivel->count() > 0) {
                        $user['porcentagem_acerto' . $nivel] = round(($respostas_user_nivel->sum('porcentagem_acerto') / $respostas_user_nivel->count())) . '%';
                    } else {
                        $user['porcentagem_acerto' . $nivel] = '0%';
                    }
                }
            }

//            return Excel::download(new RelatorioExport, 'users.xlsx');

            return response()->json(['success' => true, 'relatorio_geral' => $relatorio_geral, 'niveis' => $niveis, 'users' => $users]);
        } catch (\Exception $exception) {
            return response()->json(['success' => false, 'message' => $exception->getMessage()], 500);
        }
    }
}
