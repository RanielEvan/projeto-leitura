export default function () {
  return {
    userObj: {
      name: "User",
      age: 27,
    },

    audioActive: true,

    isListening: false,
    isSpeaking: false,

    level: 1,
    textToTalk: "",
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
