import axios from "src/boot/axios";

export function saveReadingSession(appState) {
  const serviceObj = {
    user: appState.userObj,
    transcriptions: appState.transcriptSessions,
    level: appState.level,
    dateTime: new Date().toISOString(),
  };

  console.log("OBJ TO SEND", JSON.stringify(serviceObj));

  return serviceObj;
  // axios.post("").then((resp) => {});
}
