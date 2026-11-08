// Data produk statis, kategori, dan pencarian produk berdasarkan ID.
const KATEGORI = ["Fashion", "Elektronik", "Beauty", "Home", "Stationery"];
const IKON_KATEGORI = { Fashion: "👜", Elektronik: "🎧", Beauty: "🧴", Home: "💡", Stationery: "📓" };

const PRODUCTS = [
  { id: 1, nama: "Tas Kuliah Casual", harga: 125000, kategori: "Fashion", deskripsi: "Tas casual berbahan kanvas tebal dengan kompartemen laptop hingga 14 inci. Cocok untuk kuliah dan aktivitas sehari-hari.", gambar: "assets/images/tas.svg", stok: 15 },
  { id: 2, nama: "Headset Bluetooth", harga: 85000, kategori: "Elektronik", deskripsi: "Headset nirkabel Bluetooth 5.0 dengan suara jernih dan baterai tahan hingga 20 jam pemakaian.", gambar: "assets/images/headset.svg", stok: 20 },
  { id: 3, nama: "Jam Tangan Digital", harga: 150000, kategori: "Fashion", deskripsi: "Jam tangan digital tahan percikan air dengan stopwatch, alarm, dan lampu latar.", gambar: "assets/images/jam.svg", stok: 10 },
  { id: 4, nama: "Produk Skincare", harga: 95000, kategori: "Beauty", deskripsi: "Pelembap wajah ringan untuk kulit normal hingga berminyak. Cepat meresap dan tidak lengket.", gambar: "assets/images/skincare.svg", stok: 12 },
  { id: 5, nama: "Lampu Meja Minimalis", harga: 110000, kategori: "Home", deskripsi: "Lampu meja LED dengan tiga tingkat kecerahan dan leher fleksibel, cocok untuk belajar dan bekerja.", gambar: "assets/images/lampu.svg", stok: 8 },
  { id: 6, nama: "Notebook Premium", harga: 35000, kategori: "Stationery", deskripsi: "Buku catatan sampul keras 160 halaman dengan kertas 100 gsm yang nyaman untuk menulis.", gambar: "assets/images/notebook.svg", stok: 25 },
  { id: 7, nama: "Sepatu Sneakers Putih", harga: 249000, kategori: "Fashion", deskripsi: "Sneakers putih polos dengan sol karet empuk yang mudah dipadukan untuk berbagai gaya.", gambar: "assets/images/sneakers.svg", stok: 12 },
  { id: 8, nama: "Power Bank 10.000 mAh", harga: 175000, kategori: "Elektronik", deskripsi: "Power bank ringkas 10.000 mAh dengan dua port keluaran dan pengisian cepat.", gambar: "assets/images/powerbank.svg", stok: 14 },
  { id: 9, nama: "Serum Wajah Vitamin C", harga: 120000, kategori: "Beauty", deskripsi: "Serum vitamin C untuk membantu tampilan kulit tampak lebih cerah dan merata.", gambar: "assets/images/serum.svg", stok: 9 },
  { id: 10, nama: "Vas Keramik Minimalis", harga: 90000, kategori: "Home", deskripsi: "Vas keramik putih gading dengan bentuk sederhana untuk bunga segar atau kering.", gambar: "assets/images/vas.svg", stok: 0 },
  { id: 11, nama: "Pulpen Gel Set 6 Warna", harga: 28000, kategori: "Stationery", deskripsi: "Set enam pulpen gel 0,5 mm dengan tinta cepat kering dan tidak mudah luntur.", gambar: "assets/images/pulpen.svg", stok: 30 },
  { id: 12, nama: "Mouse Wireless", harga: 99000, kategori: "Elektronik", deskripsi: "Mouse nirkabel 2,4 GHz dengan klik senyap dan baterai awet untuk kerja harian.", gambar: "assets/images/mouse.svg", stok: 18 }
];

// ID produk yang tampil di bagian "Produk Unggulan" pada Home
const FEATURED_IDS = [1, 2, 3, 5];

function findProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}
