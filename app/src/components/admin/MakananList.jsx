import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../data/firebase.js";
import EditMakananForm from "../elements/EditMakananForm.jsx";
import AddMakananForm from "../elements/AddMakananForm.jsx"; //
import toast from "react-hot-toast";

export default function MakananListFirebase() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [addingNew, setAddingNew] = useState(false); // 

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const col = collection(db, "makanan");
        const snapshot = await getDocs(col);
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(list);
        setLoading(false);
      } catch (err) {
        setError("Gagal memuat data makanan");
        setLoading(false);
        console.error(err);
      }
    }
    fetchData();
  }, []);

const handleDelete = async (item) => {
  toast((t) => (
    <div className="text-sm text-[#0e0d0d]">
      <p>Yakin ingin menghapus <strong>{item.nama}</strong>?</p>
      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-3 py-1 rounded-full text-xs bg-stone-300 text-stone-800 hover:bg-stone-400"
        >
          Batal
        </button>
        <button
          onClick={async () => {
            const loadingId = toast.loading("Menghapus...", {
              id: t.id,
              style: {
                borderRadius: "999px",
                background: "#f4f4f5",
                color: "#0e0d0d",
              },
            });

            try {
              await deleteDoc(doc(db, "makanan", item.id));
              setData(prev => prev.filter(i => i.id !== item.id));
              toast.success(`"${item.nama}" berhasil dihapus`, {
                id: loadingId,
                style: {
                  borderRadius: "999px",
                  background: "#DC2318",
                  color: "#fff",
                },
              });
            } catch (err) {
              toast.error("Gagal menghapus data", {
                id: loadingId,
                style: {
                  borderRadius: "999px",
                  background: "#f4f4f5",
                  color: "#DC2318",
                },
              });
              console.error(err);
            }
          }}
          className="px-3 py-1 rounded-full text-xs bg-[#DC2318] text-white hover:opacity-90"
        >
          Hapus
        </button>
      </div>
    </div>
  ), {
    duration: 5000, // biar gak langsung hilang
    style: {
      borderRadius: "12px",
      background: "#f4f4f5",
      color: "#0e0d0d",
    },
  });
};


  const handleUpdate = (updatedItem) => {
    setData(data.map(item => (item.id === updatedItem.id ? updatedItem : item)));
    setEditingItem(null);
  };

  // handler untuk tambah data baru ke list setelah submit sukses
  const handleAddNew = (newItem) => {
    setData([...data, newItem]);
    setAddingNew(false);
  };

  if (loading) return <div className="p-4 text-center">Loading data...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl font-bold text-[#DC2318] mb-4">Makanan</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
  <div key={item.id} className="shadow rounded-xl p-4 hover:shadow-lg transition-all">
    <img src={item.gambar} alt={item.nama} className="w-full h-40 object-cover rounded-lg mb-3" />
    
    <h3 className="font-bold text-lg text-[#DC2318]">{item.nama}</h3>
    <p className="text-sm text-stone-700 mb-1">{item.deskripsi}</p>

    {/* TAMPILKAN LEVEL */}
    {item.level && (
      <div className="flex w-full gap-2 my-2 flex-wrap">
        {item.level.map((level, index) => (
          <div
            key={index}
            className="px-3 py-1 rounded-3xl border text-xs font-semibold text-stone-700 hover:bg-[#0E0D0D] hover:text-white transition-all"
          >
            {level}
          </div>
        ))}
      </div>
    )}

    <p className="text-sm font-semibold text-stone-900">Rp {item.harga.toLocaleString()}</p>

    <div className="mt-3 flex gap-2">
      <button
        onClick={() => setEditingItem(item)}
        className="bg-[#DC2318] text-white px-3 py-1 rounded-full text-sm hover:opacity-80"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(item)}
        className="bg-stone-300 text-stone-700 px-3 py-1 rounded-full text-sm hover:bg-stone-400"
      >
        Hapus
      </button>
    </div>
  </div>
))}


        {/* Card untuk tombol tambah */}
        <div
          onClick={() => setAddingNew(true)}
          className="border border-dashed rounded-xl p-4 shadow-md min-h-[240px] h-full cursor-pointer flex justify-center items-center text-[#DC2318] text-4xl font-bold hover:bg-[#ffe5e5] transition-all select-none"
          
          title="Tambah Menu Baru"
        >
          +
        </div>
      </div>

      {/* Form Edit */}
      {editingItem && (
        <EditMakananForm
          item={editingItem}
          onCancel={() => setEditingItem(null)}
          onSave={handleUpdate}
        />
      )}

      {/* Form Tambah */}
      {addingNew && (
        <AddMakananForm
          onCancel={() => setAddingNew(false)}
          onSave={handleAddNew}
        />
      )}
    </div>
  );
}
