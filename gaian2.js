// Подключаем необходимые модули
const axios = require("axios");
const fs = require('fs');

// Функция для задержки выполнения
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Функция для генерации случайного времени задержки в миллисекундах
const getRandomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Функция для получения текущего времени по Москве (UTC+3)
const getCurrentMoscowTime = () => {
    const date = new Date();
    // Получаем время UTC+3
    const moscowTime = new Date(date.getTime() + 3 * 60 * 60 * 1000);
    return moscowTime.toISOString().replace('T', ' ').substring(0, 19);
};

// Основная асинхронная функция, запускающая процесс отправки сообщений
(async () => {
    try {
        console.log('Goyda Net By [Cryptohomo Industries]\n\n');

        // Чтение списка адресов из файла keyword.txt
        const addressList = await fs.readFileSync('keyword.txt', 'utf-8');
        const addressListArray = await addressList.split('\n');

        // Цикл по адресам из списка, начиная с 11-го индекса
        for (let index = 11; index < addressListArray.length; index++) {
            const Wallet = addressListArray[index];
            console.log("Content Chat: " + Wallet + "\n");

            try {
                // Отправка запроса к API с текущим адресом из списка
                const response = await axios.post(
                    'https://NodeIdGaiaMu.us.gaianet.network/v1/chat/completions',
                    {
                        'messages': [
                            {
                                'role': 'system',
                                'content': 'You are a helpful assistant.'
                            },
                            {
                                'role': 'user',
                                'content': Wallet  // Используем текущее значение Wallet
                            }
                        ]
                    },
                    {
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                );

                // Логирование ответа от API
                const botResponse = response.data.choices[0].message.content;
                console.log("Response: [" + botResponse + "]\n");

                // Логирование времени отправки сообщения
                console.log("Last message sent at (MSK, UTC+3): " + getCurrentMoscowTime() + "\n");

                console.log("Wait random time \n\n");

                // Ожидание случайного времени перед следующим запросом
                const randomDelay = getRandomDelay(10000, 65000);
                await delay(randomDelay);

            } catch (postError) {
                console.error("Error during axios post: ", postError);
            }
        }
    } catch (error) {
        console.error("Error: ", error);
    }
})();
