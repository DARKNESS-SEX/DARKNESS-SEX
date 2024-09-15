export default function schedule_card({$time,$title,$contents,$onClick}) {

    return ( 
        <div className="w-11/12 bg-[#FFECE7] flex justify-center items-center rounded-3xl mb-5" onClick={$onClick}>
            <div className="w-11/12 ">
                <article className="flex justify-center items-center flex-col p-2">
                    <div className="flex justify-center items-center flex-col">
                        <div className="w-8/12  text-center border-b-2 border-b-[#BF316C] ">
                            <h3 className="">{$time}</h3>
                        </div>
                        <p className="text-center">{$title}</p>
                    </div>
                    <div className="relative top-3 mb-3">
                        <p className="">{$contents}</p>
                    </div>

                </article>
            </div>
        </div>
    );
}
