(function(){ 
    var inteval;
    var minutos = 0;
    var segundos =0;
    var milesimos =0;

    var minutosLt = document.querySelector("#minutos");
    var segundosLt = document.querySelector("#segundos");
    var milesimosLt = document.querySelector("#milesimos");

    var matches = 0;

    var imagens = [];

    var flippedCard = [];
    
    window.onload = conometro;

    var modalNextFase = document.querySelector("#modalNextFase")

    var modalGameOver = document.querySelector("#modalGameOver")

    var imgMatchSing = document.querySelector("#imgMatch")

    for(var i = 0; i < 4; i++){
            var img = {
                src : "img/" + i + ".jpg",
                id: i % 2
            }
            imagens.push(img);
        }
    starGame();
        
    function starGame(){

         inteval;
         minutos = 0;
         segundos =0;
         milesimos =0;

        matches = 0;

        flippedCard = [];

       imagens = randomSort(imagens);

        var frontFace = document.getElementsByClassName("front");
        var backFace = document.getElementsByClassName("back");

        for(var i = 0; i < 4; i++){
            frontFace[i].classList.remove("flipped","match");
            backFace[i].classList.remove("flipped","match");

            var carta = document.querySelector("#carta" + i);
            carta.style.left = i % 2 === 0 ? 5 + "px" : i % 2 * 165 + 5 + "px";
            carta.style.top = i < 2 ? 5 + "px" : 250 + "px";

            carta.addEventListener("click",flipCard,false);

            frontFace[i].style.background = "url('"+ imagens[i].src +"')";
            frontFace[i].setAttribute("id", imagens[i].id);
        } 
        modalGameOver.style.zIndex = -3;
        modalNextFase.style.zIndex = -2;
       
    }

     function randomSort(imagens){
        var newArray = [];

        while(newArray.length !== imagens.length){

            var i = Math.floor(Math.random()*imagens.length);

            if (newArray.indexOf(imagens[i]) < 0){
                    newArray.push(imagens[i]);

            }
        }
        return newArray;
    }

    

    function flipCard (){
        if(flippedCard.length < 2){
              var faces =  this.getElementsByClassName("face");
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

                    if(matches === 2){
                       nextFase();
                       zeraTime();
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
    function conometro(){
        inteval = setInterval(() => {
            if(true){
                milesimos += 10;

                if(milesimos === 1000){
                    segundos++;
                    milesimos =0;
                }
                if(segundos === 2){
                    segundos = 0;
                    gameOver();
                    zeraTime();

                }
                minutosLt.textContent = timeForm(minutos)
                segundosLt.textContent = timeForm(segundos)
                milesimosLt.textContent = milesimos
            }
            
        }, 10);
    }
    function timeForm(time){
        return time < 10 ? `0${time}` : time; 
    }
    function zeraTime(){
        clearInterval(inteval)
        minutos = 0;
        segundos = 0;
        milesimos = 0;

        minutosLt.textContent = minutos;
        segundosLt.textContent = segundos;
        milesimosLt.textContent = milesimos;
    }

    function nextFase(){

    modalNextFase.style.zIndex = 10;    
        
    }
    function gameOver(){
        modalGameOver.style.zIndex = 8;
    }

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