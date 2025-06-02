import MakananList from "./MakananList";
import MinumanList from "./MinumanList";
import TambahanList from "./MenuTambahanList";

export default function AdminContent({ selected }) {
  return (
    <div className="w-full p-4 sm:p-6 md:p-8 overflow-auto">
      {selected === "makanan" && <MakananList />}
      {selected === "minuman" && <MinumanList />}
      {selected === "menuTambahan" && <TambahanList />}
    </div>
  );
}
