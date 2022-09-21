import React, { Component } from 'react';
import axios from 'axios';
// import VoiceRSSWebApi from 'voice-rss';

//-------------- CONFIGURAÇÃO VOICERSS ---------------
// const VoiceRSSKey = 'bb0bb16b96d54bed9881de1235c8f9b9';
const VoiceRSSKey = '1329d9cacc274dcf84310bed86ef6cfb';
const VoiceLang = 'pt-br';
// const VoiceRSS = new VoiceRSSWebApi();
// VoiceRSS.setApiKey('bb0bb16b96d54bed9881de1235c8f9b9');
// VoiceRSS.setLanguage('pt-br');
//----------------------------------------------------

export class TextoParaVoz extends Component {

    constructor(){
        super()
        this.state = {
            leitura: false,
            pararAudioAtual: () => {},
        }
        this.habilitarAudioDescricao = this.habilitarAudioDescricao.bind(this)
        this.lerTexto = this.lerTexto.bind(this)
        this.pararLeitura = this.pararLeitura.bind(this)
        // this.testarAudio = this.testarAudio.bind(this)
    }

    //Habilita o modo de AudioDescricao 
    habilitarAudioDescricao() {
        this.setState({
            leitura: !this.state.leitura
        }, this.testarAudio)
    }

    //Faz a leitura do bloco de texto 
    lerTexto() {       
        let texto = document.getElementById("TextoParaLer").innerHTML;
        axios.get("https://api.voicerss.org/?key="+ VoiceRSSKey +"&hl="+ VoiceLang +"&b64=true&src="+ texto)
            .then(res => {
                var audio = new Audio(res.data);
                audio.play();
                this.setState({
                    pararAudioAtual: () => (audio.pause())
                })
            })
    }

    pararLeitura(){
        this.state.pararAudioAtual();
    }
    // //TESTE
    // testarAudio () {
    //     let teste = "Bem vindos ao TAJ, plataforma com informações jurídicas para Portadores de Deficiência Audiovisual.";
    //     axios.get("https://api.voicerss.org/?key="+ VoiceRSSKey +"&hl="+ VoiceLang +"&b64=true&src="+ teste)
    //         .then(res => {
    //             console.log(teste);
    //             new Audio(res.data).play();
    //         })
    // }

    componentDidMount(){
        // this.testarAudio();
        //document.getElementById("iniciarAudioDescricao").click();
    }

    render() {
        return(
            
            <div hidden="hidden">
                <div id="TextoParaLer"></div>
                <button hidden="hidden" id="LerTexto" onClick={this.lerTexto}></button>
                <button hidden="hidden" id="PararLeitura" onClick={this.pararLeitura}></button>
            </div>

        );
    }

}