import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { toast, Toaster } from 'react-hot-toast';


export default function MyOrder({ orders, setOrders }) {
    const [note, setNote] = useState("");
    const [selected, setSelected] = useState(null);
    const [name, setName] = useState("");
    const total = orders.reduce((sum, item) => sum + item.quantity * item.harga, 0);
    const options = Array.from({ length: 30 }, (_, i) => `No. ${i + 1}`);
  
    const increaseQuantity = (index) => {
      const updatedOrders = [...orders];
      updatedOrders[index].quantity += 1;
      setOrders(updatedOrders);
    };
  
    const decreaseQuantity = (index) => {
      const updatedOrders = [...orders];
      if (updatedOrders[index].quantity > 1) {
        updatedOrders[index].quantity -= 1;
        setOrders(updatedOrders);
      }
    };
  
    return (
      <div className="Container rounded-xl h-auto min-h-[32rem] gap-3 md:w-[30%] card">
        <h1 className="w-full h-10 md:h-12 pl-8 font-black flex items-center text-sm sm:text-md md:text-xl">My Order</h1>
        <input
        type="text"
        className='w-[90%] ml-5 border-none focus:outline-none placeholder:px-2'
        placeholder='Masukkan Nama'
        value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <Combobox value={selected} onChange={setSelected}>
            <div className="relative w-[90%] ml-5">
                <Combobox.Input
                className="w-full h-10 rounded-lg bg-[#f5f5f5] px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#DC2318]"
                displayValue={(seat) => seat}
                onChange={() => {}}
                placeholder="Pilih No. Tempat Duduk"
                />
                <Combobox.Options className="absolute mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
                {options.map((opt, idx) => (
                    <Combobox.Option
                    key={idx}
                    value={opt}
                    className={({ active }) =>
                        `cursor-pointer select-none px-4 py-2 ${
                        active ? 'bg-[#DC2318] text-white' : 'text-gray-900'
                        }`
                    }
                    >
                    {opt}
                    </Combobox.Option>
                ))}
                </Combobox.Options>
            </div>
        </Combobox>
        <p className='w-full text-sm font-medium pl-8 text-stone-500'>{orders.length} Positions</p>
        <div className='w-[80%] min-h-[40%] h-auto py-3 mx-auto mt-3 hide-bar overflow-y-scroll'>
          {orders.map((item, index) => (
            <div key={index} className='w-full h-20 rounded-lg gap-3 mt-2 border border-dashed flex justify-between px-2 items-center'>
              <div className='h-[95%] aspect-square'><img src={item.gambar} className='w-full h-full' alt={item.nama} /></div>
              <div className='h-[95%] w-2/3'>
                <h3 className='text-sm font-medium md:text-xs lg:text-sm'>{item.nama}</h3>
                {item.level !== undefined && (
                  <p className='text-xs font-medium'>Level {item.level}</p>
                )}
                <div className='w-[90%] mx-auto h-10 flex justify-between items-center'>
                  <p className='text-xs text-[#DC2318]'>Rp{(item.harga * item.quantity).toLocaleString()}</p>
                  <div className="w-1/2 items-center aspect-[2/1] flex justify-between">
                    <button
                      className={`h-8 w-8 rounded-full flex justify-center items-center ${item.quantity === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-[#dedee0]"} text-[#0e0d0d] text-lg`}
                      onClick={() => decreaseQuantity(index)}
                      disabled={item.quantity === 0}
                    >
                      -
                    </button>
                    <div className='h-1/2 aspect-square flex justify-center items-center text-[#0e0d0d]'>{item.quantity}</div>
                    <button
                      className="h-8 w-8 rounded-full flex justify-center items-center bg-[#dedee0] text-[#0e0d0d] text-lg"
                      onClick={() => increaseQuantity(index)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <input
            type="text"
            className='w-[90%] ml-5 border-none focus:outline-none placeholder:px-2'
            placeholder='Catatan'
            value={note}
            onChange={(e) => setNote(e.target.value)}
            />
        <div className='w-full h-12 flex justify-between items-center px-10'>
          <p className='text-xs md:text-lg font-medium'>Total</p>
          <p className='text-xs md:text-lg font-medium'>Rp{total.toLocaleString()}</p>
        </div>
        <Toaster position="top-center" reverseOrder={false} />

        <div
  className='w-[90%] h-12 mx-auto bg-[#DC2318] rounded-full flex justify-center items-center text-white hover:scale-95 cursor-pointer'
  onClick={async () => {
    if (orders.length === 0) {
      toast.error("Belum ada pesanan, silakan pesan dahulu!");
    } else if (!name.trim() || !selected) {
      toast.error("Isi Nama dan Nomor Tempat Duduk terlebih dahulu!");
    } else {
      try {
        const formData = new URLSearchParams();
        formData.append("data", JSON.stringify({
          name,
          seat: selected,
          note,
          orders,
        }));

        const response = await fetch("https://script.google.com/macros/s/AKfycbwddLynhZVCnHT1ZiEidom0BEmXYbCKV2vGwmX0Il8Fo2V3r-Jda7pDJXrRIIlTitHJ/exec", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (result.result === "success") {
          toast.success("Pesanan berhasil dikirim!");
          setOrders([]);
          setName("");
          setSelected(null);
          setNote("");
        } else {
          toast.error("Gagal mengirim pesanan!");
        }
      } catch (error) {
        toast.error("Terjadi kesalahan saat mengirim pesanan.");
        console.error(error);
      }
    }
  }}
>
  Order
</div>


      </div>
    );
  }
  