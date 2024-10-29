let key = "d4cc825615d24733ad8abcc136e4f5cb";
let cardData = document.querySelector(".cardData");
let SearchBtn = document.getElementById("searchBtn");
let inputData = document.getElementById("inputData");
let searchType = document.getElementById("type");

const getData = async (input) => {
  try {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${input}&apiKey=${key}`);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    const jsonData = await res.json();

    if (!jsonData || !jsonData.articles || jsonData.articles.length === 0) {
      cardData.innerHTML = "No articles found.";
      return;
    }

    cardData.innerHTML = "";
    jsonData.articles.forEach(article => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <img src="${article.urlToImage}" alt="">
        <h3>${article.title}</h3>
        <p>${article.description}</p>
      `;
      div.addEventListener("click", () => {
        window.open(article.url);
      });
      cardData.appendChild(div);
    });

    searchType.innerHTML = "Search: " + input;
  } catch (error) {
    console.error("Error fetching data:", error);
    cardData.innerHTML = "An error occurred while fetching data.";
  }
};

window.addEventListener("load", function() {
  getData("Cricket");
});

SearchBtn.addEventListener("click", function() {
  const inputText = inputData.value;
  getData(inputText);
});

function navClick(navName) {
  if (navName === "politics") {
    document.getElementById("politics").style.color = "rgb(0,140,255)";
    document.getElementById("sports").style.color = "white";
    document.getElementById("technology").style.color = "white";
  } else if (navName === "sports") {
    document.getElementById("politics").style.color = "white";
    document.getElementById("sports").style.color = "rgb(0,140,255)";
    document.getElementById("technology").style.color = "white";
  } else if (navName === "technology") {
    document.getElementById("politics").style.color = "white";
    document.getElementById("sports").style.color = "white";
    document.getElementById("technology").style.color = "rgb(0,140,255)";
  }
  getData(navName);
}
