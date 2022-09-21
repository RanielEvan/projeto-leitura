import { boot } from "quasar/wrappers";

export default boot(({ app, store }) => {
  const SpeechRecognition = (window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition || null);
  const recognition = new window.SpeechRecognition();

  console.log("recognition ->", recognition);

  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "pt-BR";

  function stopListening() {
    recognition.stop();
    recognition.onend = () => {
      store.commit("app/setListening", false);

      // finalTranscript = "";
      console.log("Parou de ouvir");
    };
  }

  function startListening() {
    store.commit("app/setListening", true);

    //Captura final

    // if (store.state.app.isListening) {
    recognition.start();
    recognition.onend = (event) => {
      recognition.start();
    };
    // } else {
    //   recognition.stop();
    //   recognition.onend = () => {
    //     finalTranscript = "";
    //     console.log("Parou de ouvir");
    //   };
    // }

    recognition.onstart = () => {
      // console.log("Ouvindo!")
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
          store.commit("app/addTranscriptSession", finalTranscript);
          finalTranscript = "";
        } else {
          interimTranscript += transcript;
        }
      }

      store.commit("app/setInterimTranscript", interimTranscript);

      //------------------------- Comandos Diretos ------------------------------------

      const transcriptArr = finalTranscript.split(" ");
      // console.log("transcrições:", transcriptArr);
      const stopCmd = transcriptArr.slice(-2, -1);
      // console.log("stopCmd", stopCmd);

      if (stopCmd[0] === "parar") {
        recognition.stop();
        recognition.onend = () => {
          console.log("Parou de ouvir por comando");
          store.commit("app/setListening", false);

          const finalText = transcriptArr.slice(0, -3).join(" ");
          store.commit("app/setFinalTranscript", finalText);
        };
      }

      // if (interimTranscript != "") {
      //   //Atualiza Comandos  [Componente: Comandos]
      //   document.getElementById("ComandoFalado").innerHTML = interimTranscript;
      // }

      // document.getElementById("CaptarComando").click();
      // document.getElementById('Resposta').innerHTML = finalTranscript;
    };

    //-----------------------------------------------------------------------

    recognition.onerror = (event) => {
      console.log(
        event.error == "no-speech" ? "Usuário não está falando." : event.error
      );
    };
  }

  // Torna a chamada global
  app.config.globalProperties.$startListening = startListening;
  app.config.globalProperties.$stopListening = stopListening;
});
