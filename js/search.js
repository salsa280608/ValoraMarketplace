// Halaman Katalog: pencarian nama + filter kategori yang bekerja bersamaan.
function filterProducts(kataKunci, kategori) {
  const q = kataKunci.trim().toLowerCase();
  return PRODUCTS.filter(p =>
    (kategori === "Semua" || p.kategori === kategori) &&
    p.nama.toLowerCase().includes(q)
  );
}

function initCatalog() {
  const params = new URLSearchParams(location.search);
  let kategori = KATEGORI.includes(params.get("kategori")) ? params.get("kategori") : "Semua";

  const input = document.getElementById("searchInput");
  const chips = document.getElementById("categoryChips");
  const grid = document.getElementById("productGrid");
  const info = document.getElementById("resultInfo");

  input.value = params.get("q") || "";
  chips.innerHTML = ["Semua", ...KATEGORI]
    .map(k => `<button type="button" class="chip" data-kat="${k}">${k}</button>`).join("");

  function render() {
    chips.querySelectorAll(".chip").forEach(c => {
      const aktif = c.dataset.kat === kategori;
      c.classList.toggle("active", aktif);
      c.setAttribute("aria-pressed", aktif);
    });
    const hasil = filterProducts(input.value, kategori);
    info.textContent = `${hasil.length} produk ditemukan`;
    grid.innerHTML = hasil.length
      ? hasil.map(productCard).join("")
      : `<div class="empty"><h3>Produk tidak ditemukan</h3><p>Coba kata kunci lain atau pilih kategori Semua.</p></div>`;
  }

  input.addEventListener("input", render);
  chips.addEventListener("click", e => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    kategori = btn.dataset.kat;
    render();
  });
  document.getElementById("searchForm").addEventListener("submit", e => e.preventDefault());
  render();
}
