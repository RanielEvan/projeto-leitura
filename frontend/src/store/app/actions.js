// export function startSpeech(context) {
//   console.log(context);
// }
import {
  obterTextoDoNivel,
  salvarSessaoLeitura,
} from "src/services/textService";

export async function newLevel(context) {
  const nextLevel = context.state.sessionLevel + 1;
  const textObj = await obterTextoDoNivel(nextLevel);

  if (nextLevel == context.state.maxSessionLevel) {
    await salvarSessaoLeitura(context.state);
  } else {
    // Seta o nivel
    context.commit("setLevel", textObj);
  }
}

export async function finalizeSessions(context) {
  const resp = await saveReadingSession(context.state);
  console.log("SAVE SESSIONS RESPONSE", resp);
  return resp;
}

export function resetLevel(context) {
  context.commit("setLevel", { level: 1, text: obterTextoDoNivel(1) });
}

export async function addTranscriptSession(context, sessionObj) {
  const usuario = JSON.parse(window.localStorage.getItem("leituraUsuario"));
  const textObj = context.state.textObj;
  sessionObj.idUser = usuario.id;
  sessionObj.idFrase = textObj.id;
  console.log("SESSION OBJ", sessionObj);
  await salvarSessaoLeitura(sessionObj);
  context.commit("addTranscriptSession", sessionObj);
}
