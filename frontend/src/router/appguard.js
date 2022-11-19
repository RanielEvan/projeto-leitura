// GUARD
export const appGuard = (to, from, next) => {
  const fn = () => {
    // Obtem o usuario
    let usuario = JSON.parse(window.localStorage.getItem("leituraUsuario"));

    if (usuario && to.name == "inicio") {
      return;
    }

    if (!usuario && (to.name == "praticar" || to.name == "relatorio")) {
      next("inicio");
      return;
    }

    next();
  };

  return fn();
};
