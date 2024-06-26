import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(cookieParser());

// Подключаем middleware для CORS
app.use(cors({
    origin: 'http://localhost:5173', // Указываем домен вашего фронтенда
    credentials: true // Разрешаем передачу куки
}));

// Обработчик POST запроса для аутентификации и установки Cookie
app.post('/login', (req, res) => {
    // В реальном приложении здесь будет происходить аутентификация пользователя

    // Устанавливаем Cookie
    res.cookie('userId', '123456789', { maxAge: 900000, httpOnly: true });

    // Отправляем ответ
    res.send('Login successful. Cookie set.');
});

// Пример защищенного ресурса, который требует наличие Cookie
app.get('/protected/resource', (req, res) => {
    // Проверяем наличие Cookie
    const userId = req.cookies.userId;

    if (userId) {
        // Возвращаем защищенные данные
        res.json({ message: 'Protected resource accessed successfully.', userId });
    } else {
        // Если Cookie отсутствует, возвращаем ошибку
        res.status(401).json({ error: 'Unauthorized. User not logged in.' });
    }
});

// Запуск сервера на порту 3000
app.listen(3000, () => {
    console.log('Fake API server running on port 3000');
});
