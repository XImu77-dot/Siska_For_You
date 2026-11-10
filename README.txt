SISKA MUSIC PLAYER — CARA MENJALANKAN

1. Extract ZIP ini.
2. Masukkan file audio yang kamu punya dan boleh digunakan ke folder ini.
3. Ubah nama file audio menjadi: Siska.mp3
4. Buka folder ini di Visual Studio Code.
5. Buka terminal VS Code (Terminal > New Terminal).
6. Jalankan:
       python server.py
   Jika perintah itu tidak bekerja di Windows, coba:
       py server.py
7. Buka http://localhost:8000 di browser jika belum terbuka otomatis.

SINKRONISASI LIRIK
- Buka script.js.
- Cari bagian const LYRICS.
- Ganti teks contoh dengan lirik yang kamu punya/berhak gunakan.
- Angka time adalah waktu mulai baris dalam detik.
  Contoh: 65 berarti baris mulai pada 1 menit 5 detik.
- Tambahkan baris dengan format yang sama. Urutkan dari waktu paling kecil.

CATATAN
- File audio tidak disertakan. Browser memutar file Siska.mp3 dari folder ini.
- Jangan mengambil atau membagikan audio/lirik berhak cipta tanpa izin.
- Kalau audio tidak terdengar, pastikan nama file tepat Siska.mp3 dan file berada satu folder dengan index.html.
