export default function () {
  return {
    userName: "User",

    isListening: false,
    isSpeaking: false,

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
