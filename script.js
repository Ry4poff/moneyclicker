let coinCount = 0;
let autoClickerCount = 0;
let autoClickerPrice = 50;
let autoClickerInterval;

const coinImage = document.getElementById('coinImage');
const coinCountDisplay = document.getElementById('coinCount');
const autoClickerDisplay = document.getElementById('autoClickerCount');
const buyAutoClickerButton = document.getElementById('buyAutoClicker');

// Récupérer la progression sauvegardée dans le localStorage
if (localStorage.getItem('coinCount')) {
  coinCount = parseInt(localStorage.getItem('coinCount'));
  autoClickerCount = parseInt(localStorage.getItem('autoClickerCount'));
}

// Mettre à jour l'affichage initial
updateDisplay();

// Fonction pour gérer le clic sur l'image de la pièce
coinImage.addEventListener('click', () => {
  coinCount++;
  updateDisplay();
  saveProgress();
  animateCoinClick();
});

// Fonction pour acheter le générateur automatique
buyAutoClickerButton.addEventListener('click', () => {
  if (coinCount >= autoClickerPrice) {
    coinCount -= autoClickerPrice;
    autoClickerCount++;
    autoClickerPrice = Math.floor(autoClickerPrice * 1.5);  // Augmenter le prix à chaque achat
    updateDisplay();
    saveProgress();
  }
});

// Fonction pour démarrer le générateur automatique
function startAutoClicker() {
  if (autoClickerInterval) clearInterval(autoClickerInterval);
  autoClickerInterval = setInterval(() => {
    coinCount += autoClickerCount;
    updateDisplay();
    saveProgress();
  }, 1000);
}

// Fonction de mise à jour de l'affichage
function updateDisplay() {
  coinCountDisplay.textContent = `Vous avez ${coinCount} pièces`;
  autoClickerDisplay.textContent = `Générateur automatique : ${autoClickerCount} pièces / sec`;
  buyAutoClickerButton.textContent = `Acheter Générateur automatique (${autoClickerPrice} pièces)`;
  
  // Désactiver le bouton d'achat si on ne peut pas se le permettre
  if (coinCount < autoClickerPrice) {
    buyAutoClickerButton.disabled = true;
  } else {
    buyAutoClickerButton.disabled = false;
  }

  // Démarrer le générateur automatique si nécessaire
  if (autoClickerCount > 0 && !autoClickerInterval) {
    startAutoClicker();
  }
}

// Fonction pour sauvegarder la progression
function saveProgress() {
  localStorage.setItem('coinCount', coinCount);
  localStorage.setItem('autoClickerCount', autoClickerCount);
}

// Animation de clic sur l'image de la pièce
function animateCoinClick() {
  coinImage.classList.add('click-animation');
  setTimeout(() => {
    coinImage.classList.remove('click-animation');
  }, 100);
}
