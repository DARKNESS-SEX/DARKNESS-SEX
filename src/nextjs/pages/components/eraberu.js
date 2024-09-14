export default function Eraberu(props) {
    return (
        <div className="mx-2.5">
            <div className="my-3 text-base">性別</div>
            <label className="border-solid rounded border">
                <select>
                    <option>男性</option>
                    <option>女性</option>
                    <option>その他</option>
                </select>
            </label>        
        </div>
    );
  }