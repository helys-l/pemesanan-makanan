import { useNavigate } from "react-router-dom";

export default function Menu({ selectedMenu, setSelectedMenu }) {
  const navigate = useNavigate();

  const getButtonClasses = (menuKey) => `
    h-[95%] w-1/3 shadow group rounded-full duration-300 font-black text-xs sm:text-md lg:text-lg gap-2 flex justify-center items-center
    ${selectedMenu === menuKey
      ? 'bg-[#dc2318] text-[#fdfdf2]'
      : 'text-stone-600 hover:text-[#fdfdf2] hover:bg-[#dc2318]'}
  `;

  const getIconClasses = (menuKey) => `
    rounded-full aspect-square h-full sm:h-[120%] shadow overflow-hidden flex justify-center items-center duration-100
    ${selectedMenu === menuKey
      ? 'bg-[#fdfdfe] scale-105'
      : 'bg-[#dc2318] group-hover:bg-[#fdfdfe] group-hover:scale-105'}
  `;

  return (
    <header className="container rounded-full shadow h-12 mx-auto sm:h-16 md:h-20 card justify-between gap-x-3 items-center flex px-4 ">
      <div className="h-10 hidden sm:h-8 md:h-12 aspect-[4/1] bg-[#DC2318] text-[#FDFDFE] rounded-full text-sm sm:text-md md:text-lg lg:text-xl font-extrabold justify-center items-center sm:flex">
        Mas Hely
      </div>

      <div className="h-10 md:h-12 sm:gap-x-3 gap-x-6 aspect-[3/1] md:w-1/2 flex">
        {/* Makanan */}
        <button
          onClick={() => setSelectedMenu('makanan')}
          className={getButtonClasses('makanan')}
        >
          <span className="hidden sm:block">Makanan</span>
          <div className={getIconClasses('makanan')}>
            <img
              src="https://static.thenounproject.com/png/1633702-200.png"
              className="w-[95%] aspect-square"
              alt=""
            />
          </div>
        </button>

        {/* Minuman */}
        <button
          onClick={() => setSelectedMenu('minuman')}
          className={getButtonClasses('minuman')}
        >
          <span className="hidden sm:block">Minuman</span>
          <div className={getIconClasses('minuman')}>
            <img
              src="https://cdn-icons-png.freepik.com/512/161/161542.png"
              className="w-[95%] aspect-square"
              alt=""
            />
          </div>
        </button>

        {/* Tambahan */}
        <button
          onClick={() => setSelectedMenu('menuTambahan')}
          className={getButtonClasses('menuTambahan')}
        >
          <span className="hidden sm:block">Tambahan</span>
          <div className={getIconClasses('menuTambahan')}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3341/3341571.png"
              className="w-[95%] aspect-square"
              alt=""
            />
          </div>
        </button>
      </div>

      <div
        onClick={() => navigate("/login")}
        className="h-10 sm:h-8 md:h-12 aspect-square sm:aspect-[4/1] sm:bg-[#FDFDFE] shadow rounded-full flex justify-center items-center group font-bold transition-all duration-300"
      >
        <div className="bg-[#FDFDFE] h-[150%] shadow rounded-full group-hover:scale-110 aspect-square flex justify-center items-center">
          <img
            src="https://png.pngtree.com/png-clipart/20220921/ourmid/pngtree-spicy-fried-chicken-logo-png-image_6208307.png"
            className="w-[95%]  aspect-square"
            alt=""
          />
        </div>
      </div>
    </header>
  );
}
