// GUARD
export const appGuard = (to, from, next) => {
  const fn = () => {
    // Obtem o usuario
    let usuario = JSON.parse(window.localStorage.getItem("leituraUsuario"));

    // Valida
    if (to.name == "pratica" && !usuario) {
      if (from.name != "inicio") {
        next("inicio");
      }
      return;
    } else if (to.name == "inicio" && usuario) {
      if (from.name != "pratica") {
        next("pratica");
      }
      return;
    }

    next();
  };

  return fn();
};
