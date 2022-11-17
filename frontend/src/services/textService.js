import { api } from "boot/axios";
import store from "../store";

export async function obterTextoDoNivel(userID, setLevelMethod) {
  let textToGo = "";
  try {
    let dados = await api.get(`/frase/get-frase?id_user=${userID}`);
    textToGo = dados.data.frase;

    if (setLevelMethod) {
      setLevelMethod(textToGo);
    }
  } catch (e) {
    console.log(e);
  }

  return textToGo;
}

export async function salvarSessaoLeitura(sessionObj) {
  // const serviceObj = {
  //   user: appState.userObj,
  //   transcriptions: appState.transcriptSessions,
  //   level: appState.level,
  //   dateTime: new Date().toISOString(),
  // };
  // console.log("OBJ TO SEND", JSON.stringify(serviceObj));
  // return serviceObj;

  try {
    let form = new FormData();
    form.append("id_user", sessionObj.idUser);
    form.append("id_frase", sessionObj.idFrase);
    form.append("resposta", sessionObj.transcript);
    form.append("porcentagem_acerto", sessionObj.acuracy);

    await api.post("/frase/enviar-resposta-frase", form);
  } catch (e) {
    console.log(e);
  }
}
