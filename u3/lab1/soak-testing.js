import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 20 },   // Ramp-up: sube a 20 usuarios
        { duration: '10m', target: 20 },  // Soak: mantiene 20 usuarios durante 10 minutos
        { duration: '2m', target: 0 },    // Ramp-down: baja a 0 usuarios
    ],
    thresholds: {
        http_req_duration: ['p(95)<800'], // El 95% debe responder en menos de 800 ms
        http_req_failed: ['rate<0.01']    // Menos del 1% debe fallar
    }
};

export default function () {
    // GET request
    const getRes = http.get('http://localhost:3000/api/hello');
    check(getRes, {
        'GET /api/hello status 200': (r) => r.status === 200,
        'GET < 500ms': (r) => r.timings.duration < 500,
    });

    // POST request
    const payload = JSON.stringify({ nombre: 'Diego', edad: 25 });
    const headers = { 'Content-Type': 'application/json' };
    const postRes = http.post('http://localhost:3000/api/data', payload, { headers });
    check(postRes, {
        'POST /api/data status 201': (r) => r.status === 201,
        'POST < 800ms': (r) => r.timings.duration < 800,
        'POST contiene "received"': (r) => r.json().hasOwnProperty('received'),
    });

    sleep(1); // Simula un pequeño tiempo de espera entre iteraciones
}
