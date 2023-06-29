const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { api_secret, api_token_expired_time } = require('./config');
const { agregarUsuario, login, obtenerDatosUsuarioLogueado } = require('./modules/controlador_usuarios');
const { obtenerPosts, agregarPost, darLikePost, eliminarPost } = require('./modules/controlador_posts');
const app = express();
app.listen(3000, console.log('Server ON'));

app.use(cors());
app.use(express.json());

app.post('/usuarios', async (req, res) => {
    const { email, password } = req.body;
    const resultado = await agregarUsuario(email, password);
    if (resultado) {
      res.status(200).send('Usuario agregado con éxito');
    } else {
      res.status(500).send('Ocurrió un error');
    }
  });
  
  //credenciales para login
  app.post('/login', async (req, res) => {
      try {
          const { email, password } = req.body;
          const resultado = await login(email, password);
      if (resultado) {
        const token = jwt.sign({ email }, api_secret, {
          expiresIn: api_token_expired_time//segundos
        });
        res.send(token);
      } else {
        res.status(500).send('Ocurrió un error');
      }
      } catch (error) {
          res.status(error.code || 500).send(error.message || 'Ocurrió un error');
      }
  });
  
  app.get('/usuarios', async (req, res) => {
    const Authorization = req.header('Authorization');
    const token = Authorization.split('Bearer ')[1];
    jwt.verify(token, api_secret);
    const { email } = jwt.decode(token);
    const resultado = await obtenerDatosUsuarioLogueado(email);
    res.json(resultado);
  });


  //POST COMENTARIOS PROBANDO


  app.get('/posts', async (req, res) => {
    const posts = await obtenerPosts();
    res.json(posts);
  });
  
  app.post('/posts', async (req, res) => {
    const { titulo, img, descripcion } = req.body;
    const result = await agregarPost(titulo, img, descripcion);
    //Control de error
    if (result) {
      res.send('Post agregado con éxito');
    } else {
      res.status(500).send('Ocurrió un error');
    }
  });
  
  app.put('/posts/like/:id', async (req, res) => {
    const { id } = req.params;
    const result = await darLikePost(id);
    //Control de error
    if (result) {
      res.send('Like agregado con éxito');
    } else {
      res.status(500).send('Ocurrió un error');
    }
  });
  
  app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const result = await eliminarPost(id);
    if (result) {
      res.send('Post eliminado con éxito');
    } else {
      res.status(500).send('Ocurrió un error');
    }
  });
