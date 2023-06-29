const pool = require('../modules/conexion');

const obtenerPosts = async () => {
  const { rows } = await pool.query('SELECT * FROM posts');
  return rows;
}

const agregarPost = async (titulo, img, descripcion) => {
  const consulta = 'INSERT INTO posts values (DEFAULT, $1, $2, $3, 0)';
  const values = [titulo, img, descripcion];
  //Control de errores general
  try {
    const result = await pool.query(consulta, values);
    return true;
  } catch (error) {
    return false;
  }
}

const darLikePost = async (id) => {
  const consulta = 'UPDATE posts SET likes = likes + 1 WHERE id = $1';
  const values = [id];
  try {
    const result = await pool.query(consulta, values);
    return true;
  } catch (error) {
    return false;
  }
}

const eliminarPost = async (id) => {
  const consulta = 'DELETE FROM posts WHERE id = $1';
  const values = [id];
  try {
    const result = await pool.query(consulta, values);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { obtenerPosts, agregarPost, darLikePost, eliminarPost };