(function(){
    startGame();

    function startGame(){
        for(var i = 0; i < 6; i++){
            var bt = document.querySelector("#bt" + i);
                bt.style.left = i % 3 === 0 ? 5 + "px" : i % 3 * 210 + 5 + "px";
                bt.style.top = i < 3 ? 35 + "px" : 160 + "px";

            
        }
    }
}())