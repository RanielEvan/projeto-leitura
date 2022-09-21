export function setListening(state, value) {
  state.isListening = value;
}

export function setInterimTranscript(state, value) {
  state.interimTranscript = value;
}

export function addTranscriptSession(state, value) {
  state.transcriptSessions.push(value);
  state.finalTranscript += `\n ${value}`;
}

export function setSpeaking(state, value) {
  state.isSpeaking = value;
}
