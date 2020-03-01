import "../styles/index.scss";
import "./data.js";

//función que cuando escriba algo en el input y lo envie con el botón lo pinte en un p

const inputElement = document.querySelector(".main__form__input");

const btn = document.querySelector(".main__form__input__btn");

const div = document.querySelector(".main__container");

function handlerClick(ev) {
  ev.preventDefault();
  const value = inputElement.value;
  const newUrl = url + "&query=" + value;

  fetch(newUrl)
    .then(res => res.json())
    .then(data => {
      console.log("Data:", data);
    })
    .catch(error => {
      console.log("Error", error);
    });
  console.log("Value", value);
}

btn.addEventListener("click", handlerClick);

//initial value

const API_KEY = "bb6f51bef07465653c3e553d6ab161a8";

const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=furious`;
