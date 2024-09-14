import Iremono from ".././components/iremono";
import Button from "../components/button";
import Eraberu from "../components/eraberu";

export default function Home(props) {
    /** You can access to liff and liffError object through the props.
     *  const { liff, liffError } = props;
     *  console.log(liff.getVersion());
     *
     *  Learn more about LIFF API documentation (https://developers.line.biz/en/reference/liff)
     **/
    return (
        <div className="my-6">
            <div className="text-2xl font-semibold">初期設定</div>
            <Eraberu />
            <Iremono $likes="年齢" />
            <Iremono $likes="好きなもの" $example_text="(例)ゲーム" />
            <Iremono $likes="趣味" $example_text="(例)スポーツ" />
            <Iremono $likes="悩んでいること" $example_text="(例)運動不足" />
            <Iremono $likes="夢・目指していること" $example_text="(例)司法書士" />
            <div className="border-solid border border-slate-400 w-4/5 rounded text-center ml-8 bg-blue-500 text-base font-medium mt-8 py-2">
                <a href="/">
                    <input type='button' value="確定" />
                </a>
            </div>
        </div>
    );
}