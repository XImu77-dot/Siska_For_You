const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const seek = document.getElementById("seek");
const volume = document.getElementById("volume");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const lyricContainer = document.getElementById("lyric-lines");

// Sinkronisasi lirik sesuai tempo lagu Siska.mp3
const LYRICS = [
  { time: 16, text: 'Apa kabar Siska?' },
  { time: 20, text: 'Lama tak jumpa' },
  { time: 22, text: 'Rasanya hampir dua purnama' },
  { time: 26, text: 'Rindu di dada tak siapa yang tahu' },
  { time: 32, text: 'Siska jauh di sana, jauh di mata' },
  { time: 38, text: 'Namun di hati sentiasa ada' },
  { time: 43, text: 'Menemani dikala gundah gulana' },
  { time: 48, text: 'Siska kanda pergi hanya seketika cuma' },
  { time: 56, text: 'Inikan semua demi masa depan kita' },
  { time: 64, text: 'Siska jangan marah-marah (Siska jangan marah)' },
  { time: 68, text: 'Takut nanti lekas tua (nanti lekas tua)' },
  { time: 72, text: 'Kanda setia orangnya' },
  { time: 76, text: 'Takkan pernah mendua' },
  { time: 80, text: 'Dari jutaan bintang (dari jutaan bintang)' },
  { time: 85, text: 'Siska paling gemerlapan (Siska paling gemerlapan)' },
  { time: 89, text: 'Dari segenap wanita' },
  { time: 92, text: 'Siskalah yang paling menawan' },
  { time: 118, text: 'Siska kanda pergi hanya seketika cuma' },
  { time: 126, text: 'Inikan semua demi masa depan kita' },
  { time: 134, text: 'Siska jangan marah-marah (Siska jangan marah)' },
  { time: 139, text: 'Takut nanti lekas tua (nanti lekas tua)' },
  { time: 143, text: 'Kanda setia orangnya' },
  { time: 147, text: 'Takkan pernah mendua' },
  { time: 150, text: 'Dari jutaan bintang (dari jutaan bintang)' },
  { time: 155, text: 'Siska paling gemerlapan (Siska paling gemerlapan)' },
  { time: 159, text: 'Dari segenap wanita' },
  { time: 163, text: 'Siskalah yang paling menawan' },
  { time: 170, text: 'Siska jangan marah' },
  { time: 186, text: 'Takut nanti lekas tua' },
  { time: 188, text: 'Dari jutaan bintang' },
  { time: 190, text: 'Siska paling gemerlapan.' }
];

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}
let currentLyricIndex = -1;
// Semua baris dibuat sekali, lalu track digeser agar baris aktif selalu di tengah
const lyricTrack = document.createElement("div");
lyricTrack.className = "lyric-track";
lyricContainer.innerHTML = "";
lyricContainer.appendChild(lyricTrack);
const lyricEls = LYRICS.map((line) => {
  const p = document.createElement("p");
  p.textContent = line.text;
  p.addEventListener("click", () => { audio.currentTime = line.time + 0.01; });
  lyricTrack.appendChild(p);
  return p;
});

function renderLyrics(activeIndex) {
  lyricEls.forEach((p, i) => p.classList.toggle("active", i === activeIndex));
  const target = lyricEls[Math.max(activeIndex, 0)];
  const offset = lyricContainer.clientHeight / 2 - (target.offsetTop + target.offsetHeight / 2);
  lyricTrack.style.transform = `translateY(${offset}px)`;
}
window.addEventListener("resize", () => renderLyrics(currentLyricIndex));
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => renderLyrics(currentLyricIndex));
function updateLyrics() {
  let index = -1;
  for (let i = 0; i < LYRICS.length; i++) {
    if (audio.currentTime >= LYRICS[i].time) index = i;
  }
  if (index !== currentLyricIndex) {
    currentLyricIndex = index;
    renderLyrics(index);
  }
}
playButton.addEventListener("click", async () => {
  if (audio.paused) {
    try { await audio.play(); }
    catch { alert("Audio belum ditemukan. Pastikan file bernama Siska.mp3 ada di folder yang sama."); }
  } else audio.pause();
});
audio.addEventListener("play", () => playButton.textContent = "Ⅱ");
audio.addEventListener("pause", () => playButton.textContent = "▶");
audio.addEventListener("loadedmetadata", () => duration.textContent = formatTime(audio.duration));
audio.addEventListener("timeupdate", () => {
  current.textContent = formatTime(audio.currentTime);
  if (Number.isFinite(audio.duration) && audio.duration > 0) seek.value = (audio.currentTime / audio.duration) * 100;
  updateLyrics();
});
seek.addEventListener("input", () => {
  if (Number.isFinite(audio.duration)) audio.currentTime = (seek.value / 100) * audio.duration;
});
volume.addEventListener("input", () => audio.volume = Number(volume.value));
document.getElementById("back").addEventListener("click", () => audio.currentTime = Math.max(0, audio.currentTime - 10));
document.getElementById("forward").addEventListener("click", () => {
  if (Number.isFinite(audio.duration)) audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
});
audio.volume = 0.8;
renderLyrics(-1);

// Pengaturan Mode Warna Pink (Soft Pink / Dark Velvet Pink)
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  const savedTheme = localStorage.getItem("siska-player-theme");
  if (savedTheme === "dark-pink") {
    document.body.setAttribute("data-theme", "dark-pink");
    themeToggle.textContent = "🌸";
    themeToggle.title = "Ganti ke Soft Pink";
  }

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.getAttribute("data-theme") === "dark-pink";
    if (isDark) {
      document.body.removeAttribute("data-theme");
      themeToggle.textContent = "💖";
      themeToggle.title = "Ganti ke Dark Pink";
      localStorage.setItem("siska-player-theme", "soft-pink");
    } else {
      document.body.setAttribute("data-theme", "dark-pink");
      themeToggle.textContent = "🌸";
      themeToggle.title = "Ganti ke Soft Pink";
      localStorage.setItem("siska-player-theme", "dark-pink");
    }
  });
}
