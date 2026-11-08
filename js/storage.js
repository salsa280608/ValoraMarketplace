// Penyimpanan keranjang di localStorage (key: "valoraCart").
// Data yang dipulihkan divalidasi terhadap data produk dan stok terbaru.
const CartStorage = {
  key: "valoraCart",

  load() {
    let raw;
    try {
      raw = JSON.parse(localStorage.getItem(this.key));
    } catch (e) {
      return [];
    }
    if (!Array.isArray(raw)) return [];

    const hasil = [];
    raw.forEach(item => {
      const p = item && findProduct(Number(item.id));
      const jumlah = Math.floor(Number(item && item.jumlah));
      if (!p || p.stok <= 0 || !(jumlah > 0)) return;     // produk hilang / stok habis / jumlah tidak valid
      if (hasil.some(h => h.id === p.id)) return;          // hindari duplikat
      hasil.push({ id: p.id, nama: p.nama, harga: p.harga, jumlah: Math.min(jumlah, p.stok) });
    });
    return hasil;
  },

  save(cart) {
    try {
      localStorage.setItem(this.key, JSON.stringify(cart));
    } catch (e) {
      /* penyimpanan diblokir browser: keranjang tetap berfungsi selama halaman terbuka */
    }
  }
};
