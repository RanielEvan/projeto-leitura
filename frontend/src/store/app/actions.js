// export function startSpeech(context) {
//   console.log(context);
// }
import { getTextFromLevel } from "src/services/textService";
import { saveReadingSession } from "src/services/userService";

export function newLevel(context) {
  console.log(context);
  const nextLevel = context.state.level + 1;
  const levelText = getTextFromLevel(nextLevel);

  // Seta o nivel
  context.commit("setLevel", { level: nextLevel, text: levelText });

  return levelText;
}

export async function finalizeSessions(context) {
  const resp = await saveReadingSession(context.state);
  console.log("SAVE SESSIONS RESPONSE", resp);
  return resp;
}

export function resetLevel(context) {
  context.commit("setLevel", { level: 1, text: getTextFromLevel(1) });
}
