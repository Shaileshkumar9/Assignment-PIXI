import {Application } from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.5.2/browser/pixi.mjs";
import { start as gameStart} from "./js/game.mjs";
import { loadAssets } from "./js/loader.mjs";

export function createGame(div) {
    const game = new Application({
        //width:1340,
       // height:920,
        width:innerWidth,
        height:innerHeight,
        backgroundColor:0xA6CB31
    });
    console.log('game', game);
    div.appendChild(game.view);
    return game;
}

const game = createGame(document.getElementById('game'));
loadAssets(game,[
    { name: "back", url: "assets/back.png" },
    { name: "front", url: "assets/deck.jpg" },
  ], () => {
    console.log('starting game');
    gameStart(game);
  });