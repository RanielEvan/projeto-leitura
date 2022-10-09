const textArray = [
  "Olá mundo",
  "Um novo nível",
  "Paredes pintadas",
  "Hoje é dia de estudo",
  "Mensagens",
  //...
];

export function getTextFromLevel(level) {
  const textToGo = textArray[level - 1]; // textArray[Math.floor(Math.random() * textArray.length)];
  console.log("OBTENDO UM NOVO TEXTO: " + textToGo);
  return textToGo;
}

export function getTextArray() {
  return textArray;
}
