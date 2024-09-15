import Head from "next/head";
import packageJson from "../../package.json";
import Image from 'next/image'
import Modal from '.././components/modal';
import Nav_bar from '.././components/nav_bar';
import Schedule_card from '.././components/schedule_card'
import { useState, useEffect } from "react";
import axios from "axios";

//import "../styles/output.css";
async function getSchedules() {
  try {
    const response = await axios.get('http://localhost:3001/schedules');
    return response.data;
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return [];
  }
}


export default function Home(props) {

  const [data, setData] = useState([]);

  useEffect(() => {
    getSchedules().then(result => {setData(result)
    console.log(result)});
  }, []);

  return (
    <main className="w-full flex justify-center items-center flex-col">
      <Head>
        <title>LIFF Starter</title>
      </Head>
      {/* <Modal className="" /> */}
      <div className="w-[375px] h-[100vh] relative top-5 block">
        <h1 className="text-center text-[36px]">スケジュール</h1>
        <div className="flex justify-center items-center flex-col pb-[120px]">
        {data.length > 0 ? data.map((schedule, index) => (
            <Schedule_card key={index} $time={`${schedule.start_date_time}~${schedule.end_date_time}`} $title={schedule.title} $contents={schedule.contents} />
          )) : "Loading..."}
        </div>
        
        <Nav_bar />
      </div>
    </main>
  );
}
