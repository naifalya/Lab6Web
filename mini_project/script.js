//Mini Project: Pendaftaran Workshop

//Ambil elemen 
const form = document.getElementById("formWorkshop");
const wsNama = document.getElementById("wsNama");
const wsEmail = document.getElementById("wsEmail");
const wsSesi = document.getElementById("wsSesi");
const wsCatatan = document.getElementById("wsCatatan");

const errNama = document.getElementById("errNama");
const errEmail = document.getElementById("errEmail");
const errSesi = document.getElementById("errSesi");
const infoSesi = document.getElementById("infoSesi");
const hitungCatatan = document.getElementById("hitungCatatan");
const pesanWorkshop = document.getElementById("pesanWorkshop");

const kartuSukses = document.getElementById("kartuSukses");
const kNama = document.getElementById("kNama");
const kEmail = document.getElementById("kEmail");
const kSesi = document.getElementById("kSesi");

const daftarPeserta = document.getElementById("daftarPeserta");
const jumlahPeserta = document.getElementById("jumlahPeserta");
const kosongPeserta = document.getElementById("kosongPeserta");

const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let jumlah = 0;   // jumlah peserta terdaftar

//Dropdown sesi (change) 
wsSesi.addEventListener("change", function () {
  if (wsSesi.value !== "") {
    infoSesi.textContent = "Sesi dipilih: " + wsSesi.value;
  } else {
    infoSesi.textContent = "";
  }
});

//Penghitung karakter (input) 
wsCatatan.addEventListener("input", function () {
  hitungCatatan.textContent = wsCatatan.value.length;
});

// Tampilkan / hapus pesan error 
function setError(input, elemenError, pesan) {
  elemenError.textContent = pesan;
  if (pesan !== "") {
    input.classList.add("invalid");
  } else {
    input.classList.remove("invalid");
  }
}

// Tampilkan jumlah peserta 
function perbaruiJumlah() {
  jumlahPeserta.textContent = jumlah;
  kosongPeserta.hidden = jumlah > 0;
}

// Tambah peserta ke daftar 
function tambahPeserta(nama, email, sesi, opsi) {
  const item = document.createElement("li");
  const info = document.createElement("div");
  const teksNama = document.createElement("strong");
  const detail = document.createElement("div");
  const hapus = document.createElement("button");

  teksNama.textContent = nama;
  detail.className = "detail";
  detail.textContent = email + " - " + sesi;
  info.append(teksNama, detail);

  hapus.type = "button";
  hapus.className = "btn-hapus";
  hapus.textContent = "Hapus";
  hapus.addEventListener("click", function () {
    item.remove();
    jumlah = jumlah - 1;
    opsi.disabled = false;        // kursi sesi itu tersedia lagi
    opsi.textContent = sesi;
    perbaruiJumlah();
    kartuSukses.hidden = true;
  });

  item.append(info, hapus);
  daftarPeserta.appendChild(item);
  jumlah = jumlah + 1;
  perbaruiJumlah();
}

// Submit (validasi) 
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = wsNama.value.trim();
  const email = wsEmail.value.trim();
  const sesi = wsSesi.value;
  let valid = true;

  if (nama.length < 3) {
    setError(wsNama, errNama, "Nama wajib diisi, minimal 3 karakter.");
    valid = false;
  } else {
    setError(wsNama, errNama, "");
  }

  if (!polaEmail.test(email)) {
    setError(wsEmail, errEmail, "Masukkan email yang valid.");
    valid = false;
  } else {
    setError(wsEmail, errEmail, "");
  }

  if (sesi === "") {
    setError(wsSesi, errSesi, "Pilih salah satu sesi.");
    valid = false;
  } else {
    setError(wsSesi, errSesi, "");
  }

  pesanWorkshop.className = "";

  if (valid === false) {
    kartuSukses.hidden = true;
    pesanWorkshop.textContent = "Pendaftaran gagal. Periksa kembali isian Anda.";
    pesanWorkshop.classList.add("gagal");
  } else {
    kNama.textContent = nama;
    kEmail.textContent = email;
    kSesi.textContent = sesi;
    kartuSukses.hidden = false;

    pesanWorkshop.textContent = "Terima kasih, " + nama + "! Anda terdaftar di sesi " + sesi + ".";
    pesanWorkshop.classList.add("sukses");

    // Kuota 1 kursi: sesi yang diambil ditandai penuh dan tidak bisa dipilih lagi
    const opsi = wsSesi.options[wsSesi.selectedIndex];
    tambahPeserta(nama, email, sesi, opsi);
    opsi.disabled = true;
    opsi.textContent = sesi + " - penuh";

    form.reset();
    infoSesi.textContent = "";
    hitungCatatan.textContent = "0";
  }
});

perbaruiJumlah();