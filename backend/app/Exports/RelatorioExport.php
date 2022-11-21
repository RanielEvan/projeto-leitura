<?php

namespace App\Exports;

use App\Models\Frase;
use App\Models\Relatorio;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;

class RelatorioExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
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

        $ultimo_nivel = Frase::orderBy('nivel', 'desc')->first()->nivel;

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

        return $users;
    }
}
