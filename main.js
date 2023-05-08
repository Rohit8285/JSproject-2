const accessKey = "i-DkNNCljICtN2UIUw3C7KZ0oNv6Rd8ZqdaiTcyyBhg";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const SearchResultEl = document.querySelector(".search-results");
const ShowMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    SearchResultEl.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const ImageWrapper = document.createElement("div");
    ImageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    ImageWrapper.appendChild(image);
    ImageWrapper.appendChild(imageLink);
    SearchResultEl.appendChild(ImageWrapper);
  });

  page++;

  if (page > 1) {
    ShowMoreButtonEl.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

ShowMoreButtonEl.addEventListener("click", () => {
  searchImages();
});
