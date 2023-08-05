import request from 'supertest';
import {server} from '../../../index';
import connection from '../../../db/config';

describe('Produto Service', () => {
  beforeAll(async () => {
    await server.bootstrap();
  });

  /**
   * pré requisito para esse teste:
   *
   * cadastrar manualmente um produto no banco de dados via interface MySQL
   * ou via API, mas lembrar de alterar o banco de dados para apontar para bd de teste
   * */
  test('should show all products', async () => {
    const res = await request(server.server).get('/v1/produto');

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
      /**
    no caso do meu teste e banco de dados local,
    o produto cadastrado possui essas caracteristicas abaixo:

    {
      id: 'd4b51e26-26a0-11ee-8899-0242ac120004',
      nome: 'teste',
      preco: 123,
      estoque: 2,
      createdAt: '2023-07-20T01:57:22.000Z',
      updatedAt: '2023-07-20T01:57:22.000Z'
    }

    por isso o teste ficaria assim:
    
    expect(res.body.nome).toEqual("Teste");
    expect(res.body.preco).toEqual(123);
    expect(res.body.estoque).toEqual(2);

    contudo, caso voce possua mais de um produto cadastrado para teste,
    o endpoint irá retornar um array. Nesse caso, talvez seja mais interessante
    verificar se o tamanho do array retornado está de acordo com a quantidade
    de produtos existentes, por exemplo.
    **/
  });

  /**  implementar - 2,5
   * 
   * pré requisito para esse teste:
   * 
   * cadastrar manualmente um produto no banco de dados via interface MySQL
   * ou via API, mas lembrar de alterar o banco de dados para apontar para bd de teste
  it('should get specific product', async () => {
   
  });
  */
  test('should get specific product', async () => {
      // Pré-requisito: Obtenha o ID de um produto específico cadastrado no banco de dados para testes.

      const specificProductId = "9a97eb20-2d13-11ee-96cc-0b2a7b3ba0a1";
      const res = await request(server.server).get(`/v1/produto/${specificProductId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', specificProductId);
      expect(res.body).toHaveProperty('nome', 'Liquidificador');
      expect(res.body).toHaveProperty('preco', 550);
      expect(res.body).toHaveProperty('estoque', 200);
  });

  afterAll(async () => {
    await connection.close();
  });
});
