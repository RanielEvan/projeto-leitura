<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Turma;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    protected $user;
    protected $turma;

    public function __construct(User $user, Turma $turma)
    {
        $this->user = $user;
        $this->turma = $turma;
    }

    public function buscarUsers(Request $request)
    {
        try {
            $users = $this->user->findAll();

            return response()->json(['success' => true, 'users' => $users]);
        } catch (\Exception $exception) {
            return response()->json(['success' => false, 'message' => $exception->getMessage()], 500);
        }
    }

    public function buscarDadosSelects(Request $request)
    {
        try {
            $outro['id'] = 'outro';
            $outro['nome'] = 'Outro';

            $users = $this->user->findAll();

            $profissoes = $motivosDeixarEscola = $motivosVoltarEscola = [];
            foreach ($users as $user) {
                $profissao = ['id' => $user->profissao, 'nome' => $user->profissao];
                if ($user->profissao && !in_array($profissao, $profissoes)) {
                    $profissoes[] = $profissao;
                }

                $motivoDeixarEscola = ['id' => $user->motivo_deixar_escola, 'nome' => $user->motivo_deixar_escola];
                if ($user->motivo_deixar_escola && !in_array($motivoDeixarEscola, $motivosDeixarEscola)) {
                    $motivosDeixarEscola[] = $motivoDeixarEscola;
                }

                $motivoVoltarEscola = ['id' => $user->motivo_voltar_escola, 'nome' => $user->motivo_voltar_escola];
                if ($user->motivo_deixar_escola && !in_array($motivoVoltarEscola, $motivosVoltarEscola)) {
                    $motivosVoltarEscola[] = $motivoVoltarEscola;
                }
            }

            $profissoes[] = $motivosDeixarEscola[] = $motivosVoltarEscola[] = $outro;

            $turmas = $this->turma->findAll(['selects' => ['id', 'descricao as nome']]);

            return response()->json(['success' => true, 'profissao' => $profissoes, 'motivo_deixar_escola' => $motivosDeixarEscola, 'motivo_voltar_escola' => $motivosVoltarEscola, 'id_turma' => $turmas]);
        } catch (\Exception $exception) {
            return response()->json(['success' => false, 'message' => $exception->getMessage()], 500);
        }
    }

    public function enviarCriarUser(Request $request)
    {
        try {
            $dados = $request->all();
            $dados['termo'] = (bool)$dados['termo'];
            $user = $this->user->create($dados);

            return response()->json(['success' => true, 'usuario' => $user]);
        } catch (\Exception $exception) {
            return response()->json(['success' => false, 'message' => $exception->getMessage()], 500);
        }
    }
}
