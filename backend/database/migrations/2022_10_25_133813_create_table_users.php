<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('users')){
            Schema::create('users', function (Blueprint $table) {
                $table->id();
                $table->string('nome');
                $table->integer('idade');
                $table->tinyText('sexo');
                $table->string('profissao');
                $table->string('nivel_escolaridade');
                $table->string('motivo_deixar_escola')->nullable();
                $table->string('motivo_voltar_escola')->nullable();
                $table->integer('id_turma')->unsigned()->nullable();
                $table->integer('nivel')->default(1);
                $table->boolean('termo')->default(false);
                $table->enum('status', ['Ativo', 'Inativo'])->default('Ativo');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
