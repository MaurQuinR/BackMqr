
const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de usuarios", () => {
  it("1. ¿Se puede agregar un usuario correctamente llamando al endpoint '/usuarios' con un correo electrónico y contraseña válidos?", async () => {
    const response = await request(server)
      .post("/usuarios")
      .send({ email: "ejemplo@correo.com", password: "contraseña123" });
    const status = response.statusCode;
    expect(status).toBe(200);
    expect(response.text).toBe("Usuario agregado con éxito");
  });
});

describe("Operaciones de autenticación", () => {
  it("2. ¿Se puede iniciar sesión correctamente llamando al endpoint '/login' con credenciales válidas?", async () => {
    const response = await request(server)
      .post("/login")
      .send({ email: "ejemplo@correo.com", password: "contraseña123" });
    const status = response.statusCode;
    expect(status).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe("Operaciones CRUD de usuarios autenticados", () => {
  it("3. ¿Se pueden obtener los datos de un usuario logueado correctamente llamando al endpoint '/usuarios' con un token de autorización válido?", async () => {
    
    const token = "token_de_autorizacion_valido";

    const response = await request(server)
      .get("/usuarios")
      .set("Authorization", `Bearer ${token}`);
    const status = response.statusCode;
    expect(status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("Operaciones CRUD de posts", () => {
  it("4. ¿Se pueden obtener los posts correctamente llamando al endpoint '/posts'?", async () => {
    const response = await request(server).get("/posts").send();
    const status = response.statusCode;
    expect(status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

})