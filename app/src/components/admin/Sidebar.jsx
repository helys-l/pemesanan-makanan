import { FaDrumstickBite, FaGlassWhiskey, FaPlusCircle, FaUserCog, FaBars } from "react-icons/fa";
import { useState } from "react";

export default function Sidebar({ activeMenu, setActiveMenu }) {
  const [isOpen, setIsOpen] = useState(false);

  const menus = [
    { key: "makanan", label: "Makanan", icon: <FaDrumstickBite /> },
    { key: "minuman", label: "Minuman", icon: <FaGlassWhiskey /> },
    { key: "menuTambahan", label: "Menu Tambahan", icon: <FaPlusCircle /> },
  ];

  return (
    <>
      {/* Tombol Hamburger untuk Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#dc2318] text-white shadow-lg"
        aria-label="Toggle Menu"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
  className={`
    fixed top-0 left-0 h-screen w-64
    bg-[#dc2318] text-white z-40
    transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
     md:translate-x-0 md:flex md:flex-col md:py-4 md:px-2
    md:sticky md:top-0
    shadow-lg pt-16
  `}
>

        <div className="text-center text-2xl font-extrabold mb-8 hidden md:block">Mas Hely</div>
        <nav className="flex flex-col gap-4">
          {menus.map((menu) => (
            <button
              key={menu.key}
              onClick={() => {
                setActiveMenu(menu.key);
                setIsOpen(false); // tutup sidebar setelah klik di mobile
              }}
              className={`flex items-center gap-4 px-3 py-2 rounded-lg border-2 transition-all w-full text-left
                ${
                  activeMenu === menu.key
                    ? "bg-white text-[#dc2318] font-bold"
                    : "hover:bg-[#fdfdfe] hover:text-[#dc2318]"
                }`}
            >
              <div className="text-lg border-2 rounded-full p-1">{menu.icon}</div>
              <span className=" duration-700">{menu.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Backdrop untuk klik di luar sidebar agar tutup sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
