const { agregarUsuarioBD, loginBD, obtenerDatosUsuarioLogueadoBD } = require('./consultas_usuarios');

const agregarUsuario = async (email, password) => {
  if (email != '' && password != '') {
    try {
      await agregarUsuarioBD(email, password);
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
  return true;
};

const login = async (email, password) => {
  if (email != '' && password != '') {
    try {
      const resultado = await loginBD(email, password);
      if (!resultado) {
        return false;
      }
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
  return true;
};

const obtenerDatosUsuarioLogueado = async (email) => {
  const resultado = await obtenerDatosUsuarioLogueadoBD(email);
  return resultado;
}

module.exports = { agregarUsuario, login, obtenerDatosUsuarioLogueado };