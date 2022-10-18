'use strict';

let myContainer = document.querySelector('section');
let resultBtn = document.querySelector('section + div');
let results = document.querySelector('ul');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let howManyTimesUserHasVoted = 0;
let maxNumberOfVotes = 25;


function OddDuck(name, fileExtension = 'jpg') {
  this.name = name;
  this.fileExtension = fileExtension;
  this.src = `assets/${this.name}.${this.fileExtension}`;
  this.views = 0;
  this.clicks =0;
  allOddDuck.push(this);
}

let allOddDuck = [];
console.log(allOddDuck);

let bag = new OddDuck('bag');
let banana = new OddDuck('banana');
let boots = new OddDuck('boots');
let bathroom = new OddDuck('bathroom');
let breakfast = new OddDuck('breakfast');
let bubblegum = new OddDuck('bubblegum');
let chair = new OddDuck('chair');
let cthulhu = new OddDuck('cthulhu');
let dogduck = new OddDuck('dog-duck');
let dragon = new OddDuck('dog-duck');
let pen = new OddDuck('pen');
let petsweep = new OddDuck('pet-sweep');
let scissors = new OddDuck('scissors');
let shark = new OddDuck('shark');
let sweep = new OddDuck('sweep','png');
let tauntaun = new OddDuck('tauntaun');
let unicorn = new OddDuck('unicorn');
let watercan = new OddDuck('water-can');
let wineglass = new OddDuck('wine-glass');



function selectRandomOddDuck() {
  return Math.floor(Math.random() * allOddDuck.length);
}

function renderOddDuck() {
  let duck1 = selectRandomOddDuck();
  let duck2 = selectRandomOddDuck();
  let duck3 = selectRandomOddDuck();
  console.log(duck1, duck2, duck3);

  while (duck1 === duck2 || duck1 === duck3 || duck2 === duck3) {
    duck3 = selectRandomOddDuck();
    duck2 = selectRandomOddDuck();
  }

  image1.src = allOddDuck[duck1].src;
  image1.alt = allOddDuck[duck1].name;
  allOddDuck[duck1].views++;
  image2.src = allOddDuck[duck2].src;
  image2.alt = allOddDuck[duck2].name;
  allOddDuck[duck2].views++;
  image3.src = allOddDuck[duck3].src;
  image3.alt = allOddDuck[duck3].name;
  allOddDuck[duck3].views++;
}

function renderResults() {
  for (let i = 0; i < allOddDuck.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allOddDuck[i].name} had ${allOddDuck[i].views} views and ${allOddDuck[i].clicks} votes`;
    results.appendChild(li);
  }
}


function handleClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an image');
  }
  howManyTimesUserHasVoted++;
  let clickedOddDuck = event.target.alt;

  for (let i = 0; i < allOddDuck.length; i++) {
    if (clickedOddDuck === allOddDuck[i].name) {
      allOddDuck[i].clicks++;
      break;
    }
  }
  if (howManyTimesUserHasVoted === maxNumberOfVotes) {
    myContainer.removeEventListener('click', handleClick);
    resultBtn.className = 'clicks-allowed';
    resultBtn.addEventListener('click', renderResults);
  } else {
    renderOddDuck();
  }
  console.log(allOddDuck);
}


myContainer.addEventListener('click', handleClick);

renderOddDuck();


