import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { toast, Toaster } from 'react-hot-toast';


export default function MyOrder({ orders, setOrders }) {
    const [note, setNote] = useState("");
    const [selected, setSelected] = useState(null);
    const [name, setName] = useState("");
    const total = orders.reduce((sum, item) => sum + item.quantity * item.harga, 0);
    const options = Array.from({ length: 30 }, (_, i) => `No. ${i + 1}`);
    const [isSubmitting, setIsSubmitting] = useState(false);
  
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

    const removeItem = (index) => {
      const updatedOrders = [...orders];
      updatedOrders.splice(index, 1); // hapus satu item di posisi index
      setOrders(updatedOrders);
    };


    
  
    return (
      
      <div className="Container rounded-xl h-auto py-6 md:min-h-[32rem] gap-3 md:w-[30%] card">
        <form name="Pesanan" className="hidden">
          <input type="text" name="Nama Pemesan" />
          <input type="text" name="Tanggal Pemesanan" />
          <input type="text" name="No. Tempat Duduk" />
          <input type="text" name="Pesanan" />
          <input type="text" name="Total Harga" />
          <input type="text" name="Catatan" />
        </form>
        
        <h1 className="w-full h-10 md:h-12 pl-8 font-black flex items-center text-sm sm:text-md md:text-xl">My Order</h1>
        <input
        type="text"
        className='w-[90%] ml-5  h-10 rounded-lg z-10 bg-[#f5f5f5] px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#DC2318] mb-3'
        placeholder='Masukkan Nama'
        value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <Combobox value={selected} onChange={setSelected}>
            <div className="relative w-[90%] ml-5 mb-2">
                <Combobox.Input
                className="w-full h-10 rounded-lg z-10 bg-[#f5f5f5] px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#DC2318]"
                displayValue={(seat) => seat}
                onChange={() => {}}
                placeholder="Pilih No. Tempat Duduk"
                />
                <Combobox.Options className="absolute z-10 mt-1 w-full max-h-60 overflow-scrol hide-bar rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
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
        <div className='w-[80%] min-h-[40%] z-0 h-auto py-3 mx-auto mt-3 hide-bar overflow-y-scroll'>
          {orders.map((item, index) => (
            <div key={index} className='relative z-0 w-full h-20 rounded-lg gap-3 mt-2 border border-dashed flex justify-between px-2 items-center'>
              <button
                className="absolute -top-2 right-2 w-6 h-6 bg-[#DC2318] text-white rounded-full text-xs flex items-center justify-center shadow-md hover:scale-110"
                onClick={() => removeItem(index)}
                title="Hapus pesanan"
              >
                ×
              </button>
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
            className='w-[90%] ml-5  h-10 rounded-lg z-10 bg-[#f5f5f5] px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#DC2318]'
            placeholder='Catatan'
            value={note}
            onChange={(e) => setNote(e.target.value)}
            />
        <div className='w-full h-12 flex justify-between items-center px-10'>
          <p className='text-xs md:text-lg font-medium'>Total</p>
          <p className='text-xs md:text-lg font-medium'>Rp{total.toLocaleString()}</p>
        </div>
        <Toaster position="top-center" reverseOrder={false} />

        <button
  type='submit'
  disabled={isSubmitting}
  className={`w-[90%] h-12 mx-auto rounded-full flex justify-center items-center text-white transition duration-200 ${
    isSubmitting ? 'bg-gray-400 opacity-50 cursor-not-allowed' : 'bg-[#DC2318] hover:scale-95 cursor-pointer'
  }`}
  onClick={async () => {
    if (isSubmitting) return;

    if (orders.length === 0) {
      toast.error("Belum ada pesanan, silakan pesan dahulu!");
      return;
    }
    if (!name.trim() || !selected) {
      toast.error("Isi Nama dan Nomor Tempat Duduk terlebih dahulu!");
      return;
    }

    try {
      toast.success("Pesanan berhasil dikirim!");
      setIsSubmitting(true);

      const form = document.forms['Pesanan'];
      form.elements['Nama Pemesan'].value = name;
      const today = new Date();
      const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
      form.elements['Tanggal Pemesanan'].value = formattedDate;

      form.elements['No. Tempat Duduk'].value = selected;
      form.elements['Pesanan'].value = orders.map(item => {
        const levelText = item.level !== undefined ? `${item.level}` : "level 0";
        return `(${item.nama}, ${levelText}, jumlah ${item.quantity})`;
      }).join(",\n ");
      form.elements['Total Harga'].value = total;
      form.elements['Catatan'].value = note;

      const scriptURL = 'https://script.google.com/macros/s/AKfycbyUP0k0uTXcogk5AQZdGo8mOkcje2zBz_yPtfzCHKAZHrllvoEpCDQ4dih3X02OTGfTdA/exec';

      await fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form)
      });

      
      setOrders([]);
      setName("");
      setSelected(null);
      setNote("");
      setIsSubmitting(false);

    } catch (error) {
      toast.error("Terjadi kesalahan saat mengirim pesanan.");
      console.error(error);
    } finally {
      setIsSubmitting(false); // aktifkan kembali tombol
    }
  }}
>
  {isSubmitting ? "Mengirim..." : "Order"}
</button>



      </div>
    );
  }
  