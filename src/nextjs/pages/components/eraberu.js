export default function Eraberu(props) {
    return (
        <div className="w-full flex flex-col justify-center items-center mb-4 mt-4">
            <div>
                <div className="my-3 text-base">性別</div>
                <label className="border-solid rounded border">
                    <select className="w-[300px] ">
                        <option>男性</option>
                        <option>女性</option>
                        <option>その他</option>
                    </select>
                </label>    
            </div>    
        </div>
    );
  }