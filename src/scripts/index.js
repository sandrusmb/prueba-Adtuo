import "../styles/index.scss";
/* import "./data.js"; */

//recoger datos del DOM

let moviesArray = [];

const inputElement = document.querySelector(".main__form__input");

const btn = document.querySelector(".main__form__input__btn");

const movieList = document.querySelector(".main__container");

//valores iniciales

const API_KEY = "bb6f51bef07465653c3e553d6ab161a8";

const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

//fetch

//función manejadora

function handlerClick(ev) {
  ev.preventDefault();
  const value = inputElement.value;
  const newUrl = url + "&query=" + value;
  fetch(newUrl)
    .then(res => res.json())
    .then(data => {
      console.log("Data:", data);
      paintMovie(data.results[0]);
    })
    .catch(error => {
      console.log("Error", error);
    });
  console.log("Value", value);
}

btn.addEventListener("click", handlerClick);

//función para pintar una película

function paintMovie(movie) {
  const box = document.createElement("div");
  box.classList.add("main__container__box");

  const image = document.createElement("img");
  image.classList.add("main__container__box__poster");
  image.src = IMAGE_URL + movie.poster_path;
  image.alt = movie.title;

  const containerText = document.createElement("div");
  containerText.classList.add("main__container__box__text");

  const title = document.createElement("h2");
  title.classList.add("main__container__box__text__title");
  title.innerHTML = movie.title;

  const date = document.createElement("p");
  date.classList.add("main__container__box__text__date");
  date.innerHTML = movie.release_date;

  const description = document.createElement("p");
  description.classList.add("main__container__box__text__description");
  description.innerHTML = movie.overview;

  const link = document.createElement("p");
  link.classList.add("main__container__box__text__link");
  link.innerHTML = "Read More";

  containerText.appendChild(title);
  containerText.appendChild(date);
  containerText.appendChild(description);
  containerText.appendChild(link);

  box.appendChild(image);
  box.appendChild(containerText);

  movieList.appendChild(box);
}

function deleteAllMovies() {
  movieList.innerHTML = "";
}

function paintAllMovies(moviesArray) {
  deleteAllMovies();
  for (i = 0; i < moviesArray.length; i++) {
    paintMovie(moviesArray[i]);
  }
}
