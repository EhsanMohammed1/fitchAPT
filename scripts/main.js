let characterList = [];

let cardSection = document.querySelector(".cards");
let paginationSection = document.querySelector(".pagination");
const aliveCheckbox = document.getElementById("alive-check");
const mainCheckbox = document.getElementById("main-check");

let isMainChecked = mainCheckbox.checked;
let isAliveChecked = aliveCheckbox.checked;
let pageNumber = 1;
let numOfPages = 1;
let searchedName = "";
const shimmerItemNumber = 8;
const MAIN_CHARACTER_STR = "Main character";
const SIDE_CHARACTER_STR = "Side character";
const ALIVE_CHARACTER_STR = "Alive";
const BASE_API_URL = "https://rickandmortyapi.com/api/character/";

setData(fetchData());
generatePaginationElements();

async function fetchData() {
  await new Promise((r) => setTimeout(r, 1000));

  const response = await fetch(
    BASE_API_URL + "?page=" + pageNumber + "&name=" + searchedName
  );
  return await response.json();
}

function setData(data) {
  setShimmers();
  data.then((dataValue) => {
    numOfPages = dataValue.info.pages;
    generatePaginationElements();
    characterList = dataValue.results;
    if (characterList.length > 0) {
      cardSection.innerHTML = "";
    }
    characterList.forEach((character) => {
      character.role =
        character.episode.length >= 25
          ? MAIN_CHARACTER_STR
          : SIDE_CHARACTER_STR;

      if (checkStatusAndRoleCheckBox(character)) {
        setCharacterDataToTheInterface(character);
      }
    });
  });
}

function setCharacterDataToTheInterface(character) {
  cardSection.innerHTML += `
          <article class="profile-card">
            <img src="${character.image}" alt="" class="profile-img" />
            <div class="character-name">${character.name}</div>
            <div class="character-role">${character.role}</div>
            <div class="character-status">${character.status}</div>
          </article>
        `;
}

function setShimmers() {
  cardSection.innerHTML = "";
  for (let index = 0; index < shimmerItemNumber; index++) {
    cardSection.innerHTML += `<article class="profile-card-shimmer">
            <div class="profile-img"></div>
            <div class="character-name"></div>
            <div class="character-role"></div>
            <div class="character-status"></div>
           
          </article>`;
  }
}

function checkStatusAndRoleCheckBox(character) {
  return (
    (character.role == MAIN_CHARACTER_STR || !isMainChecked) &&
    (character.status == ALIVE_CHARACTER_STR || !isAliveChecked)
  );
}

function generatePaginationElements() {
  paginationSection.innerHTML = ` <a onclick="onClickOnPrevius()">&laquo;</a>`;

  for (
    let pageIndex = pageNumber >= 3 ? pageNumber - 2 : 1;
    pageIndex <=
    (pageNumber >= 3
      ? pageNumber < numOfPages - 2
        ? pageNumber + 2
        : numOfPages
      : numOfPages < 5
      ? numOfPages
      : pageNumber + 4);
    pageIndex++
  ) {
    if (pageIndex == pageNumber) {
      paginationSection.innerHTML += `  <a class =active>${pageIndex}</a>`;
    } else {
      paginationSection.innerHTML += `  <a onclick="onClickOnPage(${pageIndex})"  >${pageIndex}</a>`;
    }
  }
  if (pageNumber <= numOfPages - 3 && numOfPages > 5) {
    paginationSection.innerHTML += `  <a onclick="onClickOnLast()">${numOfPages}</a>`;
  }

  paginationSection.innerHTML += ` <a onclick="onClickOnNext() ">&raquo;</a>`;
}

function onClickOnPage(indexPage) {
  pageNumber = indexPage;
  setData(fetchData());
}
function onClickOnNext() {
  if (pageNumber < numOfPages) {
    pageNumber++;
    setData(fetchData());
  }
}
function onClickOnPrevius() {
  if (pageNumber > 1) {
    pageNumber--;
    setData(fetchData());
  }
}
function onClickOnLast() {
  pageNumber = numOfPages;
  setData(fetchData());
}
function onClickOnFisrt() {
  pageNumber = 1;
  setData(fetchData());
}
