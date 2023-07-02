(function(){ 
    var interval;
    var minutos = 0;
    var segundos = 0;
    var milesimos = 0;

    var matches = 0;

    var images = [];

    var flippedCard = [];

    conometro();

    var minutosLt = document.querySelector("#minutos");
    var segundosLt = document.querySelector("#segundos");
    var milesimosLt = document.querySelector("#milesimos");

    var modalNextFase = document.querySelector("#modalNextFase");
    var modalGameOver = document.querySelector("#modalGameOver");

    var imgMatchSing = document.querySelector("#imgMatch");

        for(var i = 0; i < 6; i++){
            var img = {
                src: "img/"+ i +".jpg",
                id: i % 3
            }
            images.push(img);
        }
    starGame();

    function starGame(){

         interval;
         minutos = 0;
         segundos = 0;
         milesimos = 0;

        flippedCard = [];

        images = randomSort(images);

        var frontFace = document.getElementsByClassName("front");
        var backFace = document.getElementsByClassName("back")

        for(var i = 0; i < 6; i++){

            frontFace[i].classList.remove("flipped","match");
            backFace[i].classList.remove("flipped","match");

            var carta = document.querySelector("#card" + i);
            carta.style.left = i % 3 === 0 ? 5 + "px" : i % 3 * 165 + 5 + "px";
            carta.style.top = i < 3 ? 5 + "px" : 250 + "px";

            carta.addEventListener("click",flipCard,false);

            frontFace[i].style.background = "url('"+ images[i].src +"')";
            frontFace[i].setAttribute("id",images[i].id);

        }
        modalNextFase.style.zIdex = -2;
        modalGameOver.style.zIdex = -3;
    }
    function randomSort(oldArray){
        var newArray = []

        while(newArray.length !== oldArray.length){
            var i = Math.floor(Math.random()*oldArray.length);

            if(newArray.indexOf(oldArray[i]) < 0){
                newArray.push(oldArray[i]);
            }
        }
        return newArray;
    }
    function flipCard(){
        if(flippedCard.length < 2){
         var face = this.getElementsByClassName("face");
            if(face[0].classList.length >2){
                return;
            }
                       
            face[0].classList.toggle("flipped");
            face[1].classList.toggle("flipped");

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

                    if(matches === 3){

                        nextFase();
                        zeraTime();
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
    function conometro(){
        interval = setInterval(() => {
            if(true){
                milesimos += 10;
                if(milesimos === 1000){
                    segundos++;
                    milesimos = 0;
                }
                if(segundos === 10){
                    gameOver();
                    zeraTime();
                }
                minutosLt.textContent = formTime(minutos);
                segundosLt.textContent = formTime(segundos);
                milesimosLt.textContent = milesimos;
            }
        }, 10);
    }
    function formTime(time){
        return time < 10 ? `0${time}` : time;
    }
    function zeraTime(){
        clearInterval(interval);
        minutos = 0;
        segundos = 0;
        milesimos = 0;

        minutosLt.textContent = minutos;
        segundosLt.textContent = segundos;
        milesimosLt.textContent = milesimos;

    }
    function gameOver(){
        setTimeout(function(){
            modalGameOver.style.zIndex = 8;
        },500);
    }
    function nextFase(){
        setTimeout(function(){
            modalNextFase.style.zIndex = 10;
        },500);
    }
    function matchCardSing(){
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