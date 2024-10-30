let key = "d4cc825615d24733ad8abcc136e4f5cb";
let cardData = document.querySelector(".cardData");
let SearchBtn = document.getElementById("searchBtn");
let inputData = document.getElementById("inputData");
let searchType = document.getElementById("type");

const getData = async (input) => {
  try {
    // Fetch data from the API
    let res = await fetch(`https://newsapi.org/v2/everything?q=${input}&apiKey=${key}`);
    
    // Check if the response is okay
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    let jsonData = await res.json();
    console.log(jsonData); // Log the complete response for debugging

    // Check if articles exist in the response
    if (jsonData.articles && jsonData.articles.length > 0) {
      cardData.innerHTML = ""; // Clear previous content
      
      jsonData.articles.forEach((article) => {
        console.log(article); // Log each article for debugging
        
        // Create a card for each article
        let divs = document.createElement("div");
        divs.classList.add("card");
        
        divs.innerHTML = `
          <img src="${article.urlToImage || 'default-image.jpg'}" alt="Article Image">
          <h3>${article.title || 'No Title Available'}</h3>
          <p>${article.description || 'No Description Available'}</p>
        `;
        
        // Open article link on click
        divs.addEventListener("click", () => {
          window.open(article.url);
        });
        
        cardData.appendChild(divs);
      });
      
      searchType.innerHTML = "Search: " + input;
    } else {
      // Handle case where no articles are found
      cardData.innerHTML = "No articles found for this search term.";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    cardData.innerHTML = "An error occurred while fetching data. Please try again later.";
  }
};

// Initial data fetch on page load
window.addEventListener("load", () => {
  getData("india");
});

// Search button click event
SearchBtn.addEventListener("click", () => {
  let inputText = inputData.value;
  getData(inputText);
});

// Navigation click handler
function navClick(navName) {
  // Highlight selected category
  ["politics", "sports", "technology"].forEach((category) => {
    document.getElementById(category).style.color = category === navName ? "rgb(0,140,255)" : "white";
  });

  // Fetch data based on category
  getData(navName);
}
