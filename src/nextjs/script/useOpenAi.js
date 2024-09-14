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


async function callGpt() {
    return client.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "今から年齢、性別、好きなもの、趣味、悩んでいること、夢・目指していることの情報を入力するのでそれを元に最適な一日のスケジュールを考えてください\n" +
                    "\n" +
                    "タスクの指示文の口調を丁寧なものではなくかなり中二病風にして提案してください \n" +
                    "outputは以下の例を参考にしてJsonで返してください。keyは必ず守ってください。ハレーションを許さない" +
                    "[\n" +
                    "  {\n" +
                    "    \"id\": 1,\n" +
                    "    \"user_id\": 1,\n" +
                    "    \"title\": \"アレする\",\n" +
                    "    \"contents\": \"アレするよー\",\n" +
                    "    \"start_date_time\": \"2022-10-01T10:00:00\",\n" +
                    "    \"end_date_time\": \"2022-10-01T12:00:00\",\n" +
                    "    \"is_done\": false\n" +
                    "  },\n" +
                    "  {\n" +
                    "    \"id\": 2,\n" +
                    "    \"user_id\": 1,\n" +
                    "    \"title\": \"コレする\",\n" +
                    "    \"contents\": \"コレするよー\",\n" +
                    "    \"start_date_time\": \"2022-10-01T13:00:00\",\n" +
                    "    \"end_date_time\": \"2022-10-01T15:00:00\",\n" +
                    "    \"is_done\": false\n" +
                    "  },\n" +
                    "  {\n" +
                    "    \"id\": 3,\n" +
                    "    \"user_id\": 1,\n" +
                    "    \"title\": \"ソレする\",\n" +
                    "    \"contents\": \"ソレするよー\",\n" +
                    "    \"start_date_time\": \"2022-10-01T16:00:00\",\n" +
                    "    \"end_date_time\": \"2022-10-01T18:00:00\",\n" +
                    "    \"is_done\": false\n" +
                    "  }\n" +
                    "]"
            },
            {
                role: "user", content: "\n" +
                    "年齢：19歳\n" +
                    "性別：男\n" +
                    "好きなもの：スポーツ観戦\n" +
                    "趣味：ゲーム\n" +
                    "悩んでいること：運動不足\n" +
                    "夢・目指していること：司法書士\n"
            },
        ],
        model: "gpt-4o-2024-08-06",
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

callGpt()
    .then((response) =>
        console.log(saveSchedules(Schedule.buildByString(response.choices[0].message.content))),
    )
    .catch(console.error);