import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../data/firebase.js";

export default function AddMakananForm({ onCancel, onSave }) {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [gambar, setGambar] = useState("");
  const [level, setLevel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLevelChange = (index, value) => {
    const newLevel = [...level];
    newLevel[index] = value;
    setLevel(newLevel);
  };

  const handleAddLevel = () => {
    if (level.length < 4) {
      setLevel([...level, ""]);
    }
  };

  const handleRemoveLevel = (index) => {
    const newLevel = level.filter((_, i) => i !== index);
    setLevel(newLevel);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!nama || !deskripsi || !harga || !gambar || level.length === 0) {
      setError("Semua field harus diisi");
      setLoading(false);
      return;
    }

    try {
      const colRef = collection(db, "makanan");
      const docRef = await addDoc(colRef, {
        nama,
        deskripsi,
        harga: Number(harga),
        gambar,
        level,
      });

      onSave({
        id: docRef.id,
        nama,
        deskripsi,
        harga: Number(harga),
        gambar,
        level,
      });

      setLoading(false);
    } catch (err) {
      setError("Gagal menambah menu baru");
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-screen overflow-y-auto hide-bar"
      >
        <h3 className="text-xl font-bold mb-4">Tambah Menu Baru</h3>

        <label className="block mb-2">
          Nama:
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
            required
          />
        </label>

        <label className="block mb-2">
          Deskripsi:
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
            rows={3}
            required
          />
        </label>

        <label className="block mb-2">
          Harga:
          <input
            type="number"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
            min={0}
            required
          />
        </label>

        <label className="block mb-4">
          URL Gambar:
          <input
            type="text"
            value={gambar}
            onChange={(e) => setGambar(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
            required
          />
        </label>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Level Pedas:</label>
          {level.map((lvl, index) => (
            <div key={index} className="flex gap-2 items-center mb-2">
              <input
                type="text"
                value={lvl}
                onChange={(e) => handleLevelChange(index, e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveLevel(index)}
                className="text-sm text-red-500 hover:underline"
              >
                Hapus
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddLevel}
            className={`text-sm mt-1 ${
              level.length >= 4
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:underline"
            }`}
            disabled={level.length >= 4}
          >
            + Tambah Level
          </button>
          {level.length >= 4 && (
            <p className="text-xs text-red-500 mt-1">Maksimal 4 level pedas.</p>
          )}
        </div>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            disabled={loading}
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-[#DC2318] text-white px-4 py-2 rounded hover:opacity-80"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}
