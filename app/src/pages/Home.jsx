import Makanan from '../components/home/Makanan'
import Minuman from '../components/home/Minuman'
import MenuTambahan from '../components/home/MenuTambahan'
import Menu from '../components/home/Menu'
import MyOrder from "../components/home/MyOrder";
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
            </main>
         </section>
        </>
    )
}