const getMenuFrontEnd = (role = "USER_ROLE") => {
  const menu = [
    {
      titulo: "Dashboard",
      icono: "mdi mdi-gauge",
      subMenu: [
        { titulo: "Main", ruta: "/" },
        { titulo: "ProgressBar", ruta: "progress" },
        { titulo: "Graficas", ruta: "grafica1" },
        { titulo: "Promesas", ruta: "promesas" },
        { titulo: "Rxjs", ruta: "rxjs" },
      ],
    },
    {
      titulo: "Mantenimiento",
      icono: "mdi mdi-folder-lock-open",
      subMenu: [
        // { titulo: "Usuarios", ruta: "usuarios" },
        { titulo: "Hospitales", ruta: "hospitales" },
        { titulo: "Medicos", ruta: "medicos" },
      ],
    },
  ];
  if (role === "ADMIN_ROLE") {
    menu[1].subMenu.unshift({ titulo: "Usuarios", ruta: "usuarios" });
  }
  return menu;
};

module.exports = {
  getMenuFrontEnd,
};
