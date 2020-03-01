import "../styles/index.scss";

//recoger datos del DOM

let defaultImage =
  "http://via.placeholder.com/129x194/01D277/ffffff/?text=MOVIE";

const inputElement = document.querySelector(".main__form__input");

const btn = document.querySelector(".main__form__input__btn");

const movieList = document.querySelector(".main__container");

//valores iniciales

const API_KEY = "bb6f51bef07465653c3e553d6ab161a8";

const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

//pinto una película

function paintMovie(movie) {
  const box = document.createElement("div");
  box.classList.add("main__container__box");

  const image = document.createElement("img");
  image.classList.add("main__container__box__poster");
  image.src =
    movie.poster_path === null ? defaultImage : IMAGE_URL + movie.poster_path;
  image.alt = movie.title;

  const containerText = document.createElement("div");
  containerText.classList.add("main__container__box__text");

  const title = document.createElement("h2");
  title.classList.add("main__container__box__text__title");
  title.innerHTML = movie.title;

  const date = document.createElement("p");
  date.classList.add("main__container__box__text__date");
  date.innerHTML =
    movie.release_date === undefined
      ? "Fecha no disponible"
      : movie.release_date;

  const description = document.createElement("p");
  description.classList.add("main__container__box__text__description");
  description.innerHTML =
    movie.overview === "" ? "Información no disponible" : movie.overview;

  const link = document.createElement("p");
  link.classList.add("main__container__box__text__link");
  link.innerHTML = "Read More";

  link.addEventListener("click", handlerLink);

  containerText.appendChild(title);
  containerText.appendChild(date);
  containerText.appendChild(description);
  containerText.appendChild(link);

  box.appendChild(image);
  box.appendChild(containerText);

  movieList.appendChild(box);
}

function deleteMovies() {
  movieList.innerHTML = "";
}

function paintAllMovies(moviesArray) {
  deleteMovies();
  for (let i = 0; i < moviesArray.length; i++) {
    paintMovie(moviesArray[i]);
  }
}

//función manejadora

function handlerBtn(ev) {
  ev.preventDefault();
  const value = inputElement.value;

  const newUrl = url + "&query=" + value;
  console.log(newUrl);

  fetch(newUrl)
    .then(res => res.json())
    .then(data => {
      console.log("Data:", data);
      paintAllMovies(data.results);
    })
    .catch(error => {
      console.log("Error", error);
    });
  console.log("Value", value);
}

btn.addEventListener("click", handlerBtn);

function handlerLink(ev) {
  console.log(ev);
}
