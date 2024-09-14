import Head from "next/head";
import packageJson from "../package.json";
import Image from 'next/image'
import Hukidashi from './components/hukidashi';
import Nav_bar from './components/nav_bar';
import Schedule_card from './components/schedule_card'

//import "../styles/output.css";

export default function Home(props) {

  return (
    <main className="">
      <Head>
        <title>LIFF Starter</title>
      </Head>
      <div className="w-[375px] h-[100vh] frex ">
        <div className="flex justify-center items-center flex-col ">
          <Schedule_card $time="7:00 - 7:30" $title="闇の覚醒「億万の夢の始まり」" $contents="目覚めよ、未来の支配者よ。今日もまた一歩、億万長者への道を歩む時が来た。体を解き放ち、全身に力を満たせ。"/>
          <Schedule_card $time="7:00 - 7:30" $title="闇の覚醒「億万の夢の始まり」" $contents="目覚めよ、未来の支配者よ。今日もまた一歩、億万長者への道を歩む時が来た。体を解き放ち、全身に力を満たせ。"/>
        </div>
        
        <Nav_bar />
      </div>
    </main>
  );
}
