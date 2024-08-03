let sayi = 0;
let randomNumber = 0; // Rastgele sayıyı saklayacağımız değişken
let score = 0; // Puanı saklayacağımız değişken
const scores = []; // Kazanılan puanları saklamak için dizi

const divC = document.getElementById("counter");
const btn = document.getElementById("incrementButton");
const btnE = document.getElementById("btnExit");
const btnY = document.getElementById("yenile");
const scoreDiv = document.getElementById("score"); // Puanı gösterecek element
const resultDiv = document.getElementById("result"); // Eşleşme mesajını gösterecek element
const scoreListUl = document.getElementById("scoreListUl"); // Puan listesinin olduğu element

// Rastgele sayı üretmek için fonksiyon
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Yenile butonuna tıklama olayını ekle
btnY.addEventListener("click", () => {
    initialize(); // Sayfayı yenileme yerine yeni rastgele sayı üret
});

function getRandomRange() {
    // %2 şans ile iki aralık arasında seçim yap
    const usePositiveRange = Math.random() < 0.5;

    if (usePositiveRange) {
        return getRandomNumber(0, 100); // 0 ile 100 arasında rastgele sayı üret
    } else {
        return getRandomNumber(-100, -1); // -100 ile -1 arasında rastgele sayı üret
    }
}

// Sayfa yüklendiğinde çalışacak işlev
function initialize() {
    // Rastgele aralık seç ve sayıyı ayarla
    randomNumber = getRandomRange();
    sayi = randomNumber; // Başlangıç sayısını rastgele sayıya eşitle
    divC.textContent = sayi;
    resultDiv.textContent = ''; // Eşleşme mesajını temizle
    loadScores(); // Daha önceki puanları yükle
}

// Sayfa yüklendiğinde initialize fonksiyonunu çağır
window.onload = initialize;

// Arttır butonuna tıklama olayını ekle
btn.addEventListener("click", () => {
    sayi++;
    divC.textContent = sayi;
    checkMatch(); // Her tıklamada eşleşmeyi kontrol et
});

// Azalt butonuna tıklama olayını ekle
btnE.addEventListener("click", () => {
    sayi--;
    divC.textContent = sayi;
    checkMatch(); // Her tıklamada eşleşmeyi kontrol et
});

// Eşleşmeyi kontrol eden fonksiyon
function checkMatch() {
    if (sayi === 0) {
        score += 5; // Puanı 5 artır
        scoreDiv.textContent = `Puan: ${score}`; // Güncellenmiş puanı göster
        alert("Tebrikler, yaptınız! 5 puan kazandınız.");
        scores.push(score); // Puanı listeye ekle
        saveScores(); // Puanları yerel depolamaya kaydet
        updateScoreList(); // Puan listesini güncelle
        initialize(); // Sayfayı yeniden başlat, yeni rastgele sayı ile
    } else {
        resultDiv.textContent = ''; // Eşleşme yoksa mesajı temizle
    }
}

// Puan listesini güncelleyen fonksiyon
function updateScoreList() {
    scoreListUl.innerHTML = ''; // Önceki listeyi temizle
    scores.forEach((score, index) => {
        const li = document.createElement('li');
        li.textContent = `Kullanıcı ${index + 1}: ${score} puan`;
        scoreListUl.appendChild(li);
    });
}

// Puanları yerel depolamadan yükleme
function loadScores() {
    const savedScores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.length = 0; // Eski puanları temizle
    scores.push(...savedScores);
    score = scores.length > 0 ? scores[scores.length - 1] : 0; // Son puanı al
    scoreDiv.textContent = `Puan: ${score}`;
    updateScoreList(); // Puan listesini güncelle
}

// Puanları yerel depolamaya kaydetme
function saveScores() {
    localStorage.setItem('scores', JSON.stringify(scores));
}

// Menü butonuna tıklama olayını ekle
document.getElementById("showScores").addEventListener("click", () => {
    const scoreList = document.getElementById("scoreList");
    scoreList.style.display = scoreList.style.display === 'none' ? 'block' : 'none';
});
