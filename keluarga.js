// keluarga.js
const hargaTetap = SETTING.harga || 0;
const berasTetap = SETTING.beras || 0;
const jagungTetap = SETTING.jagung || 0;
const infaqValue = SETTING.infaqValue || 15000;

function hitungTotal() {
    const jUang   = document.querySelectorAll(".uang:checked").length;
    const jBeras  = document.querySelectorAll(".beras:checked").length;
    const jJagung = document.querySelectorAll(".jagung:checked").length;
    const infaqChecked = document.getElementById("infaq") && document.getElementById("infaq").checked;
    const infaq = infaqChecked ? infaqValue : 0;

    const totalUang   = (jUang * hargaTetap) + infaq;
    const totalBeras  = (jBeras * berasTetap);
    const totalJagung = (jJagung * jagungTetap);

    document.getElementById("totalUang").innerText   = `Total Uang: Rp ${totalUang}`;
    document.getElementById("totalBeras").innerText  = `Total Beras: ${totalBeras} kg`;
    document.getElementById("totalJagung").innerText = `Total Jagung: ${totalJagung} kg`;
    document.getElementById("totalInfaq").innerText = `Total Infaq: Rp ${infaq}`;

    const uangMasuk = parseFloat(document.getElementById("uangDiterima").value || 0);
    const kembali = uangMasuk - totalUang;
    document.getElementById("kembalian").value = (!isNaN(kembali) && kembali >= 0) ? `Rp ${kembali}` : "Belum cukup";
}

function toggleSemua(selector, aktif) {
    document.querySelectorAll(selector).forEach(cb => {
        cb.checked = aktif;
        const tr = cb.closest("tr");
        if (!tr) return;
        if (aktif && selector === ".uang") {
            tr.querySelector(".beras") && (tr.querySelector(".beras").checked = false);
            tr.querySelector(".jagung") && (tr.querySelector(".jagung").checked = false);
        }
        if (aktif && selector === ".beras") {
            tr.querySelector(".uang") && (tr.querySelector(".uang").checked = false);
            tr.querySelector(".jagung") && (tr.querySelector(".jagung").checked = false);
        }
        if (aktif && selector === ".jagung") {
            tr.querySelector(".uang") && (tr.querySelector(".uang").checked = false);
            tr.querySelector(".beras") && (tr.querySelector(".beras").checked = false);
        }
    });
    hitungTotal();
}

document.addEventListener("DOMContentLoaded", () => {
    // checkbox all
    document.getElementById("checkAllUang").addEventListener("change", e => toggleSemua(".uang", e.target.checked));
    document.getElementById("checkAllBeras").addEventListener("change", e => toggleSemua(".beras", e.target.checked));
    document.getElementById("checkAllJagung").addEventListener("change", e => toggleSemua(".jagung", e.target.checked));

    // events change
    document.addEventListener("change", e => {
        if (e.target.matches(".uang, .beras, .jagung, #infaq")) hitungTotal();
    });

    document.getElementById("uangDiterima").addEventListener("input", hitungTotal);

    // tambah baris
    document.getElementById("tambah").addEventListener("click", () => {
        const tbody = document.querySelector("#tabelKeluarga tbody");
        const idx = tbody.children.length;
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><input type="text" name="nama[]" value=""></td>
            <td>
                <label><input type="radio" name="jk[${idx}]" value="L">L</label>
                <label><input type="radio" name="jk[${idx}]" value="P">P</label>
            </td>
            <td><input type="checkbox" class="uang" name="uang[${idx}]"></td>
            <td><input type="checkbox" class="beras" name="beras[${idx}]"></td>
            <td><input type="checkbox" class="jagung" name="jagung[${idx}]"></td>
        `;
        tbody.appendChild(tr);
    });

    // initial hitung
    hitungTotal();
});
