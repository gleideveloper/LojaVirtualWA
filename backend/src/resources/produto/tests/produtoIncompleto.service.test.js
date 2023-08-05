import request from 'supertest';
import { server } from '../../../index';
import connection from '../../../db/config';

describe('Produto Service', () => {
    let isAdminToken =  '7edd25c6-c89e-4c06-ae50-c3c32d71b8ad';

    beforeAll(async () => {
        await server.bootstrap();
    });

    afterAll(async () => {
        await connection.close();
    });

    it('should show all products', async () => {
        const res = await request(server.server)
            .get('/v1/produto')
            .set('Authorization', `Bearer ${isAdminToken}`);

        console.log(res.status);
        console.log(res.body);

        expect(res.statusCode).toEqual(200);

        // Verificar se a resposta é um array (caso mais de um produto esteja cadastrado)
        expect(Array.isArray(res.body)).toBeTruthy();

        // Se for um array, verificar se contém pelo menos um produto
        if (Array.isArray(res.body)) {
            expect(res.body.length).toBeGreaterThan(0);

            // Verificar se cada produto no array possui as propriedades esperadas
            res.body.forEach((produto) => {
                expect(produto).toHaveProperty('id');
                expect(produto).toHaveProperty('nome');
                expect(produto).toHaveProperty('preco');
                expect(produto).toHaveProperty('estoque');
                expect(produto).toHaveProperty('createdAt');
                expect(produto).toHaveProperty('updatedAt');
            });
        }
    });

    it('should get specific product', async () => {
        // Pré-requisito: Obtenha o ID de um produto específico cadastrado no banco de dados para testes.

        const specificProductId = 'a2f930e0-3334-11ee-81a8-016be54facd4'; // ID do produto 'teste'

        const res = await request(server.server).get(`/v1/produto/${specificProductId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', specificProductId);
        expect(res.body).toHaveProperty('nome', 'Cheese');
        expect(res.body).toHaveProperty('preco', 254.28);
        expect(res.body).toHaveProperty('estoque', 541);
    });
});
