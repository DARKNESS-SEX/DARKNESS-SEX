export default function modal({modal}) {
    return(
        <div className={`w-full h-screen bg-slate-50 flex justify-center items-center z-50 fixed ${modal}`}>
            <div className="w-5/6 h-[320px] rounded-xl bg-[#8A42D3]" >
                <div className="">
                    <div className="">
                        <h1>
                            闇の契約
                        </h1>
                    </div>

                    <p>
                    </p>
                </div>
            </div>
        </div>
        );
    }