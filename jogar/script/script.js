(function () {

    var matches = 0;

    var images = [];

    var flippedCard = [];

    var modalGameOver = document.querySelector("#modalGameOver")

    var imgMatchSing = document.querySelector("#imgMatch")

    for (var i = 0; i < 32; i++) {
        var img = {
            src: "img1/" + i + ".jpg",
            id: i % 16
        }
        images.push(img);
    }

    starGame();

    // inicialização do game
    function starGame() {
        matches = 0;

        flippedCard = [];

       images = randomSort(images);

        var frontFace = document.getElementsByClassName("front");
        var backFace = document.getElementsByClassName("back");

        for (var i = 0; i < 32; i++) {
            frontFace[i].classList.remove("flipped","match");
            backFace[i].classList.remove("flipped","match");
            
            var carta = document.querySelector("#carta" + i);
            carta.style.left = i % 8 === 0 ? 5 + "px" : i % 8 * 165 + 5 + "px";
            carta.style.top = i < 8 ? 5 + "px" : i < 16 ? 250 + "px" : i < 24 ? 495 + "px" : 740 + "px";

            carta.addEventListener("click", flipCard, false);

            frontFace[i].style.background = "url('" + images[i].src + "')";
            frontFace[i].setAttribute("id", images[i].id);
            
        }
        modalGameOver.style.zIndex = -2;
      //  modalGameOver.removeEventListener("click",starGame,false);
    };

    //embaralhamento das cartas
   function randomSort(oldArray){
        var newArray = [];

        while(newArray.length !== oldArray.length){

            var i = Math.floor(Math.random()*oldArray.length);

            if (newArray.indexOf(oldArray[i]) < 0){
                    newArray.push(oldArray[i]);

            }
        }
        return newArray;
    }
    // viramento das cartas
    function flipCard() {
        if(flippedCard.length < 2){ 

            var faces = this.getElementsByClassName("face");
             
            if(faces[0].classList.length > 2){
                return;
            }
            faces[0].classList.toggle("flipped");
            faces[1].classList.toggle("flipped");
            
            flippedCard.push(this);

            if(flippedCard.length === 2){
                if(flippedCard[0].childNodes[3].id === flippedCard[1].childNodes[3].id){
                        flippedCard[0].childNodes[1].classList.toggle("match");
                        flippedCard[0].childNodes[3].classList.toggle("match");
                        flippedCard[1].childNodes[1].classList.toggle("match");
                        flippedCard[1].childNodes[3].classList.toggle("match");

                        matchCardSing();

                        matches++;

                        flippedCard = [];

                        if(matches === 16){
                            GameOver();
                        }
  
                }
            }
        } else{
            flippedCard[0].childNodes[1].classList.toggle("flipped");
            flippedCard[0].childNodes[3].classList.toggle("flipped");
            flippedCard[1].childNodes[1].classList.toggle("flipped");
            flippedCard[1].childNodes[3].classList.toggle("flipped");

            flippedCard = [];
        }
    }
   
    
    function GameOver(){
            modalGameOver.style.zIndex = 10;
           // modalGameOver.addEventListener("click",starGame,false);
    }

    // acerto das cartas
    function  matchCardSing(){
        imgMatchSing.style.zIndex = 1;
        imgMatchSing.style.top = 150 + "px";
        imgMatchSing.style.opacity = 0;
        setTimeout(function(){
            imgMatchSing.style.zIndex = -1;
            imgMatchSing.style.top = 250 + "px";
            imgMatchSing.style.opacity = 1;
        },1500);

    }
}());