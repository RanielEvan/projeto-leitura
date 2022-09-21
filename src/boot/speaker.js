import { boot } from "quasar/wrappers";

export default boot(({ app, store }) => {
  let pitch = 1;
  let rate = 1;
  let synth = window.speechSynthesis;

  function speak(textStr) {
    store.commit("app/setSpeaking");

    store.state.app.isSpeaking;

    if (store.state.app.isSpeaking) {
      console.error("speechSynthesis.speaking");
      return;
    }

    if (textStr) {
      let sInstance = new SpeechSynthesisUtterance(textStr);
      sInstance.onend = function (event) {
        console.log("SpeechSynthesisUtterance.onend", event);
      };
      sInstance.onerror = function (event) {
        console.log("SpeechSynthesisUtterance.onerror", event);
      };

      sInstance.pitch = pitch;
      sInstance.rate = rate;

      synth.speak(sInstance);
    }
  }

  // Torna a chamada global
  app.config.globalProperties.$speak = speak;
});
