// Logika keranjang: tambah, ubah jumlah, hapus, subtotal, total.
// Setiap fungsi aksi mengembalikan { ok, msg } agar UI dapat menampilkan feedback.
let cart = CartStorage.load();

function persist() {
  CartStorage.save(cart);
  if (typeof updateBadge === "function") updateBadge();
}

function getCart() { return cart; }

function addToCart(id, jumlah = 1) {
  const p = findProduct(id);
  if (!p) return { ok: false, msg: "Produk tidak ditemukan." };
  if (p.stok <= 0) return { ok: false, msg: "Stok produk habis." };

  const item = cart.find(i => i.id === id);
  const jumlahBaru = (item ? item.jumlah : 0) + jumlah;
  if (jumlahBaru > p.stok) {
    return { ok: false, msg: `Jumlah melebihi stok. Stok tersedia ${p.stok}.` };
  }
  if (item) item.jumlah = jumlahBaru;
  else cart.push({ id: p.id, nama: p.nama, harga: p.harga, jumlah });
  persist();
  return { ok: true, msg: `${p.nama} ditambahkan ke keranjang.` };
}

function updateQuantity(id, delta) {
  const item = cart.find(i => i.id === id);
  const p = findProduct(id);
  if (!item || !p) return { ok: false, msg: "Produk tidak ada di keranjang." };

  const jumlahBaru = item.jumlah + delta;
  if (jumlahBaru <= 0) return removeItem(id);
  if (jumlahBaru > p.stok) {
    return { ok: false, msg: `Jumlah melebihi stok. Stok tersedia ${p.stok}.` };
  }
  item.jumlah = jumlahBaru;
  persist();
  return { ok: true, msg: "" };
}

function removeItem(id) {
  const item = cart.find(i => i.id === id);
  cart = cart.filter(i => i.id !== id);
  persist();
  return { ok: true, msg: item ? `${item.nama} dihapus dari keranjang.` : "" };
}

function getSubtotal(item) { return item.harga * item.jumlah; }
function getTotal() { return cart.reduce((sum, item) => sum + getSubtotal(item), 0); }
function getCount() { return cart.reduce((sum, item) => sum + item.jumlah, 0); }
