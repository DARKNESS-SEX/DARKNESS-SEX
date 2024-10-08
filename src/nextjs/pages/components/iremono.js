export default function Iremono({$likes,$example_text,value,onChange}) {
    return (
        <div className="my-4 mx-2.5 w-4/5">
            <div className="text-base">{$likes}</div>
            <input type="text" className="w-[300px] rounded border-slate-400 text-base border-solid border my-2" 
                placeholder={$example_text}
                value={value}
                onChange={onChange}  />
        </div>
    );
  }