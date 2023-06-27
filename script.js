////////////////////General code////////////////////////////////
////////////////////////////////////////////////////////////////////
import {petsList} from './pets_data.js';

const menuMobile = document.querySelector('.menu');
const navMenu = document.querySelector('.nav');

const aaa = document.querySelector('.slider_pets');
const popUp = document.getElementById('pop_up');
const popUpContent = document.querySelector('.pop_up_content');
const closePopUp = document.getElementById('close_pop_up');

console.log(popUp)

if (aaa) {
    aaa.addEventListener('click', function () {
        // creatHtmlPopUp();
        popUp.classList.toggle('active_popUp');
        document.body.classList.toggle('lock');

    });
}

if (menuMobile) {
    menuMobile.addEventListener('click', function () {
        document.body.classList.toggle('lock');
        menuMobile.classList.toggle('active_menu');
        navMenu.classList.toggle('active');
    });
}


if (closePopUp) {
    closePopUp.addEventListener('click', function () {
        popUp.classList.remove('active_popUp');
    });
}

/*меняем класс при клике на ссылку в меню*/
const links = document.querySelectorAll('nav a');
links.forEach((link) => {
    link.addEventListener('click', closeMenu);
});

// 

let initSliderIndexes = [];
initLoadSlider();
//THE END


////////////////////Common Functions////////////////////////////////
////////////////////////////////////////////////////////////////////
function initLoadSlider() {
    const initSliderIndexesFor3 = generateListOfRandomNumbers(3, []);
    const initSliderIndexesFor2 = generateListOfRandomNumbers(2, [])
    const initSliderIndexesFor1 = generateListOfRandomNumbers(1, []);

    let screenSize = document.documentElement.clientWidth;
    console.log(screenSize)
    let initSliderIndexes = [];
    if (screenSize > 768) {
        initSliderIndexes = initSliderIndexesFor3;
    } else if (screenSize > 320) {
        initSliderIndexes = initSliderIndexesFor2;
    } else {
        initSliderIndexes = initSliderIndexesFor1;
    }
    createHtmlSlider(initSliderIndexes)
}

const sliderLeftBtn = document.getElementById('slide_left_big_page');
sliderLeftBtn.addEventListener('click', () => createRandomPicturesByResolution());

const sliderRightBtn = document.getElementById('slide_right_big_page');
sliderRightBtn.addEventListener('click', () => createRandomPicturesByResolution());

window.addEventListener('resize', () => createRandomPicturesByResolution());

const closeButton = document.getElementById('close_pop_up');
closeButton.addEventListener('click', closeButtonPopUp);
// create random pictures for slider
function createRandomPicturesByResolution() {
    let newListIndexes = [];
    console.log('screenSize')
    const screenSize = document.documentElement.clientWidth;
    console.log(screenSize)

    if (screenSize > 768) {
        newListIndexes = generateListOfRandomNumbers(3, initSliderIndexes)
    } else if (screenSize > 320) {
        newListIndexes = generateListOfRandomNumbers(2, initSliderIndexes)
    } else {
        newListIndexes = generateListOfRandomNumbers(1, initSliderIndexes)
    }
    initSliderIndexes = newListIndexes;
    createHtmlSlider(newListIndexes)
}

// create slider with random pictures
function createHtmlSlider(initSliderIndexes) {
    const filteredList = petsList.filter((pet, index) => initSliderIndexes.includes(index));

    let petSliderList = document.getElementById("myList");
    document.getElementById("myList").innerHTML = "";
    filteredList.forEach((pet, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<div class="slider_pets" id="${pet.name}">
                                <img src="${pet.img}" alt="${pet.name}">
                               <p>${pet.name}</p>
                               <button class="btn">Learn more</button>
                        </div>`;
        li.addEventListener('click', () => creatHtmlPopUp(pet.id));
        petSliderList.appendChild(li);
    });
}

function creatHtmlPopUp(petIndex) {
    popUp.classList.toggle('active_popUp');
    document.body.classList.toggle('lock');

    const pet = petsList.find((pet) => pet.id === petIndex);
    popUp.innerHTML = `
        <div class="pop_up_content">
            <div class="pop_up_content_img">
                <img src="${pet.img}" alt="${pet.name}">
            </div>
            <div class="pop_up_content_text">
                <h6>${pet.name}</h6>
                <p id="type">${pet.type} - ${pet.breed}</p>
                <p>${pet.description}</p>
                <ul>
                    <li><b>Age: </b>${pet.age}</li>
                    <li><b>Inoculations: </b>${pet.inoculations}</li>
                    <li><b>Diseases: </b>${pet.diseases}</li>
                    <li><b>Parasites: </b>${pet.parasites}</li>
                </ul>
            </div>
        </div>
        <button class="btn" id="close_pop_up">&#x2715</button>
    `;
}

function generateListOfRandomNumbers(numOfNumbers, previousList) {
    let numbers = [];
    while (numbers.length < numOfNumbers) {
        let randNum = Math.floor(Math.random() * 8);
        if (!numbers.includes(randNum) && !previousList.includes(randNum)) {
            numbers.push(randNum);
        }
    }
    return numbers;
}
function closeButtonPopUp() {
    popUp.classList.remove('active_popUp');
    document.body.classList.remove('lock');
}

function closeMenu() {
    document.body.classList.remove('lock');
    menuMobile.classList.remove('active_menu');
    navMenu.classList.remove('active');
}