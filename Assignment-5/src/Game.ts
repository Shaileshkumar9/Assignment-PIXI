import { Application, Loader, Sprite, } from "pixi.js";
import { gsap } from "gsap";
import * as PIXI from "pixi.js";
import { getResource, setResources } from "./Texture.utils";
import { Spine } from "pixi-spine";
export class Game extends Application {
  constructor(opts: any) {
    super(opts);
    this.preload(
      [
        { name: "bgr", url: "assets/new.jpg" },
        { name: "goblin", url: "assets/goblins/goblins.json" },
        { name: "boy", url: "assets/spineboy/spineboy.json" },
        { name: "hero", url: "assets/hero/hero.json" },
      ],
      this.onLoad.bind(this)
    );
    }

   texture = PIXI.Texture.from('examples/assets/bunny.png');
  preload(list: any[], cb: () => {}): void {
    this.loader.onComplete.add((l: Loader) => {
      setResources(l.resources);
    });
    this.loader.add(list);
    this.loader.load(cb);
  }
  onLoad(): void {
    this.stage.interactive = true;

    //      const gob = new Spine(getResource("bgr"));
    // // gob.skeleton.setSkinByName("goblin");
    // // gob.skeleton.setSlotsToSetupPose();
    // // gob.state.setAnimation(0, "walk", true);
    //  gob.x = this.screen.width / 2;
    //  gob.y = this.screen.height;
    //  this.stage.addChild(gob);
    const pointer = new Sprite(this.loader.resources['bgr'].texture);
        pointer.anchor.set(0.01);
        pointer.width=1600;
        pointer.height=750;
       // pointer.x = 825;
       // pointer.y = 105;
        this.stage.addChild(pointer);

   

    // this.stage.on("pointertap", () => {
    //   // change current skin
    //   const currentSkinName = gob.skeleton.skin.name;
    //   const newSkinName = currentSkinName === "goblin" ? "goblingirl" : "goblin";
    //   gob.skeleton.setSkinByName(newSkinName);
    //   gob.skeleton.setSlotsToSetupPose();
    // });
    
    const hero = new Spine(getResource("boy").spineData);
   // hero.x = this.screen.width / 2;
   // hero.y = this.screen.height;
    hero.x=600;
    hero.y=700;
    hero.scale.set(0.5);
    hero.skeleton.setSlotsToSetupPose();
    hero.stateData.setMix('walk', 'jump', 0.4);
    hero.stateData.setMix('jump', 'walk', 0.4);
    hero.state.setAnimation(0, "idle", true);
    this.stage.addChild(hero);
    let previousAnim: string = 'idle';
    let currentAnim: string = 'idle';
    let revertToAnim:string = 'idle';
    let direction: number = 1;
    let defaultScale = hero.scale.x;
    this.ticker.add(()=>{
        hero.scale.x = defaultScale * direction;
        if(currentAnim!=previousAnim){
            console.log(currentAnim, previousAnim);
            hero.state.setAnimation(0, currentAnim, true);
            previousAnim = currentAnim;
            
        }
    });
    function onKeyEvent(e: KeyboardEvent): void {
      console.log("keyboard event", e);
      switch (e.type) {
        case "keyup":
            switch(e.code) {
                default:
                    currentAnim = revertToAnim;
                    // direction = 1;
                    break;
            }
          break;
        case "keydown":
            switch(e.code) {
                case 'KeyW':
                    currentAnim = 'jump';
                    break;
                case 'KeyD':
                    currentAnim = 'walk';
                    revertToAnim = 'walk';
                    direction = 1;
                    break;
                case 'KeyA':
                    currentAnim = 'walk';
                    revertToAnim = 'walk';
                    direction = -1;
                    break;
                case 'Space':
                    currentAnim = 'shoot';
                    break;
                default:
                    currentAnim = 'idle';
                    revertToAnim = 'idle';
            }
          break;
        default:
          console.warn("Event has no listener", e.type);
      }
    }
    window.addEventListener("keydown", onKeyEvent);
    window.addEventListener("keyup", onKeyEvent);
  }
}
