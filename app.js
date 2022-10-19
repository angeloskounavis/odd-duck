'use strict';

let myContainer = document.querySelector('section');
let resultBtn = document.querySelector('section + div');
let results = document.querySelector('ul');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let howManyTimesUserHasVoted = 0;
let maxNumberOfVotes = 25;
let indexArray = [];
let allOddDuck = [];


function OddDuck(name, fileExtension = 'jpg', views = 0, clicks = 0) {
  this.name = name;
  this.fileExtension = fileExtension;
  this.src = `assets/${this.name}.${this.fileExtension}`;
  this.views = views;
  this.clicks = clicks;
  allOddDuck.push(this);
}
// console.log(allOddDuck);


function selectRandomOddDuck() {
  return Math.floor(Math.random() * allOddDuck.length);
}

// function renderOddDuck(){

function renderOddDuck() {
  let previousArray = indexArray;
  indexArray = [];
  while (indexArray.length < 3) {
    let ranNum = selectRandomOddDuck();
    if (!indexArray.includes(ranNum) && !previousArray.includes(ranNum)) {
      indexArray.push(ranNum);
    }
  }

  let duck1 = indexArray[0];
  let duck2 = indexArray[1];
  let duck3 = indexArray[2];

  console.log(duck1, duck2, duck3);

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
    renderChart();
    storeOddDuck();
  } else {
    renderOddDuck();
  }
}



//creating a chartjs constructor

function renderChart() {

  let duckNames = [];
  let duckViews = [];
  let duckClicks = [];
  for (let i = 0; i < allOddDuck.length; i++) {
    duckNames.push(allOddDuck[i].name);
    duckViews.push(allOddDuck[i].views);
    duckClicks.push(allOddDuck[i].clicks);
  }

  const data = {
    labels: duckNames,
    datasets: [{

      label: 'Number Of Views',
      data: duckViews,
      backgroundColor: [
        'white'
      ],

    },
    {
      label: 'Number Of Votes',
      data: duckClicks,
      backgroundColor: [
        'yellow'
      ],
      borderWidth: 1
    }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

}

myContainer.addEventListener('click', handleClick);





// new projects



function storeOddDuck() {

  let stringfyDucks = JSON.stringify(allOddDuck);

  localStorage.setItem('oddDuck', stringfyDucks);
}



// this.name = name;
// this.fileExtension = fileExtension;
// this.src = `assets/${this.name}.${this.fileExtension}`;
// this.views = 0;
// this.clicks = 0;

function getOddDucks() {
  // check if local storage has orders. If it does unpack them
  let storedDucks = localStorage.getItem('oddDuck');

  if (storedDucks) {
    let parseOrders = JSON.parse(storedDucks);

    for (let oddDuck of parseOrders) {
      let name = oddDuck.name;
      let fileExtension = oddDuck.fileExtension;
      let views = oddDuck.views;
      let clicks = oddDuck.clicks;
      new OddDuck(name, fileExtension, views, clicks)
    }
  }
  else {
    new OddDuck('bag');
    new OddDuck('banana');
    new OddDuck('boots');
    new OddDuck('bathroom');
    new OddDuck('breakfast');
    new OddDuck('bubblegum');
    new OddDuck('chair');
    new OddDuck('cthulhu');
    new OddDuck('dog-duck');
    new OddDuck('dragon');
    new OddDuck('pen');
    new OddDuck('pet-sweep');
    new OddDuck('scissors');
    new OddDuck('shark');
    new OddDuck('sweep', 'png');
    new OddDuck('tauntaun');
    new OddDuck('unicorn');
    new OddDuck('water-can');
    new OddDuck('wine-glass');

  }
  renderOddDuck();
}
getOddDucks();
