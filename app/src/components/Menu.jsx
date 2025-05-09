export default function Menu({ selectedMenu, setSelectedMenu }) {
    return (
        <header className="container rounded-full h-12 mx-auto sm:h-16 md:h-20 card justify-between gap-x-3 items-center flex px-4 ">
            <div className="h-10 sm:h-8 md:h-12 aspect-[4/1] bg-[#DC2318] text-[#FDFDFE] rounded-full text-sm sm:text-md md:text-lg lg:text-xl font-extrabold justify-center items-center flex">Mas Hely</div>
            <div className="h-6 sm:h-10 md:h-12 gap-x-2 spect-[3/1] md:w-1/2 flex">
                <button
                    onClick={() => setSelectedMenu('makanan')}
                    className={`h-[95%] w-1/3 rounded-full duration-300 font-black text-xs sm:text-md lg:text-lg gap-2 border flex justify-center items-center ${selectedMenu === 'makanan' ? 'bg-[#FDFDFE] text-[#DC2318] border-[#dc2318]' : 'text-stone-600 border-[#fdfdfe] hover:text-[#DC2318] hover:border-[#dc2318]'}`}
                >
                    <span className="hidden sm:block">Makanan</span>
                    <div className="rounded-full aspect-square h-full sm:h-[95%] bg-[#DC2318] overflow-hidden flex justify-center items-center"><img src="https://static.thenounproject.com/png/1633702-200.png" className="w-[95%] aspect-square" alt="" /></div>
                </button>

                <button
                    onClick={() => setSelectedMenu('minuman')}
                    className={`h-[95%] w-1/3 rounded-full duration-300 font-black text-xs sm:text-md lg:text-lg gap-2 border flex justify-center items-center ${selectedMenu === 'minuman' ? 'bg-[#FDFDFE] text-[#DC2318] border-[#dc2318]' : 'text-stone-600 border-[#fdfdfe] hover:text-[#DC2318] hover:border-[#dc2318]'}`}
                >
                    <span className="hidden sm:block">Minuman</span>
                    <div className="rounded-full aspect-square h-full sm:h-[95%] bg-[#DC2318] overflow-hidden flex justify-center items-center"><img src="https://cdn-icons-png.freepik.com/512/161/161542.png" className="w-[95%] aspect-square" alt="" /></div>
                </button>

                <button
                    onClick={() => setSelectedMenu('menuTambahan')}
                    className={`h-[95%] w-1/3 rounded-full duration-300 font-black text-xs sm:text-md lg:text-lg gap-2 border flex justify-center items-center ${selectedMenu === 'menuTambahan' ? 'bg-[#FDFDFE] text-[#DC2318] border-[#dc2318]' : 'text-stone-600 border-[#fdfdfe] hover:text-[#DC2318] hover:border-[#dc2318]'}`}
                >
                    <span className="hidden sm:block">Tambahan</span>
                    <div className="rounded-full aspect-square h-full sm:h-[95%] bg-[#DC2318] overflow-hidden flex justify-center items-center"><img src="https://cdn-icons-png.flaticon.com/512/3341/3341571.png" className="w-[95%] aspect-square" alt="" /></div>
                </button>
            </div>
            <div className="h-10 sm:h-8 md:h-12 aspect-square sm:aspect-[4/1] sm:bg-[#FDFDFE] rounded-full flex justify-center items-center font-bold">
                <div className="bg-[#FDFDFE] h-full rounded-full aspect-square flex justify-center items-center"><img src="https://png.pngtree.com/png-clipart/20220921/ourmid/pngtree-spicy-fried-chicken-logo-png-image_6208307.png" className="w-[90%] aspect-square" alt="" /> </div>
            </div>
        </header>
    );
}
