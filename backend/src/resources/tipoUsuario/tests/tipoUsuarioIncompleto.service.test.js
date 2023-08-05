import request from 'supertest';
import { server } from '../../../index';
import connection from '../../../db/config';
import {describe} from "node:test";

describe('tipoUsuario Service', () => {
    // Limpar o banco de dados e inserir dados de teste antes de executar os testes
    beforeAll(async () => {
        await server.bootstrap();
    });
    /**  implementar - 2,5 **/
    // Teste para verificar se a rota GET /tipo-usuario está retornando todos os tipos de usuário
    it('should get all user types', async () => {
        const res = await request(server.server).get('/v1/tipo-usuario');

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);

        res.body.forEach((tipoUsuario: any) => {
            expect(tipoUsuario).toHaveProperty('id');
            expect(tipoUsuario).toHaveProperty('rotulo');
        });
    });

    // Fechar a conexão com o banco de dados após os testes
    afterAll(async () => {
        await connection.close();
    });
});
