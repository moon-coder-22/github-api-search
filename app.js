const mainEl = document.querySelector(".main");

const gitHubURL = "https://api.github.com/users/";

const formEl = document.createElement("form");
formEl.classList.add("search");
formEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputValue = Object.fromEntries(new FormData(e.target));

  const response = await fetch(gitHubURL + inputValue.name);
  let profile;

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    // searchButtonEl.disabled = true;
    // inputEl.disabled;
    // searchButtonEl.classList.add('disabled')
    if (mainEl.children.length == 3) {
      mainEl.removeChild(mainEl.children[2]);
    }
    profile = creatProfileEl(data);
    mainEl.appendChild(profile);
    createDeletBtnEl(profile, profile);
  } else {
    alert("User not found");
  }
});

const inputEl = document.createElement("input");
inputEl.classList.add("search-input");
inputEl.setAttribute("name", "name");

const searchButtonEl = document.createElement("button");
searchButtonEl.innerText = "Search";
searchButtonEl.classList.add("search-button");
searchButtonEl.setAttribute("type", "submit");

formEl.appendChild(inputEl);
formEl.appendChild(searchButtonEl);
mainEl.appendChild(formEl);

function creatProfileEl(data) {
  const element = document.createElement("div");
  element.classList.add("profile");
  /*html*/
  element.innerHTML = `
  <img src="${data.avatar_url}" alt="" class="search-image">
  <p class="search-text"><span>Name: </span>${data.login}</p>
  <p class="search-text"><span>City: </span>${data.location != null ? data.location : ''}</p>
  <p class="search-text"><span>About: </span>${data.bio != null ? data.bio : ''}</p>
  `;

  return element;
}

function createDeletBtnEl(node, cardEll) {
  const btn = document.createElement('button');
  btn.innerText = 'Delete';
  btn.classList.add('delete-button');
  cardEll.appendChild(btn);
  btn.addEventListener('click', () => {
    node.remove();
    btn.remove();
  })
 }
