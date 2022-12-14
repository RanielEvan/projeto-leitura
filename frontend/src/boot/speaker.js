import { boot } from "quasar/wrappers";

export default boot(({ app, store }) => {
  let pitch = 1;
  let rate = 1.0;
  let synth = window.speechSynthesis;
  let voice = null;

  function speak(textStr) {
    if (!store.state.app.audioActive) return;

    stopSpeak();
    // console.log("VOICES", synth.getVoices());

    // Obtemos a voz
    voice = synth.getVoices().find((vc) => {
      return vc.name.includes("Google português do Brasil");
    });

    store.commit("app/setSpeaking", true);

    // if (store.state.app.isSpeaking) {
    //   console.log("speechSynthesis.speaking");
    //   return;
    // }

    if (textStr) {
      let sInstance = new SpeechSynthesisUtterance(textStr);
      sInstance.onend = function (event) {
        // console.log("TERMINOU UMA FALA! ", event);
        store.commit("app/setSpeaking", false);
      };
      sInstance.onerror = function (event) {
        // console.log("SPEECH -> ERROR", event);
        store.commit("app/setSpeaking", false);
      };

      sInstance.pitch = pitch;
      sInstance.rate = rate;
      sInstance.voice = voice;

      synth.speak(sInstance);
    }
  }

  function stopSpeak() {
    synth.cancel();
  }

  // Torna a chamada global
  app.config.globalProperties.$speak = speak;
  app.config.globalProperties.$stopSpeak = stopSpeak;
});
