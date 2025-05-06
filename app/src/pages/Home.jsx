import Makanan from '../components/Makanan'
import Minuman from '../components/Minuman'
import MenuTambahan from '../components/MenuTambahan'
import Menu from '../components/Menu'
import MyOrder from "../components/MyOrder";
import { useState } from 'react';

export default function Home() {
    const [orders, setOrders] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState('makanan'); // default: Makanan

    const renderMenuContent = () => {
        switch (selectedMenu) {
            case 'makanan':
                return <Makanan addToOrder={addToOrder}/>;
            case 'minuman':
                return <Minuman addToOrder={addToOrder}/>;
            case 'menuTambahan':
                return <MenuTambahan addToOrder={addToOrder}/>;
            default:
                return null;
        }
    };

    const addToOrder = (item, level, quantity) => {
        const existing = orders.find(order => order.nama === item.nama && order.level === level);
        if (existing) {
          setOrders(prev =>
            prev.map(order =>
              order.nama === item.nama && order.level === level
                ? { ...order, quantity: order.quantity + quantity }
                : order
            )
          );
        } else {
          setOrders(prev => [...prev, { ...item, level, quantity }]);
        }
      };

    return (
        <>
         <section className="w-screen h-auto min-h-screen py-3 bg-[#f0f0f2]">
            <Menu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
            <main className="container h-auto min-h-[30rem] mt-3 gap-3 mx-auto flex flex-col md:flex-row">
                
                {renderMenuContent()}
                <MyOrder orders={orders} setOrders={setOrders}></MyOrder>
                {/* <div className="Container rounded-xl h-auto min-h-[32rem] gap-3 md:w-[30%] card">
                    <h1 className="w-full h-10 md:h-12 pl-8 font-black flex items-center text-sm sm:text-md md:text-xl">My Order</h1>
                    <p className='w-full text-sm font-medium pl-8 text-stone-500'>2 Positions</p>
                    <div className='w-[80%] min-h-[40%] h-auto py-3 mx-auto mt-3 hide-bar overflow-y-scroll'>
                        <div className='w-full h-20 rounded-lg gap-3 mt-2 border border-dashed flex justify-between px-2 items-center'>
                            <div className='h-[95%] aspect-square'><img src='' className='w-full h-full' alt="" /></div>
                            <div className='h-[95%] w-2/3'>
                                <h3 className=' text-sm font-medium md:text-xs lg:text-sm'>Ayam Geprek</h3>
                                <p className=' text-xs font-medium'>Level 3</p>
                                <div className='w-[90%] mx-auto h-10 flex justify-between md:justify-center lg:justify-between md:gap-x-1  lg:px-1 items-center'>
                                    <p className='text-xs text-[#DC2318]'>Rp12.000</p>
                                    <div className="w-1/3 h-full lg:w-1/4 items-center aspect-[2/1] flex justify-between">
                                        <div className="h-1/2 aspect-square rounded-full bg-[#dedee0] text-[#0e0d0d] text-sm lg:text-xl  justify-center items-center flex">-</div>
                                        <div className='h-1/2 aspect-square flex justify-center items-center text-[#0e0d0d]'>1</div>
                                        <div className="h-1/2 aspect-square rounded-full bg-[#dedee0] text-[#0e0d0d] text-sm lg:text-xl justify-center items-center flex">+</div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-20 rounded-lg gap-3 mt-2 border border-dashed flex justify-between px-2 items-center'>
                            <div className='h-[95%] aspect-square'><img src='' className='w-full h-full' alt="" /></div>
                            <div className='h-[95%] w-2/3'>
                                <h3 className=' text-sm font-medium md:text-xs lg:text-sm'>Nasi Gorengk</h3>
                                <p className=' text-xs font-medium'>Level 1</p>
                                <div className='w-[90%] mx-auto h-10 flex justify-between md:justify-center lg:justify-between md:gap-x-1  lg:px-1 items-center'>
                                    <p className='text-xs text-[#DC2318]'>Rp11.000</p>
                                    <div className="w-1/3 h-full lg:w-1/4 items-center aspect-[2/1] flex justify-between">
                                        <div className="h-1/2 aspect-square rounded-full bg-[#dedee0] text-[#0e0d0d] text-sm lg:text-xl  justify-center items-center flex">-</div>
                                        <div className='h-1/2 aspect-square flex justify-center items-center text-[#0e0d0d]'>3</div>
                                        <div className="h-1/2 aspect-square rounded-full bg-[#dedee0] text-[#0e0d0d] text-sm lg:text-xl justify-center items-center flex">+</div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="text" className='w-[90%] ml-5 border-none focus:outline-none placeholder:px-2' placeholder='Masukkan Nama' />
                    <input type="text" className='w-[90%] ml-5 border-none focus:outline-none placeholder:px-2' placeholder='No.Tempat Duduk' />
                    <input type="text" className='w-[90%] ml-5 border-none focus:outline-none placeholder:px-2' placeholder='Catatan' />

                    <div className='w-full h-12 flex justify-between items-center px-10'>
                        <p className='text-xs md:text-lg font-medium'>Total</p>
                        <p className='text-xs md:text-lg font-medium'>Rp45.000</p>
                    </div>
                    <div className='w-[90%] h-12 mx-auto bg-[#DC2318] rounded-full flex justify-center items-center text-white hover:scale-95'>Order </div>
                </div> */}
            </main>
         </section>
        </>
    )
}