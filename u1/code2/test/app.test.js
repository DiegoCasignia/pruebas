const request = require('supertest');
const createApp = require('../src/app');
const { resetProducts } = require('../src/controllers/product.controller');

const app = createApp();

beforeEach(() => {
    resetProducts();
});

describe('Product API', () => {
    it('GET /productsCasignia should return empty list', async () => {
        const res = await request(app).get('/productsCasignia');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });

    test('GET /invalid should return 404 for unknown route', async () => {
    const response = await request(app).get('/invalid');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: 'Route not found' });
});

test('GET /productsCasignia/:id with invalid ID should return 404', async () => {
    const response = await request(app).get('/productsCasignia/invalid-id');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: 'Product not found' });
});

test('DELETE /productsCasignia/:id with invalid ID should return 404', async () => {
    const response = await request(app).delete('/productsCasignia/invalid-id');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: 'Product not found' });
});


    it('POST /productsCasignia should create a product', async () => {
        const res = await request(app)
            .post('/productsCasignia')
            .send({ name: 'Camiseta', precio: 19.99 });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Camiseta');
    });

    it('POST /productsCasignia with invalid data should fail', async () => {
        const res = await request(app)
            .post('/productsCasignia')
            .send({ name: 'Zapato' }); // Falta precio
        expect(res.statusCode).toBe(400);
    });

    it('GET /productsCasignia/:id should return product by ID', async () => {
        const createRes = await request(app)
            .post('/productsCasignia')
            .send({ name: 'Libro', precio: 12.5 });
        const id = createRes.body.id;

        const res = await request(app).get(`/productsCasignia/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Libro');
    });

    it('GET /productsCasignia/:id with invalid ID should return 404', async () => {
        const res = await request(app).get('/productsCasignia/9999');
        expect(res.statusCode).toBe(404);
    });

    it('DELETE /productsCasignia/:id should delete a product', async () => {
        const createRes = await request(app)
            .post('/productsCasignia')
            .send({ name: 'Cuaderno', precio: 3.5 });
        const id = createRes.body.id;

        const res = await request(app).delete(`/productsCasignia/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Cuaderno');
    });
});
