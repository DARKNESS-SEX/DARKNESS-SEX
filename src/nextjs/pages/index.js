import Iremono from "./components/iremono";
import Button from "./components/button";
import Eraberu from "./components/eraberu";
import { useState } from "react";
import axios from "axios";

export default function Home(props) {
    const [age, setAge] = useState("");
    const [likes, setLikes] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [concerns, setConcerns] = useState("");
    const [dreams, setDreams] = useState("");
    const apiUrl ="http://localhost:3001/settings"

    const handleSubmit = () => {
        console.log({
            age,
            likes,
            hobbies,
            concerns,
            dreams
        });
        const dataToSend = {
            age:age,
            likes:likes,
            hobbies:hobbies,
            concerns:concerns,
            dreams:dreams,

        }
        axios.put(apiUrl, dataToSend, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              console.log('送信成功:', response.data);
            })
            .catch((error) => {
              console.error('送信エラー:', error);
            });
    };
    return (
        <main className="w-full flex flex-col justify-center items-center">
            <div className="my-6 w-[375px]" >
                <div className="text-2xl font-semibold"><h1 className="text-center">初期設定</h1></div>
                <Eraberu />
                <div className="w-full flex flex-col justify-center items-center">
                    <Iremono $likes="年齢" value={age} onChange={(e) => setAge(e.target.value)} />
                    <Iremono $likes="好きなもの" $example_text="(例)ゲーム" value={likes} onChange={(e) => setLikes(e.target.value)} /> 
                    <Iremono $likes="趣味" $example_text="(例)スポーツ" value={hobbies} onChange={(e) => setHobbies(e.target.value)} />
                    <Iremono $likes="悩んでいること" $example_text="(例)運動不足" value={concerns} onChange={(e) => setConcerns(e.target.value)} />
                    <Iremono $likes="夢・目指していること" $example_text="(例)司法書士" value={dreams} onChange={(e) => setDreams(e.target.value)} />
                </div>
                <div className="border-solid border border-slate-400 w-4/5 rounded text-center ml-8 bg-blue-500 text-base font-medium mt-8 py-2">
                    <a href="/">
                        <input type='button' value="確定" onClick={handleSubmit} />
                    </a>
                </div>
            </div>
        </main>
    );
}