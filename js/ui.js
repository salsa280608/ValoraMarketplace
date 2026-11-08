// Komponen bersama: format Rupiah, toast, navbar, footer, badge keranjang, kartu produk.
const ROOT = document.body.dataset.root || "";   // "" di index.html, "../" di folder pages/
const rupiahFmt = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });

function formatRupiah(angka) { return rupiahFmt.format(angka); }

function showToast(pesan, tipe = "success") {
  let box = document.getElementById("toastBox");
  if (!box) {
    box = document.createElement("div");
    box.id = "toastBox";
    box.setAttribute("role", "status");
    box.setAttribute("aria-live", "polite");
    document.body.appendChild(box);
  }
  const toast = document.createElement("div");
  toast.className = "toast " + (tipe === "error" ? "error" : "");
  toast.innerHTML = `<b aria-hidden="true">${tipe === "error" ? "!" : "✓"}</b><span></span>`;
  toast.querySelector("span").textContent = pesan;
  box.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

function updateBadge() {
  const badge = document.getElementById("cartBadge");
  if (badge) badge.textContent = getCount();
}

function productCard(p) {
  const habis = p.stok <= 0;
  const url = `${ROOT}pages/detail-produk.html?id=${p.id}`;
  return `<article class="card">
    <a class="card-img" href="${url}" aria-label="Lihat detail ${p.nama}"><img src="${ROOT}${p.gambar}" alt="${p.nama}" loading="lazy"></a>
    <div class="card-body">
      <span class="card-cat">${p.kategori}</span>
      <h3 class="card-title">${p.nama}</h3>
      <p class="price">${formatRupiah(p.harga)}</p>
      <p class="stock ${habis ? "out" : ""}">${habis ? "✕ Stok habis" : "✓ Stok: " + p.stok}</p>
      <a class="btn btn-outline" href="${url}">Lihat Detail</a>
    </div>
  </article>`;
}

function renderLayout(aktif) {
  document.getElementById("navbar").innerHTML = `
  <header class="navbar"><div class="container nav-inner">
    <a class="logo" href="${ROOT}index.html">Valora</a>
    <nav class="nav-links" id="navLinks" aria-label="Menu utama">
      <a href="${ROOT}index.html" ${aktif === "home" ? 'class="active" aria-current="page"' : ""}>Home</a>
      <a href="${ROOT}pages/katalog.html" ${aktif === "katalog" ? 'class="active" aria-current="page"' : ""}>Katalog</a>
      <a href="${ROOT}index.html#kategori">Kategori</a>
    </nav>
    <form class="nav-search" action="${ROOT}pages/katalog.html" method="get" role="search">
      <input type="search" name="q" placeholder="Cari produk..." aria-label="Cari produk">
      <button type="submit">Cari</button>
    </form>
    <a class="cart-link" href="${ROOT}pages/keranjang.html" aria-label="Buka keranjang belanja">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L21 7H6"/></svg>
      <span class="badge" id="cartBadge">0</span>
    </a>
    <button class="hamburger" id="menuBtn" aria-label="Buka menu" aria-expanded="false" aria-controls="navLinks">☰</button>
  </div></header>`;

  document.getElementById("footer").innerHTML = `
  <footer class="footer"><div class="container">
    <div class="footer-inner">
      <div><a class="logo" href="${ROOT}index.html">Valora</a>
        <p>Marketplace sederhana untuk menemukan dan memilih produk dengan nyaman.</p></div>
      <div><h3>Navigasi</h3><ul>
        <li><a href="${ROOT}index.html">Home</a></li>
        <li><a href="${ROOT}pages/katalog.html">Katalog</a></li>
        <li><a href="${ROOT}index.html#kategori">Kategori</a></li>
        <li><a href="${ROOT}pages/keranjang.html">Keranjang</a></li></ul></div>
      <div><h3>Kontak</h3><ul>
        <li>halo@valora.example</li><li>Senin–Jumat, 09.00–17.00</li></ul></div>
    </div>
    <p class="copyright">© ${new Date().getFullYear()} Valora. Prototype proyek pembelajaran frontend.</p>
  </div></footer>`;

  const btn = document.getElementById("menuBtn");
  const links = document.getElementById("navLinks");
  btn.addEventListener("click", () => {
    const buka = links.classList.toggle("open");
    btn.setAttribute("aria-expanded", buka);
  });
  updateBadge();
}
