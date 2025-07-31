import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 5 },
        { duration: '10s', target: 20 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<800'],
        http_req_failed: ['rate<0.01']
    }
};

export default function () {
    // Llamadas GET y POST concurrentes simuladas usando Promise.all()
    const getReq = http.get('http://localhost:3000/api/hello');

    const payload = JSON.stringify({ nombre: 'Diego', edad: 25 });
    const headers = { 'Content-Type': 'application/json' };
    const postReq = http.post('http://localhost:3000/api/data', payload, { headers });

    // Validaciones
    check(getReq, {
        'GET /api/hello → 200': (r) => r.status === 200,
        'GET < 500ms': (r) => r.timings.duration < 500,
    });

    check(postReq, {
        'POST /api/data → 201': (r) => r.status === 201,
        'POST < 800ms': (r) => r.timings.duration < 800,
        'POST tiene campo "received"': (r) => r.json().hasOwnProperty('received'),
    });

    sleep(1);
}
