 let frontIDs = [];
 let backIDs = [];
 var imageIds = [];
 let cases = [];
 let score = 0;
        
    const gameData = [
        { key: 1, url: './assets/image1.png' },
        { key: 2, url: './assets/image2.png' },
        { key: 3, url: './assets/image3.png' },
    ]

    var usedImages = [];

    var root  = document.getElementById('root');
    


function createCards (){
        localStorage.setItem('score', 0);
        [0, 1, 2].forEach(value => {

              // create row
              let row = document.createElement('div');
              row.classList.add('row');

              [1, 2].forEach(index => {
                   const random = parseInt(Math.random() * 100);

                  // create card back
                  let backDiv = document.createElement('div')
                  backDiv.classList.add('cards','cards-back-visibility-hidden');
                  backDiv.id = 'card-b-' + random;
                  backIDs.push('card-b-' + random);

                  // create card front
                  let frontDiv = document.createElement('div')
                  frontDiv.classList.add('cards', 'cards-front-visibility-visible');
                  frontDiv.id = 'card-f-' + random;
                  frontIDs.push('card-f-' + random);

                  // creat images
                  var img = document.createElement('img');

                  let randIndex;
                  if (usedImages.length < gameData.length) {
                      do {
                          randIndex = Math.floor(Math.random() * gameData.length);
                      } while (usedImages.includes(randIndex));
                      usedImages.push(randIndex);
                      img.src = gameData[randIndex].url;
                      img.id = 'card-i-' + gameData[randIndex].key;
                      imageIds.push('card-i-' + gameData[randIndex].key);
                  } else {
                      // generate random array for the rest images
                      let newIndex =[];
                      [1,2,3,4].forEach(index=>{
                          randIndex = Math.floor(Math.random() * gameData.length);
                          newIndex.push(randIndex);
                      })
                      // use array to add last images
                      newIndex.forEach(i=>{
                          if (usedImages.filter(d => d == i).length < 4) {
                              img.src = gameData[i].url;
                              usedImages.push(i);
                              img.id = 'card-i-' + gameData[i].key;
                              imageIds.push('card-i-' + gameData[i].key);
                          }
                      })
                  }
                  
                 
                  
                  img.classList.add('card-image')
                  img.width = 100;
                  img.height = 100;

                  // create symbole
                  var symbole  = document.createElement('p');
                  symbole.innerText = '?'
                  symbole.className = 'symbol'

                  // append img to back card
                  backDiv.appendChild(img);
                  // append symbol to front card
                  frontDiv.appendChild(symbole);

                  //append full card to row
                  row.appendChild(backDiv)
                  row.appendChild(frontDiv);

                  // append card with content to the row
                  root.appendChild(row);

              })

        });
    }
    


let openedImages = [];
// front cards
let openedCards = [];
// back cards
let visibleCards = [];


// when clicking on the front of the card
function onCardClickhandler(front,back){
    
    const cardFront = document.getElementById(front);
    const imageID = document.querySelector('#' + backIDs[back]+'>img').id;
    const cardBack = document.getElementById(backIDs[back]);

    cardFront.addEventListener('click',(e)=> {

        cardFront.classList.add('cards-front-visibility-hidden')
        cardFront.classList.remove('cards-front-visibility-visible')
        cardBack.classList.add('cards-back-visibility-visible')
        cardBack.classList.remove('cards-back-visibility-hidden')
        cardBack.style.animationName = 'cardAnimation';

        // affect animation to current card
        cardBack.style.animationDuration = '3s';
        cardFront.style.animationName = 'cardAnimation';
        cardFront.style.animationDuration = '3s';
        // push to IDs arrays
        openedImages.push(imageID)
        openedCards.push(front)
        visibleCards.push(backIDs[back])
        setCardBack(openedImages, cardBack, cardFront,openedCards,visibleCards)
    });

}


const getIDNumber = (id, imageIds) => id.split('-')[2]

// change to back and check if the image is the same using the ID and key of image
const setCardBack = (openedImages, cardBack, cardFront,openedCards,visibleCards) => {
    console.log('cards',openedCards,visibleCards)
    var length = openedImages.length;
   if(length!==1){
       if (getIDNumber(openedImages[0]) === getIDNumber(openedImages[length - 1])) {
            calculateScoreAndShowMessage();
       } else {
          setTimeout(() => {
              cardBack.classList.add('cards-back-visibility-hidden')
              cardBack.classList.remove('cards-back-visibility-visible')
              cardFront.classList.add('cards-front-visibility-visible')
              cardFront.classList.remove('cards-front-visibility-hidden')
            },1000);
       }
   }
}

function calculateScoreAndShowMessage (){
    document.getElementById('message').innerText = 'Bingo! you won!';
           document.getElementById('message').style.color = 'green';
            let result = localStorage.getItem('score');
            localStorage.setItem('score', result ++);

            setTimeout(() => {
                document.getElementById('score').innerText = 'scrore:' + (parseInt(result) + 1)
            }, 200);
}

// bind handlers
if(document.readyState=="loading"){
    createCards();
    frontIDs.forEach((id,index)=>{
        onCardClickhandler(id,index);
    })
}


function onRefrech(){
    window.location.reload();
}

// recreate all rows
function restartTheGame (){
    document.getElementById('message').innerText = '';

     const firstOpenedCard  = document.getElementById(openedCards[0])
     const lastOpenedCard  = document.getElementById(openedCards[openedCards.length-1])
     const firstOpenedCardBack  = document.getElementById(visibleCards[0])
     const lastOpenedCardBack  = document.getElementById(visibleCards[visibleCards.length-1])

         firstOpenedCardBack.classList.add('cards-back-visibility-hidden')
         firstOpenedCardBack.classList.remove('cards-back-visibility-visible')
         firstOpenedCard.classList.add('cards-front-visibility-visible')
          firstOpenedCard.classList.remove('cards-front-visibility-hidden')

          lastOpenedCardBack.classList.add('cards-back-visibility-hidden')
         lastOpenedCardBack.classList.remove('cards-back-visibility-visible')
         lastOpenedCard.classList.add('cards-front-visibility-visible')
          lastOpenedCard.classList.remove('cards-front-visibility-hidden')

          openedImages.forEach(_i=>{
              openedImages.pop();
          })
          openedCards.forEach(_i=>{
              openedImages.pop();
          })
          visibleCards.forEach(_i=>{
              openedImages.pop();
          })
           localStorage.setItem('score', 0);
}

