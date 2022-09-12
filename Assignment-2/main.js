const game = new PIXI.Application({
    width: innerWidth,
    height: innerHeight,
    backgroundColor: 0xabdbe3,
  });
  
  document.getElementById("game").append(game.view);
  
  loadAssets(
    [
    
      { name: "back", url: "./assets/cardback2.png" },
    //  { name: "front", url: "./assets/cardback.png" },
    ],
    start
  );
  
  // -------------------------------
  const pBar = document.getElementById("bar");
  const pText = document.getElementById("progress");
  function preload(e) {
    pBar.style.width = e.progress  + "%";
    pText.innerText = e.progress + "%";
    if (e.progress === 100) {
      console.log("hide loader");
      setTimeout(() => {
        document.getElementById("loader").style.display = "none";
      }, 500);
    }
    console.log(e.progress);
  }
  
  function loadAssets(list, onLoadComplete) {
    game.loader.onProgress.add(preload);
    game.loader.add(list).load(onLoadComplete);
  }
  
  function start(loader, resources) {
    console.log("params ", arguments);
  
    
  
    var d = 180;
    var s=0;
    for (var i = 0; i < 2; i++) {
      for(var j=0;j<6;j++){
      const back = PIXI.Sprite.from(resources["back"].texture);
      back.scale.set(0.12);
      back.x = d;
      back.y = 160+s;
      game.stage.addChild(back);
      d = d + 200;
    }
    s+=200; 
    d=180;          
  }

    


  }