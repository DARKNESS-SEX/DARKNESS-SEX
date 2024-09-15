import Iremono from ".././components/iremono";
import Button from "../components/button";
import Eraberu from "../components/eraberu";
import Nav_bar from "../components/nav_bar";
import Image from "next/dist/client/image";
import localImages from "../../public/dakudo.gif";
import BgImg from "../../public/blu.png";

export default function Home(props) {
    /** You can access to liff and liffError object through the props.
     *  const { liff, liffError } = props;
     *  console.log(liff.getVersion());
     *
     *  Learn more about LIFF API documentation (https://developers.line.biz/en/reference/liff)
     **/
    return (
        <div className="relative h-screen w-screen">
            <Image src={localImages} className="relative z-10 bg-cover" />
            <Image src={BgImg} layout="fill" objectFit="cover"/>
            <Nav_bar />
        </div>
    );
}