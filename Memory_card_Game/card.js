const cardsData = [
    { id: 1, image: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" },
    { id: 2, image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Javascript-shield.png" },
    { id: 3, image: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg" },
    { id: 4, image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Javascript-shield.png" },
    { id: 5, image: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" },
    { id: 6, image: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" },
    { id: 7, image: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg" },
    { id: 8, image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
    { id: 9, image: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" },
    { id: 10, image: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" },
    { id: 11, image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
    { id: 12, image: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" },
  ];
  
  const cardsContainer = document.getElementById("cards-container");
  const movesCounter = document.querySelector(".move-counter");
  const restartBtn = document.getElementById("restart");
  
  let toggledCards = [];
  let matchedCardIds = [];
  let moveCount = 0;
  
  function shuffleCards(array) {
    return array.sort(() => 0.5 - Math.random());
  }
  
  function renderCards() {
    const shuffled = shuffleCards([...cardsData]);
    cardsContainer.innerHTML = "";
    shuffled.forEach(({ id, image }) => {
      const card = document.createElement("div");
      card.classList.add("card", "item");
      card.innerHTML = `
        <img src="https://cdn-icons-png.flaticon.com/512/565/565547.png" class="outline-image" />
        <img src="${image}" class="card-image" data-id="${id}" />
      `;
      cardsContainer.appendChild(card);
  
      card.addEventListener("click", () => handleCardClick(card, id));
    });
  }
  
  function handleCardClick(card, id) {
    if (
      card.classList.contains("toggled") ||
      matchedCardIds.includes(id) ||
      toggledCards.length === 2
    )
      return;
  
    card.classList.add("toggled");
    toggledCards.push({ card, id });
  
    if (toggledCards.length === 2) {
      moveCount++;
      movesCounter.innerText = `Moves: ${moveCount}`;
      const [first, second] = toggledCards;
      if (first.id === second.id && first.card !== second.card) {
        matchedCardIds.push(first.id);
        toggledCards = [];
      } else {
        setTimeout(() => {
          first.card.classList.remove("toggled");
          second.card.classList.remove("toggled");
          toggledCards = [];
        }, 1000);
      }
    }
  }
  
  restartBtn.addEventListener("click", () => {
    toggledCards = [];
    matchedCardIds = [];
    moveCount = 0;
    movesCounter.innerText = "Moves: 0";
    renderCards();
  });
  
  renderCards();
  