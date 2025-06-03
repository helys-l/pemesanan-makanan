import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../data/firebase.js";  // sesuaikan path ini ke file firebase.js kamu

export default function Makanan({ addToOrder }) {
  const [makanan, setMakanan] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMakanan() {
      try {
        setLoading(true);
        const makananCol = collection(db, "minuman");
        const makananSnapshot = await getDocs(makananCol);
        const makananList = makananSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMakanan(makananList);
        if (makananList.length > 0) {
          setSelectedItem(makananList[0]);
          if (makananList[0].level && makananList[0].level.length > 0) {
            setSelectedLevel(makananList[0].level[0]);
          }
        }
        setLoading(false);
      } catch (err) {
        setError("Gagal memuat data makanan");
        setLoading(false);
        console.error(err);
      }
    }
    fetchMakanan();
  }, []);

  const handleAddToOrder = () => {
    if (!selectedItem) return;
    const level = selectedItem.level ? selectedLevel : "-";
    addToOrder(selectedItem, level, quantity);
  };

  const increaseQuantity = () => {
    setQuantity(prevQty => prevQty + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQty => prevQty - 1);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    if (item.level && item.level.length > 0) {
      setSelectedLevel(item.level[0]);
    } else {
      setSelectedLevel(null);
    }
  };

  if (loading) {
    return <div className="p-4 text-center shadow container rounded-xl h-auto md:h-[26rem] lg:h-[32rem] md:w-[70%] card">Loading menu...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (!selectedItem) {
    return <div className="p-4 text-center">Tidak ada menu tersedia</div>;
  }

  return (
    <div className="container rounded-xl shadow h-auto md:h-[26rem] lg:h-[32rem] md:w-[70%] card">
      <h1 className="w-full h-10 md:h-12 pl-8 font-black flex items-center text-sm sm:text-md md:text-xl">Menu</h1>

      {/* List Pilihan */}
      <div className="w-[95%] mx-auto h-6 sm:h-8 flex gap-3 px-3 overflow-x-scroll hide-bar">
        {makanan.map((item) => (
          <div
            key={item.id}
            className={`h-[98%] w-auto min-w-36 md:min-w-40 rounded-full shadow flex justify-center items-center font-medium text-xs sm:text-md px-3 cursor-pointer ${
              selectedItem.nama === item.nama
                ? "bg-[#FDFDFE] text-[#0e0d0d]"
                : "bg-[#0E0D0D] text-[#FDFDFE] hover:bg-[#0e0d0d] hover:text-yellow-500 hover:scale-95"
            } duration-100`}
            onClick={() => handleSelectItem(item)}
          >
            {item.nama}
          </div>
        ))}
      </div>

      {/* Detail Makanan */}
      <div className="w-full mt-3 flex flex-col md:flex-row justify-center items-center gap-3 p-2 md:p-5 h-auto min-h-80 lg:h-96">
        <div className="w-[98%] h-30 rounded-md md:w-[48%] md:h-72 flex justify-center lg:h-80 overflow-hidden shadow-md">
          <img src={selectedItem.gambar} className="w-auto h-full rounded-md" alt={selectedItem.nama} />
        </div>
        <div className="w-[98%] h-80 md:w-[48%] md:h-[98%] flex flex-col">
          <h2 className="w-full font-black text-4xl">{selectedItem.nama}</h2>
          <p className="w-full text-xs font-medium mt-2">{selectedItem.deskripsi}</p>
          <div className="w-full h-1/2 flex flex-col justify-center items-center gap-2">
            <h3 className="w-full text-sm font-bold mt-10">LEVEL</h3>
            <div className="flex w-full h-1/2 gap-3 overflow-x-scrollhide-bar">
              {selectedItem.level?.map((level, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedLevel(level)}
                  className={`w-1/4 h-10 rounded-3xl shadow flex justify-center items-center font-bold text-sm cursor-pointer ${
                    level === selectedLevel
                      ? "bg-[#0E0D0D] text-yellow-500"
                      : "hover:bg-[#0E0D0D] hover:text-white hover:scale-95"
                  } duration-100`}
                >
                  {level}
                </div>
              ))}
            </div>

            <div className="w-full flex justify-center items-center gap-x-2 lg:gap-x-4 h-auto">
              <div className="w-1/3 lg:w-1/4 items-center aspect-[2/1] flex justify-between">
                <button
                  className={`h-8 w-8 rounded-full flex justify-center items-center shadow ${
                    quantity === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-[#dedee0] hover:scale-105"
                  } text-[#0e0d0d] text-lg`}
                  onClick={decreaseQuantity}
                  disabled={quantity === 0}
                >
                  -
                </button>
                <div className="h-1/2 aspect-square flex justify-center items-center text-[#0e0d0d]">
                  {quantity}
                </div>
                <button
                  className="h-8 w-8 rounded-full flex justify-center items-center shadow bg-[#dedee0] text-[#0e0d0d] text-lg hover:scale-105"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
              <div
                className="md:w-full lg:w-1/2 w-1/2 sm:w-1/3 flex justify-between group hover:scale-95 items-center p-2 rounded-3xl bg-[#0e0d0d]"
                onClick={handleAddToOrder}
              >
                <h3 className="text-[#fdfdfd] text-xs lg:text-sm">
                  Rp{(quantity * selectedItem.harga).toLocaleString()}
                </h3>
                <h3 className="text-[#fdfdfd] text-xs lg:text-sm group-hover:text-yellow-500 duration-500 font-medium">
                  Add to order
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
