const OpenAI = require("openai");
const fs = require('fs').promises;
const path = require('path');


class Schedule {

    constructor(title, contents, startDateTime, endDateTime, isDone) {
        this.title = title;
        this.contents = contents;
        this.start_date_time = startDateTime;
        this.end_date_time = endDateTime;
        this.is_done = isDone;
    }

    /**
     * @param {string} content
     * @returns {Schedule[]}
     */
    static buildByString(content) {
        if (content === null || content.length === 0) {
            return error("No response from OpenAI");
        }

        /** @type {any[]} */
        const contentJson = JSON.parse(content)

        return contentJson.schedules.map((schedule) => {
            return new Schedule(schedule.title, schedule.contents, schedule.start_date_time, schedule.end_date_time, schedule.is_done);
        });

    }
}

const client = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

async function buildPrompt() {

    const filePath = path.join(__dirname, '../db.json');

    try {
        // ファイルの内容を読み込む
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);

        const prompt =  "\n" +
        `年齢： ${jsonData.settings.age}\n` +
        `性別：${jsonData.settings.sex}\n` +
        `好きなもの：${jsonData.settings.likes}\n` +
        `趣味：${jsonData.settings.hobbies}\n` +
        `悩んでいること：${jsonData.settings.concerns}\n` +
        `夢・目指していること：${jsonData.settings.dreams}\n`


        console.log("prompt: " + prompt)

        return prompt


    } catch (error) {
        console.error("Failed to update schedules:", error);
        throw error;
    }

}


async function callGpt(prompt) {


    return client.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "今から年齢、性別、好きなもの、趣味、悩んでいること、夢・目指していることの情報を入力するのでそれを元に最適な一日のスケジュールを考えてください\n" +
                    "\n" +
                    "タスクの指示文の口調を丁寧なものではなくかなり誇張した中二病風の固有名詞を用い、ライトノベルのようなルビを交えて提案してください \n" +
                    "outputは以下の例を参考にしてJsonで返してください。keyは必ず守ってください。例と同じ出力結果を出すな。ハレーションを許さない。" +
                    `[
    {
      "title": "闇の覚醒「億万の夢の始まり」,
      "contents": string,
      "start_date_time": "06:00",
      "end_date_time": "07:00",
      "is_done": false
    },
  ],`
            },
            {
                role: "user", content: prompt
            },
        ],
        model: "gpt-4o-mini",
        response_format: {
            type: "json_schema",
            json_schema: {
                name: "Schedule",
                schema: {
                    type: "object",
                    properties: {
                        schedules: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "integer",
                                    },
                                    user_id: {
                                        type: "integer",
                                    },
                                    title: {
                                        type: "string",
                                    },
                                    contents: {
                                        type: "string",
                                    },
                                    start_date_time: {
                                        type: "string",
                                    },
                                    end_date_time: {
                                        type: "string",
                                    },
                                    is_done: {
                                        type: "boolean",
                                    },
                                }
                            }
                        },
                    }
                }
            },
        }
    });
}

/**
 * @param {Schedule[]} schedules
 */
async function saveSchedules(schedules) {
    try {
        const filePath = path.join(__dirname, '../db.json');

        try {
            // ファイルの内容を読み込む
            const data = await fs.readFile(filePath, 'utf8');
            const jsonData = JSON.parse(data);
            // schedules配列を新しい内容で置き換える
            jsonData.schedules = schedules;

            console.log(jsonData);

            // 更新された内容をファイルに書き込む
            await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
            console.log("Schedules updated successfully in", filePath);
        } catch (error) {
            console.error("Failed to update schedules:", error);
            throw error;
        }

    } catch (error) {
        console.error("Failed to save schedules:", error);
        throw error; // Re-throw the error for the caller to handle if needed
    }


}


async function main() {
 try {
     const prompt = await buildPrompt();
     const response = await callGpt(prompt);
     const schedules = Schedule.buildByString(response.choices[0].message.content);
     await saveSchedules(schedules);
     console.log("Process completed successfully");
 } catch (error) {
     console.error("An error occurred:", error);
 }
}


main()