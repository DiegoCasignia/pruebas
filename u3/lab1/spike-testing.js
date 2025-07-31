import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 10 },  // Inicio suave (usuarios normales)
        { duration: '10s', target: 100 }, // Pico súbito de usuarios
        { duration: '30s', target: 100 }, // Se mantiene el pico
        { duration: '10s', target: 10 },  // Baja abruptamente
        { duration: '10s', target: 0 },   // Fin de la prueba
    ],
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        http_req_failed: ['rate<0.01']
    }
};

export default function () {
    // GET
    const getRes = http.get('http://localhost:3000/api/hello');
    check(getRes, {
        'GET status 200': (r) => r.status === 200,
        'GET < 500ms': (r) => r.timings.duration < 500,
    });

    // POST
    const payload = JSON.stringify({ nombre: 'Diego', spike: true });
    const headers = { 'Content-Type': 'application/json' };
    const postRes = http.post('http://localhost:3000/api/data', payload, { headers });

    check(postRes, {
        'POST status 201': (r) => r.status === 201,
        'POST < 800ms': (r) => r.timings.duration < 800,
        'POST contiene "received"': (r) => r.json().hasOwnProperty('received'),
    });

    sleep(1);
}
