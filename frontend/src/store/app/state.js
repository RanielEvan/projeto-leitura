export default function () {
  return {
    audioActive: true,

    isListening: false,
    isSpeaking: false,

    sessionLevel: 1,
    maxSessionLevel: 5,
    textToTalk: "",
    textObj: {},
    // textToTalkArray: [],

    interimTranscript: "",
    finalTranscript: "",
    transcriptSessions: [],

    userAcuracy: 0.0,

    userSpeech: [
      /*
        Array com as palavras
      */
    ],
  };
}
