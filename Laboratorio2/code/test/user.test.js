const request = require('supertest');
const createApp = require('../src/app');
const { resetUsers } = require('../src/controllers/user.controller');

const app = createApp();

beforeEach(() => {
    resetUsers(); // Limpia usuarios entre pruebas
});

describe('User API', () => {
    test('GET /api/users should return an empty list initially', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });

    test('POST /api/users should create a user', async () => {
        const newUser = {
            name: 'Diego Casignia',
            email: 'diego@example.com'
        };

        const res = await request(app).post('/api/users').send(newUser);
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe(newUser.name);
        expect(res.body.email).toBe(newUser.email);
        expect(res.body.id).toBeDefined();
    });

    test('POST /api/users should fail if data is incomplete', async () => {
        const res = await request(app).post('/api/users').send({ name: 'Diego' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ message: 'Name and email are required' });
    });

    test('PUT /api/users/:id should update an existing user', async () => {
        const user = {
            name: 'Diego',
            email: 'diego@example.com'
        };
        const createRes = await request(app).post('/api/users').send(user);
        const userId = createRes.body.id;

        const updateRes = await request(app).put(`/api/users/${userId}`).send({ name: 'Diego Updated' });
        expect(updateRes.statusCode).toBe(200);
        expect(updateRes.body.name).toBe('Diego Updated');
    });

    test('PUT /api/users/:id should return 404 if user not found', async () => {
        const res = await request(app)
            .put('/api/users/1')
            .send({ name: 'Desconocido', email: 'x@x.com' });

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ message: 'User not found' });
    });

    test('DELETE /api/users/:id should delete an existing user', async () => {
        const user = {
            name: 'Diego',
            email: 'diego@example.com'
        };
        const createRes = await request(app).post('/api/users').send(user);
        const userId = createRes.body.id;

        const deleteRes = await request(app).delete(`/api/users/${userId}`);
        expect(deleteRes.statusCode).toBe(200);
        expect(deleteRes.body.id).toBe(userId);

        const getRes = await request(app).get('/api/users');
        expect(getRes.body).toHaveLength(0);
    });

    test('DELETE /api/users/:id should return 404 if user not found', async () => {
        const res = await request(app).delete('/api/users/1');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ message: 'User not found' });
    });

});
