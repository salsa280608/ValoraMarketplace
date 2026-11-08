// Titik masuk: menyiapkan navbar/footer lalu menjalankan fungsi sesuai halaman (data-page).
function initHome() {
  document.getElementById("categoryGrid").innerHTML = KATEGORI.map(k =>
    `<a class="category-card" href="${ROOT}pages/katalog.html?kategori=${encodeURIComponent(k)}">
       <span class="cat-icon" aria-hidden="true">${IKON_KATEGORI[k]}</span><span>${k}</span></a>`).join("");
  document.getElementById("featuredGrid").innerHTML =
    FEATURED_IDS.map(findProduct).map(productCard).join("");
}

function initCart() {
  const list = document.getElementById("cartList");
  const summary = document.getElementById("cartSummary");

  function render() {
    const items = getCart();
    if (!items.length) {
      summary.hidden = true;
      list.innerHTML = `<div class="empty"><h3>Keranjang masih kosong</h3><p>Pilih produk di katalog, lalu tambahkan ke keranjang.</p><a class="btn btn-primary" href="katalog.html">Mulai Belanja</a></div>`;
      return;
    }
    summary.hidden = false;
    list.innerHTML = items.map(i => {
      const p = findProduct(i.id);
      return `<article class="cart-item" data-id="${i.id}">
        <img src="../${p.gambar}" alt="${i.nama}">
        <div><h3>${i.nama}</h3><p class="muted">${formatRupiah(i.harga)} per item</p></div>
        <div class="qty">
          <button type="button" data-act="minus" aria-label="Kurangi jumlah ${i.nama}">−</button>
          <span aria-label="Jumlah ${i.jumlah}">${i.jumlah}</span>
          <button type="button" data-act="plus" aria-label="Tambah jumlah ${i.nama}">+</button>
        </div>
        <p class="subtotal">${formatRupiah(getSubtotal(i))}</p>
        <button type="button" class="remove" data-act="remove" aria-label="Hapus ${i.nama} dari keranjang">Hapus</button>
      </article>`;
    }).join("");
    document.getElementById("cartCount").textContent = getCount();
    document.getElementById("cartTotal").textContent = formatRupiah(getTotal());
  }

  list.addEventListener("click", e => {
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    const id = Number(btn.closest(".cart-item").dataset.id);
    const aksi = btn.dataset.act;
    const hasil = aksi === "plus" ? updateQuantity(id, 1)
                : aksi === "minus" ? updateQuantity(id, -1)
                : removeItem(id);
    if (hasil.msg) showToast(hasil.msg, hasil.ok ? "success" : "error");
    render();
  });
  render();
}

document.addEventListener("DOMContentLoaded", () => {
  const halaman = document.body.dataset.page;
  renderLayout(halaman);
  const init = { home: initHome, katalog: initCatalog, detail: initDetail, keranjang: initCart }[halaman];
  if (init) init();
});
