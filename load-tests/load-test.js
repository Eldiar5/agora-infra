import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1000,
    duration: '30s',
};

// 1. SETUP: Выполняется 1 раз перед началом теста
export function setup() {
    const loginUrl = 'http://localhost:8080/api/auth/login';
    const payload = JSON.stringify({
        login: 'stat-bot',   // Твой бот или любой юзер
        password: 'statistic'    // Пароль
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(loginUrl, payload, params);

    // Проверяем, что логин прошел
    check(res, {
        'Login successful': (r) => r.status === 200,
    });

    // Достаем токен из ответа JSON
    // ВАЖНО: Убедись, что поле в JSON называется именно 'token' или как у тебя в LoginResponseDto
    const token = res.json('token');

    return { authToken: token }; // Передаем токен в основную функцию
}

// 2. MAIN: Выполняется для каждого VU
export default function (data) {
    // data — это то, что вернула функция setup()
    const jwtToken = data.authToken;

    const url = 'http://localhost:8080/api/info/my'; // Или любой другой эндпоинт

    const params = {
        headers: {
            'Authorization': `Bearer ${jwtToken}`, // Используем полученный токен
            'Content-Type': 'application/json',
        },
    };

    const res = http.get(url, params);

    check(res, {
        'Status is 200': (r) => r.status === 200,
    });

    sleep(1);
}