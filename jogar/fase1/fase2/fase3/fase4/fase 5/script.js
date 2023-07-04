(function(){
    var interval;

    var minutos = 0;

    var segundos =0;

    var milesimo = 0;

    var matches = 0;

    var images = [];

    var flippedCard = [];
    
    var minutosLt = document.querySelector("#minutos");
    var segundosLt = document.querySelector("#segundos");
    var milesimoLt = document.querySelector("#milesimo");

    var acerto = document.querySelector("#imgMatch");

    var modalNextFase = document.querySelector("#modalNextFase");
    var modalGameOver = document.querySelector("#modalGameOver");
    
    for(var i = 0; i < 14; i++){
        var img = {
            src: "img/"+ i + ".jpg",
            id: i % 7
        }
        images.push(img);
    }
    starGame();
    relogio();

    function starGame(){
         interval;

         minutos = 0;
    
         segundos =0;
    
         milesimo = 0;

        matches = 0;

        flippedCard = [];

        images = tenteaSorte(images);

        var frontFace = document.getElementsByClassName("front");

        for(var i = 0; i < 14; i++){
            var carta = document.querySelector("#card" + i);
            carta.style.left = i % 7 === 0 ? 5 + "px" : i % 7 * 165 + 5 + "px";
            carta.style.top = i < 7 ? 5 + "px" : 250 + "px";

            carta.addEventListener("click",flipCard,false);

            frontFace[i].style.background = "url('"+ images[i].src+"')";
            frontFace[i].setAttribute("id", images[i].id );
        }
        modalNextFase.style.zIndex = -2;
        modalGameOver.style.zIndex = -3;
    }
    function flipCard(){
        if(flippedCard.length < 2){
            var virada = this.getElementsByClassName("face");
            if(virada[0].classList.length > 2){
                return;
            }

            virada[0].classList.toggle("flipped");
            virada[1].classList.toggle("flipped");

            flippedCard.push(this);

            if(flippedCard.length === 2){
             if(flippedCard[0].childNodes[3].id === flippedCard[1].childNodes[3].id){
                flippedCard[0].childNodes[1].classList.toggle("match");
                flippedCard[0].childNodes[3].classList.toggle("match");
                flippedCard[1].childNodes[1].classList.toggle("match");
                flippedCard[1].childNodes[3].classList.toggle("match");

                matchAcerto();

                matches++;

                flippedCard = [];

                if(matches === 7){
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

    function tenteaSorte(oldArray){
        var newArray = [];
        while(newArray.length !== oldArray.length){
            var i = Math.floor(Math.random()*oldArray.length);
            if(newArray.indexOf(oldArray[i]) < 0){

                newArray.push(oldArray[i])

            }
        }
        return newArray;

    }
    function relogio(){
        interval = setInterval(() => {
            if(true){
                milesimo += 10;
                if(milesimo === 1000){
                    segundos++;
                    milesimo = 0;
                }
                if(segundos === 25){
                     gameOver();
                     zeraTime();
                }
            }
            minutosLt.textContent = formTime(minutos);
            segundosLt.textContent = formTime(segundos);
            milesimoLt.textContent = milesimo;
        }, 10);
    }
    function formTime(time){
        return time < 10 ?  `0${time}` : time;
    }
    function zeraTime(){
        clearInterval(interval);
        minutos = 0;
        segundos = 0;
        milesimo = 0;

        minutosLt.textContent = minutos;
        segundosLt.textContent = segundos;
        milesimoLt.textContent = milesimo;
    }

    function nextFase(){
        modalNextFase.style.zIndex = 10;
    }

    function gameOver(){
        modalGameOver.style.zIndex = 8;
    }
    function matchAcerto(){
        acerto.style.zIndex = 1;
        acerto.style.left = 500 + "px";
        acerto.style.top = 150 + "px";
        acerto.style.opacity = 0;
        setTimeout(function(){
            acerto.style.zIndex = -1;
            acerto.style.left = 500 + "px";
            acerto.style.top = 250 + "px";
            acerto.style.opacity = 1;
        },1500)
    }
}());