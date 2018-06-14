// Memory Game Project[from scratch js]
// Thanks for googal and udacity
const   parent = document.getElementById('deck'),
         reset = document.querySelector('.fa-redo'),
         cards = document.getElementsByClassName('card'),
        rating = document.querySelector('.stars'),
        modual = document.querySelector('.modual-container'),
  timerElement = document.getElementById('timer'),
  movesElement = document.getElementById('moves'),
    movesScore = document.getElementById('moves-score'),
     timeScore = document.getElementById('time-score'),
     rateScore = document.getElementById('rate-score'),
     playAgain = document.getElementById('play-again'),
      cardsLen = cards.length;
let  lastCards = [],
       counter = 0,
     _1stClick = 0,
  cardsMatched = 0,
         start = null,
         stars = 3,
         moves = 0;
 
//  start randomizing function
function randomiz(){  
    for(let i = 0 ;i<cardsLen;i++){
        parent.appendChild(cards[Math.floor(Math.random() * 16)])
    }

    var arr = Array.from(cards); // convert array-like to an Array
    arr.forEach(e => e.classList="card"); //reset all cards
    lastCards = []; // reset open cards array
    if(_1stClick > 0){
        // if player wanna play again reset this values
        // note some counter and variables will be reset by >> timer(true) 
        timer(true)   
        rating.lastElementChild.style.color ="gold";
        rating.lastElementChild.previousElementSibling.style.color ="gold";
        movesElement.innerText = 0;
    } 
}

randomiz();//reset and random on load
reset.parentElement.addEventListener('click',()=>randomiz()) //rest button



// lisen to click on cards >then> check to match >then> check if all matches
parent.addEventListener('click',function(e){ 
    
    if(e.target.firstElementChild === null ||  e.target.classList[1] === 'match'){
     // if opened or matched >> skip it :)
    }else if(e.target.classList[0] === 'card'){
        let clickedElement = e.target.firstElementChild.classList[1];

        if(lastCards.length === 0){

            _1stClick++; // add click to run timer function
            if( _1stClick === 1 ){ timer(); } //run Timer() when user start click

            //add element to match later [first Card]
            e.target.classList.add("open","show");
            lastCards.push(clickedElement);
                moves++
            }else{          
            // check the [thecound Card]
                var arrCard = parent.getElementsByClassName(lastCards[0]);
                if(lastCards[0] === clickedElement && e.target.classList[1] != 'open'){
                    moves++
                    // if 2 cards matched add match
                    arrCard[0].parentElement.classList = "card match";
                    arrCard[1].parentElement.classList = "card match";
                    lastCards = [];
                    // stop timer when last card matched
                    cardsMatched++
                    if(cardsMatched === 8){
                        clearInterval(start)
                        timeScore.innerText  = humanReadable(counter);
                        rateScore.innerText  = stars;
                        modual.style.display='block'
                    }

                    }else if(e.target.classList[1] != 'open'){
                        moves++
                        // if 2 cards Not matched wait and reset
                        e.target.classList.add("open","show")
                        setTimeout(_=>{
                            arrCard[1].parentElement.classList = "card";
                            arrCard[0].parentElement.classList = "card";
                            e.target.classList = "card";
                        },350)
                        lastCards = [];

                    }
        }
    }

           
})

// run timer on 1st click on card > 
// Update counters with timer fn > 
// finaly set stop timer with reset related counters

function timer(status = false){
    // defult statuts = false  to prevent setInterval running again-if 
    // user want to reset the game after 1st click
    if((_1stClick === 1 && status === false)){
        start = setInterval(()=>{
            // timer counter updating
            counter++
            humanReadable(counter)
            // moves counter updating
            movesElement.innerText = moves;
            movesScore.innerText = moves;

            // rating updating
            if(moves > 32 && stars === 3 ){
                // first star down
                rating.lastElementChild.style.color ="gray"
                stars-- // make condition false and move to next
            }else if(moves > 48 && stars === 2){
                // scound star down
                rating.lastElementChild.previousElementSibling.style.color ="gray"
                stars-- // make condition false and move to next..ect
            }
        },1000);
    }else if(status){
        // stop timer and reset related variables
        clearInterval(start);
        _1stClick = 0; 
        counter = 0;
        moves = 0;
        stars = 3;
        cardsMatched = 0;
        timerElement.innerText=`00:00:00`;
    }
}   
// convert secound to human Readable time
function humanReadable(seconds) {
    var HH,MM,SS;
      HH = Math.floor(seconds/3600);
      MM = Math.floor((seconds - HH*3600)/60);
      SS = seconds - (HH*3600+MM*60);
    if(HH<10){HH ='0'+HH}
    if(MM<10){MM ='0'+MM}
    if(SS<10){SS ='0'+SS}
return timerElement.innerText=`${HH}:${MM}:${SS}`;
}

//play again button
playAgain.addEventListener('click',()=>{
    randomiz();
    modual.style.display='none'
}) 