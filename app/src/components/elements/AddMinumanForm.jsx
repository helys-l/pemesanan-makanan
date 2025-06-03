import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../data/firebase.js";

export default function AddMakananForm({ onCancel, onSave }) {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [gambar, setGambar] = useState("");
  const [level, setLevel] = useState(["Level 0"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!nama || !deskripsi || !harga || !gambar) {
      setError("Semua field harus diisi");
      setLoading(false);
      return;
    }

    try {
      const colRef = collection(db, "minuman");
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

        {/* Level Pedas (non-editable) */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Level Pedas:</label>
          <input
            type="text"
            value={level[0]}
            className="w-full border border-gray-300 rounded px-2 py-1 bg-gray-100 cursor-not-allowed"
            readOnly
          />
          <p className="text-xs text-gray-500 mt-1">Level otomatis: Level 0</p>
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
