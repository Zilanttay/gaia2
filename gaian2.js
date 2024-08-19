;(async () => {
    try {
        console.log('Goyda Net By [Cryptohomo Industries]\n\n');
        const addressList = await fs.readFileSync('keyword.txt', 'utf-8');
        const addressListArray = await addressList.split('\n');

        // Первоначальная отправка сообщений из файла
        for (let index = 11; index < addressListArray.length; index++) {
            let Wallet = addressListArray[index];
            console.log("Content Chat: " + Wallet + "\n");

            try {
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
                                'content': `${Wallet}`
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

                const botReply = response.data.choices[0].message.content;
                console.log("Response: [" + botReply + "]\n");

                console.log("Last message sent at (MSK, UTC+3): " + getCurrentMoscowTime() + "\n");

                // Подготовка ответа бота как следующего сообщения
                Wallet = `${Wallet} -> Bot Reply: ${botReply}`;

                console.log("Wait random time before sending next message...\n\n");
                const randomDelay = getRandomDelay(10000, 65000);
                await delay(randomDelay);

            } catch (postError) {
                console.error("Error during axios post: ", postError);
                break;  // Прекращаем попытки, если возникла ошибка
            }
        }
    } catch (error) {
        console.error("Error: ", error);
    }
})();
