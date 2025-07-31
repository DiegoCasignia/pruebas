import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 10 },  // etapa de calentamiento
        { duration: '30s', target: 50 },  // etapa de carga sostenida
        { duration: '10s', target: 0 },   // etapa de enfriamiento
    ],
    thresholds: {
        http_req_duration: ['p(95)<800'], // ampliado por el setTimeout del POST
        http_req_failed: ['rate<0.01']
    }
};

export default function () {
    // Prueba GET
    const getRes = http.get('http://localhost:3000/api/hello');
    check(getRes, {
        'GET /api/hello → status 200': (r) => r.status === 200,
        'GET /api/hello → < 500ms': (r) => r.timings.duration < 500,
    });

    // Prueba POST
    const payload = JSON.stringify({ nombre: 'Diego', edad: 25 });
    const headers = { 'Content-Type': 'application/json' };

    const postRes = http.post('http://localhost:3000/api/data', payload, { headers });
    check(postRes, {
        'POST /api/data → status 201': (r) => r.status === 201,
        'POST /api/data → < 800ms': (r) => r.timings.duration < 800,
        'POST /api/data → contiene campo recibido': (r) => r.json().hasOwnProperty('received'),
    });

    sleep(1);
}
