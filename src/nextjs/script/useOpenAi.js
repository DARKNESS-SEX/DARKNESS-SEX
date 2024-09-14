const OpenAI = require('openai');

const client = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

async function main() {
    return chatCompletion = await client.chat.completions.create({
        messages: [{role: 'user', content: 'こんにちは、明日はどんな天気になるでしょうか'}],
        model: 'gpt-3.5-turbo',
    });
}

main()
    .then(response => console.log(response.choices.map(choice => choice.message.content)))
    .catch(console.error);