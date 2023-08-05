import request from 'supertest';
import {server} from '../../../index';
import connection from '../../../db/config';


describe('Auth Service', () => {
  beforeAll(async () => {
    await server.bootstrap();
  });

    /**  implementar - 2,5 */
    test('should create a new user', async () => {
        // create new user
        const newUser = {
            nome: "Andre Felipe",
            email: "andre.felipe@example.com",
            senha: "senha123"
        };

        // Act endpoint request POST
        const response = await request(server.server)
            .post('/v1/signup')
            .send(newUser);

        // Assert check status response 201 if user was created
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.nome).toBe(newUser.nome);
        expect(response.body.email).toBe(newUser.email);
        expect(response.body.tipoUsuarioId).toBe('6a4cda94-fbb6-476b-be29-f4124cae9058');
  });

  afterAll(async () => {
    await connection.close();
  });
});
