 let frontIDs = [];
 let backIDs = [];
 var imageIds = [];
 let score = 0;
 var usedImages = [];
 var root  = document.getElementById('root');
 let openedImages = [];
// front cards
 let openedCards = [];
// back cards
 let visibleCards = [];
        
const gameData = [
        { key: 1, url: './assets/image1.png' },
        { key: 2, url: './assets/image2.png' },
        { key: 3, url: './assets/image3.png' },
         { key: 1, url: './assets/image1.png' },
        { key: 2, url: './assets/image2.png' },
        { key: 3, url: './assets/image3.png' },
]
    


function createCards (){
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

    
    
function generateImages () {
    const imgs = document.querySelectorAll('img');
    // console.log(shuffle(gameData)[i])
    const arr = shuffle(gameData);
    imgs.forEach((img, i) => {
            img.src = arr[i].url;
            img.id = 'card-i-' + arr[i].key;
            imageIds.push('card-i-' + arr[i].key);
        })
}
// random array
function shuffle (images){
          let currentIndex = images.length;
         let randomIndex;
         while (currentIndex != 0) {
             randomIndex = Math.floor(Math.random() * currentIndex);
             currentIndex--;

                 [images[currentIndex], images[randomIndex]] =
                 [images[randomIndex], images[currentIndex]];
         }
         return images;
}
        


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

            setTimeout(() => {
                document.getElementById('score').innerText = ++score;
            }, 200);
}

// bind handlers
if(document.readyState=="loading"){
    createCards();
    generateImages();
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
}

