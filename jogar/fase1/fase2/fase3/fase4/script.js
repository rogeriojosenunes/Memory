(function (){
    
    var iniciar; 

    var minutos = 0;
    var segundos = 0;
    var milesimos = 0;
       
    var matches = 0;
    

    var images = [];

    var flippedCard = [];

   window.onload = relojo;



    var minutosLl = document.querySelector("#minutos");
    var segundosLl = document.querySelector("#segundos");
    var milesimosLl = document.querySelector("#milesimos");
    
    var acerto = document.querySelector("#imgMatch");

    var modalNextFase = document.querySelector("#modalNextFase");

    var modalGameOver = document.querySelector("#modalGameOver");

   
    for(var i = 0; i < 12; i++){
        var img = {
            src: "img/" + i + ".jpg",
            id: i % 6
        }
        images.push(img);
    }
        startGame();

    function startGame(){

       
    
        iniciar; 

        minutos = 0;
        segundos = 0;
        milesimos = 0;

       

        matches = 0;
        
       conometro = true;

        flippedCard = [];
        
        

        images = embaralhar(images);

        var frontFace = document.getElementsByClassName("front");
        var backFace = document.getElementsByClassName("back");


        for(var i = 0; i < 12; i++){

            frontFace[i].classList.remove("flipped","match");
            backFace[i].classList.remove("flipped","match");

            var carta = document.querySelector("#card" + i);
                carta.style.left = i % 6 === 0 ? 5 + "px" : i % 6 * 165 + 5 + "px";
                carta.style.top = i < 6 ? 5 + "px" : 250 + "px";

                carta.addEventListener("click",flipCard,false);

                frontFace[i].style.background = "url('"+ images[i].src +"')";
                frontFace[i].setAttribute("id", images[i].id);

        }

        modalNextFase.style.zIndex = -2;

        modalGameOver.style.zIndex = -3;
    }

    function flipCard(){
        if(flippedCard.length < 2){
        var virar = this.getElementsByClassName("face");
         if(virar[0].classList.length > 2){
            return;
         }   
        virar[0].classList.toggle("flipped");
        virar[1].classList.toggle("flipped");

        flippedCard.push(this)

        if(flippedCard.length === 2){
            if(flippedCard[0].childNodes[3].id === flippedCard[1].childNodes[3].id){
                flippedCard[0].childNodes[1].classList.toggle("match");
                flippedCard[0].childNodes[3].classList.toggle("match");
                flippedCard[1].childNodes[1].classList.toggle("match");
                flippedCard[1].childNodes[3].classList.toggle("match");

                matchAcerto();
                 matches++;

                flippedCard = [];

                if(matches === 6){
                    nextFase();
                    
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

function relojo(){
    interval = setInterval(() => {
        if(true){

                milesimos += 10;

            if(milesimos === 1000){

                segundos++;
                
                milesimos = 0;
            }
            if(segundos === 10){

                segundos = 0;
                gameOver(); 
                zeraTime();   
                   
            }

            minutosLl.textContent = formtTime(minutos);
            segundosLl.textContent = formtTime(segundos);
            milesimosLl.textContent = milesimos;
        }
        
        
    },10);
    
    
}

    function formtTime(time){
        return time < 10 ? `0${time}` : time;
    }
    function zeraTime(){
        clearInterval(interval);
        minutos = 0;
        segundos = 0;
        milesimos = 0;

        minutosLl.textContent = minutos;
        segundosLl.textContent = segundos;
        milesimosLl.textContent = milesimos;
    }
        

    function embaralhar(velhoArray){
        var novoArray = [];

        while(novoArray.length !== velhoArray.length){
            var i = Math.floor(Math.random()*velhoArray.length);

            if(novoArray.indexOf(velhoArray[i]) < 0){
                novoArray.push(velhoArray[i]);
            }
        }
        return novoArray;
    }
    function playSon(nomeAdio,loop){

        var audio = new Audio(nomeAdio);

        audio.loop = loop;

        audio.play();

    }
    playSon("lucyfer.mp3", true);
    function nextFase(){

        modalNextFase.style.zIndex = 10;
    }

    function gameOver(){
        modalGameOver.style.zIndex = 5;
    }

    function matchAcerto(){
            acerto.style.zIndex = 1;
            acerto.style.top = 150 + "px";
            acerto.style.opacity = 0;
        setTimeout(function(){
            acerto.style.zIndex = -1;
            acerto.style.top = 250 + "px";
            acerto.style.opacity = 1;
        },1500);
    }
}());