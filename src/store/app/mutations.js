export function toggleAudioActive(state) {
  state.audioActive = !state.audioActive;
}

export function setListening(state, value) {
  state.isListening = value;
}

export function setInterimTranscript(state, value) {
  state.interimTranscript = value;
}

export function addTranscriptSession(state, sessionObj) {
  state.transcriptSessions.push(sessionObj);
  state.finalTranscript += `\n ${sessionObj.transcript}`;
}

export function setSpeaking(state, value) {
  state.isSpeaking = value;
}

// export function settextToTalk(state) {
//   state.textToTalk = getTextFromLevel(state.level);
// }
export function setLevel(state, { level, text }) {
  state.level = level;
  state.textToTalk = text;
}
// export function newLevel(state) {
//   state.level++;
//   state.textToTalk = getTextFromLevel(state.level);
// }
