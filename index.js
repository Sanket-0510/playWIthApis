const { Configuration, OpenAIApi } = require('openai');

const config = new Configuration({
    apiKey: "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",
});

const openAI = new OpenAIApi(config);

const getAnswer = async (question) => {
    const prompt = `Question: ${question}\nAnswer:`;

    const res = await openAI.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 1024,
        temperature: 1.4
        
    });

    const answer = res.data.choices[0].text.trim();
    console.log(answer+`\n total token = ${res.data.usage.total_tokens}`);
    
   
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const getInput = () => {
    readline.question("Enter a question: ", async (question) => {
        if (question.trim() === "") {
            readline.close();
            return;
        }
        await getAnswer(question);
        getInput();
    });
}

getInput();
