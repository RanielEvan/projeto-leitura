// GUARD
export const appGuard = (to, from, next) => {
  const fn = () => {
    // Obtem o usuario
    let usuario = JSON.parse(window.localStorage.getItem("leituraUsuario"));

    // Valida
    if (to.name == "pratica" && !usuario) {
      return;
    } else if (to.name == "inicio" && usuario) {
      return;
    }

    next();
  };

  return fn();
};
