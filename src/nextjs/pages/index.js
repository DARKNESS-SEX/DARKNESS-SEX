import Head from "next/head";
import packageJson from "../package.json";
import Image from 'next/image'
import Hukidashi from './components/hukidashi';
import Nav_bar from './components/nav_bar';

//import "../styles/output.css";

export default function Home(props) {
  /** You can access to liff and liffError object through the props.
   *  const { liff, liffError } = props;
   *  console.log(liff.getVersion());
   *
   *  Learn more about LIFF API documentation (https://developers.line.biz/en/reference/liff)
   **/
  return (
    <main className="">
      <Head>
        <title>LIFF Starter</title>
      </Head>
      <div className="w-[375px] ">
        hogehoge
        <Nav_bar />
      </div>
    </main>
  );
}
