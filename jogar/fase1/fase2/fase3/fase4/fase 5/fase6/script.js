(function(){

    var matches = 0;

    var images = [];

    var flippedCard = [];

    var modalGameOver = document.querySelector("#modalGameOver");

    var imgMat = document.querySelector("#imgMatch");

        for(var i = 0; i < 16; i++){
            var img ={
                src: "img/"+ i + ".jpg",
                id: i % 8
            }
            images.push(img);
        }

        startGame();

    function startGame(){ 

        matches = 0;

        flippedCard = [];

        images = randomSort(images);

        var frontFace = document.getElementsByClassName("front");
        var backFace = document.getElementsByClassName("back");

        for(var i = 0; i < 16; i ++){

            frontFace[i].classList.remove("flipped","match");
            backFace[i].classList.remove("flipped","match");

            var carta = document.querySelector("#card" + i);
            carta.style.left = i % 8 === 0 ? 5 + "px" : i % 8 * 165 + 5 + "px";
            carta.style.top = i < 8 ? 5 + "px" : 250 + "px";

            carta.addEventListener("click",flipCard,false);

            frontFace[i].style.background = "url('"+ images[i].src +"')"
            frontFace[i].setAttribute("id",images[i].id);
        }
        modalGameOver.style.zIndex = -2;
    }
    function flipCard(){
        if(flippedCard.length < 2){
        var frente = this.getElementsByClassName("face");
        if(frente[0].classList.length > 2){
            return;
        }
            frente[0].classList.toggle("flipped");
            frente[1].classList.toggle("flipped");

            flippedCard.push(this);

            if(flippedCard.length === 2){
                if(flippedCard[0].childNodes[3].id === flippedCard[1].childNodes[3].id){
                    flippedCard[0].childNodes[1].classList.toggle("match");
                    flippedCard[0].childNodes[3].classList.toggle("match");
                    flippedCard[1].childNodes[1].classList.toggle("match");
                    flippedCard[1].childNodes[3].classList.toggle("match");

                    imgMatchSing();

                    matches++;
        
                    flippedCard = [];
        
                    if(matches === 8){
        
                        gameOver();
                    }
                }
            }
        }else{
            flippedCard[0].childNodes[1].classList.toggle("flipped");
            flippedCard[0].childNodes[3].classList.toggle("flipped");
            flippedCard[1].childNodes[1].classList.toggle("flipped");
            flippedCard[1].childNodes[3].classList.toggle("flipped");

            flippedCard = [];

        }
    }
    function randomSort(oldArray){
        var newArray = [];
        while(newArray.length !== oldArray.length){

            var i = Math.floor(Math.random()*oldArray.length);

            if(newArray.indexOf(oldArray[i]) < 0){

                newArray.push(oldArray[i])
            }
        } 
        return newArray;
    }
    function gameOver(){
        modalGameOver.style.zIndex = 10;   
    }
    function imgMatchSing(){

        imgMat.style.zIndex = 1;
        imgMat.style.top = 150 + "px";
        imgMat.style.opacity = 0;

    setTimeout(function(){
        imgMat.style.zIndex = -1;
        imgMat.style.top = 250 + "px";
        imgMat.style.opacity = 1;
    },1500);
}

}());