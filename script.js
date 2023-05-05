 let frontIDs = [];
    let backIDs = [];
    var imageIds = [];
    let cases = [];
    let nums = [1,2,3]
        
    const gameData = [
        { key: 1, url: './assets/image1.png' },
        { key: 2, url: './assets/image2.png' },
        { key: 3, url: './assets/image3.png' },
    ]

    var usedImages = [];

    var root  = document.getElementById('root');
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
                      [0,1,2].forEach(index=>{
                          if (usedImages.filter(value => value === index).length < 2) {
                              img.src = gameData[index].url;
                              console.log('here created',gameData[index].url)
                              usedImages.push(index);
                              img.id = 'card-i-' + gameData[index].key;
                              imageIds.push('card-i-' + gameData[index].key);
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
    


let openedImages = [];


// when clicking on the front of the card
function onCardClickhandler(front,back){
    
    const cardFront = document.getElementById(front);
    const imageID = document.querySelector('#' + backIDs[back]+'>img').id;
    const cardBack = document.getElementById(backIDs[back]);

    cardFront.addEventListener('click',()=> {
        cardFront.classList.add('cards-front-visibility-hidden')
        cardFront.classList.remove('cards-front-visibility-visible')
        cardBack.classList.add('cards-back-visibility-visible')
        cardBack.classList.remove('cards-back-visibility-hidden')
        openedImages.push(imageID)
        console.log(openedImages)
        setCardBack(openedImages, cardBack, cardFront)
    });

}


const getIDNumber = (id, imageIds) => id.split('-')[2]

// change to back and check if the image is the same using the ID and key of image
const setCardBack = (openedImages, cardBack, cardFront) => {
    var l = openedImages.length;
   if(l!==1){
       if (getIDNumber(openedImages[0]) === getIDNumber(openedImages[l - 1])) {
           document.getElementById('message').innerText = 'Bingo! you won!';
           document.getElementById('message').style.color = 'green';
       } else {
          setTimeout(() => {
              cardBack.classList.add('cards-back-visibility-hidden')
              cardBack.classList.remove('cards-back-visibility-visible')
              cardFront.classList.add('cards-front-visibility-visible')
              cardFront.classList.remove('cards-front-visibility-hidden')
          },2000);
       }
   }
}

// bind handlers
if(document.readyState=="loading"){
    frontIDs.forEach((id,index)=>{
        onCardClickhandler(id,index);
    })
}


function onRefrech(){
    window.location.reload();
}

