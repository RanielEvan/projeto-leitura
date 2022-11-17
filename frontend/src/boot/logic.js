import {boot} from "quasar/wrappers";
import {obterTextoDoNivel} from "src/services/textService";
import {setLevel} from "src/store/app/mutations";

export default boot(({app, store}) => {
  // let errorMargin = 0;

  function compareTranscript(transcript) {
    let acuracy = 0;

    const transcriptLower = transcript.toLowerCase().trim();
    const textToTalkLower = store.state.app.textToTalk.toLowerCase().trim();

    console.log("TRANSCRIPT", transcriptLower);
    console.log("WORDS TO TALK", textToTalkLower);

    if (transcriptLower == textToTalkLower) {
      console.log("OK - Transcrição correta!");
      acuracy = 1;

      const textEl = document.getElementById("text-to-talk");
      for (let it = 0; it < textEl.children.length; it++) {
        textEl.children[it].classList = ["correct-word"];
      }
    } else {
      // LOGICAS TESTE
      const transcriptSplitted = transcriptLower.split(" ");
      const transcriptWordCount = transcriptSplitted.length;

      const textToTalkSplitted = textToTalkLower.split(" ");
      const textToTalkWordCount = textToTalkSplitted.length;

      const biggerTextWordCount =
        transcriptWordCount > textToTalkWordCount
          ? transcriptWordCount
          : textToTalkWordCount;
      let partial = (1 / biggerTextWordCount).toFixed(2);

      // console.log("transcriptSplitted:", transcriptSplitted);
      // console.log("transcriptWordCount:", transcriptWordCount);
      // console.log("textToTalkSplitted:", textToTalkSplitted);
      // console.log("textToTalkWordCount:", textToTalkWordCount);
      // console.log("partial:", partial);

      // Text Element
      const textEl = document.getElementById("text-to-talk");

      for (let it = 0; it < textToTalkWordCount; it++) {
        // console.log("1 ->", transcriptSplitted[it]);
        if (!textEl.children[it]) continue;

        textEl.children[it].classList = [];

        if (transcriptSplitted[it] == textToTalkSplitted[it]) {
          textEl.children[it].classList.add("correct-word");
          acuracy += Number(partial);
        } else {
          textEl.children[it].classList.add("wrong-word");
        }
      }
    }

    // CASO DE ACERTO DO TEXTO
    // if (acuracy == 1) {
      // handleNewLevel();
    // }

    return acuracy;
  }

  //
  function handleNewLevel() {
    // store.dispatch("app/newLevel").then((resp) => {
      // if (!resp) {
      //   console.log("RESETANDO!!");
      //   app.config.globalProperties.$stopListening();
      //   store.dispatch("app/finalizeSessions");
      //   store.dispatch("app/resetLevel");
      // }
    // });
  }

  // async startTextReading() {
  //   const textWordList = this.$refs.textToTalk.children;
  //   console.log("TEXT WORD LIST", textWordList);

  //   for (let i = 0; i < textWordList.length; i++) {
  //     if (this.isReadingWord) {
  //     }
  //     // console.log("PALAVRA", textWordList[i].innerText);
  //     textWordList[i].className = "selected";
  //     await this.$speak(textWordList[i].innerText);
  //     this.isReadingWord = true;
  //   }
  // },

  // function stopListening() {
  //   recognition.stop();
  //   recognition.onend = () => {
  //     store.commit("app/setListening", false);

  //     // finalTranscript = "";
  //     console.log("Parou de ouvir");
  //   };
  // }

  // Torna a chamada global
  app.config.globalProperties.$compareTranscript = compareTranscript;
});
