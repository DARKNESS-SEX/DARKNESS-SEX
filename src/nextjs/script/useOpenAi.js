const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

async function main() {
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
                    "    \"description\": \"アレするよー\",\n" +
                    "    \"start_date_time\": \"2022-10-01T10:00:00\",\n" +
                    "    \"end_date_time\": \"2022-10-01T12:00:00\",\n" +
                    "    \"is_done\": false\n" +
                    "  },\n" +
                    "  {\n" +
                    "    \"id\": 2,\n" +
                    "    \"user_id\": 1,\n" +
                    "    \"title\": \"コレする\",\n" +
                    "    \"description\": \"コレするよー\",\n" +
                    "    \"start_date_time\": \"2022-10-01T13:00:00\",\n" +
                    "    \"end_date_time\": \"2022-10-01T15:00:00\",\n" +
                    "    \"is_done\": false\n" +
                    "  },\n" +
                    "  {\n" +
                    "    \"id\": 3,\n" +
                    "    \"user_id\": 1,\n" +
                    "    \"title\": \"ソレする\",\n" +
                    "    \"description\": \"ソレするよー\",\n" +
                    "    \"start_date_time\": \"2022-10-01T16:00:00\",\n" +
                    "    \"end_date_time\": \"2022-10-01T18:00:00\",\n" +
                    "    \"is_done\": false\n" +
                    "  }\n" +
                    "]"
            },
            {role: "user", content: "\n" +
                    "年齢：19歳\n" +
                    "性別：男\n" +
                    "好きなもの：スポーツ観戦\n" +
                    "趣味：ゲーム\n" +
                    "悩んでいること：運動不足\n" +
                    "夢・目指していること：司法書士\n"},
        ],
        model: "gpt-4o-2024-08-06",
        response_format: {
            type: "json_schema",
            json_schema: {
                name: "Schedule",
                schema: {
                    type: "object",
                    properties: {
                     schedules:{
                        type:"array",
                        items:{
                         type:"object",
                         properties:{
                        id: {
                            type: "integer",
                        },
                        user_id: {
                            type: "integer",
                        },
                        title: {
                            type: "string",
                        },
                        description: {
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



class Schedule {

    constructor(title, description, startDateTime, endDateTime, isDone) {
        this.title = title;
        this.description = description;
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
            return new Schedule(schedule.title, schedule.description, schedule.start_date_time, schedule.end_date_time, schedule.is_done);
        });

    }
}




main()
    .then((response) =>
        console.log(Schedule.buildByString(response.choices[0].message.content)),
    )
    .catch(console.error);