const request = require('supertest');
const app = require('../server');

describe('Scriptorium Translator API', () => {
    test('GET / should return API running message', async () => {
        const response = await request(app).get('/');

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe(
            'Scriptorium translator API is running.'
        );
    });
});