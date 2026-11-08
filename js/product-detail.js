// Halaman Detail Produk: menampilkan produk berdasarkan parameter ?id=
function initDetail() {
  const id = Number(new URLSearchParams(location.search).get("id"));
  const box = document.getElementById("detail");
  const crumb = document.getElementById("breadcrumb");
  const p = findProduct(id);

  if (!p) {
    crumb.innerHTML = `<a href="../index.html">Home</a> / <a href="katalog.html">Katalog</a>`;
    box.innerHTML = `<div class="empty"><h3>Produk tidak tersedia</h3><p>Produk yang Anda cari tidak ditemukan.</p><a class="btn btn-primary" href="katalog.html">Kembali ke Katalog</a></div>`;
    return;
  }

  document.title = `${p.nama} | Valora`;
  crumb.innerHTML = `<a href="../index.html">Home</a> / <a href="katalog.html?kategori=${encodeURIComponent(p.kategori)}">${p.kategori}</a> / <span class="cur">${p.nama}</span>`;

  const habis = p.stok <= 0;
  box.innerHTML = `<div class="detail">
    <div class="detail-img"><img src="../${p.gambar}" alt="${p.nama}"></div>
    <div class="detail-info">
      <span class="card-cat">${p.kategori}</span>
      <h1>${p.nama}</h1>
      <p class="price-lg">${formatRupiah(p.harga)}</p>
      <p class="stock ${habis ? "out" : ""}">${habis ? "✕ Stok habis, produk tidak tersedia" : "✓ Stok tersedia: " + p.stok}</p>
      <p class="desc">${p.deskripsi}</p>
      ${habis ? "" : `<div class="qty-row">
        <label for="qtyInput">Jumlah</label>
        <div class="qty">
          <button type="button" id="qtyMinus" aria-label="Kurangi jumlah">−</button>
          <input type="number" id="qtyInput" value="1" min="1" max="${p.stok}">
          <button type="button" id="qtyPlus" aria-label="Tambah jumlah">+</button>
        </div>
      </div>`}
      <button type="button" class="btn btn-primary" id="addBtn" ${habis ? "disabled" : ""}>${habis ? "Stok Habis" : "Tambah ke Keranjang"}</button>
    </div>
  </div>`;

  if (habis) return;
  const input = document.getElementById("qtyInput");
  const atur = n => { input.value = Math.min(Math.max(Math.floor(n) || 1, 1), p.stok); };

  document.getElementById("qtyMinus").addEventListener("click", () => atur(Number(input.value) - 1));
  document.getElementById("qtyPlus").addEventListener("click", () => {
    if (Number(input.value) >= p.stok) showToast(`Jumlah maksimal sesuai stok (${p.stok}).`, "error");
    atur(Number(input.value) + 1);
  });
  input.addEventListener("change", () => atur(Number(input.value)));
  document.getElementById("addBtn").addEventListener("click", () => {
    atur(Number(input.value));
    const hasil = addToCart(p.id, Number(input.value));
    showToast(hasil.msg, hasil.ok ? "success" : "error");
  });
}
