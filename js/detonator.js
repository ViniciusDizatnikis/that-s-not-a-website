import { shakeAll, explodeTitle } from "./actions.js";

export class Detonator {
    constructor(onExplodeCallback) {
        this.title = document.querySelectorAll('.word-container h1'); 
        this.detonator = document.getElementById('detonator');
        this.cable = document.getElementById('cable');
        this.tnt = document.getElementById('tnt');
        this.slide = new Audio('./assets/slide.mp3');
        this.triggering = new Audio('assets/triggering.mp3');
        this.explosion = new Audio('assets/explosion.mp3');
        this.activated = false;
        this.onExplodeCallback = onExplodeCallback;

        this.tnt.addEventListener('click', () => this.handleClick());
    }

    show() {
        this.detonator.style.left = '75%';
        this.slide.play();
    }

    hide() {
        this.detonator.style.left = '100%';
    }

    moveCable(y) {
        this.cable.style.transform = `translateY(${y}px)`;
    }

    async handleClick() {
        if (this.activated) return;
        this.activated = true;

        this.moveCable(0);
        this.triggering.play();
        this.moveCable(110);

        setTimeout(() => {
            this.slide.play();
            this.hide();
        }, 1000);

        this.playExplosion();
    }

    async playExplosion() {
        this.explosion.play();

        await new Promise(resolve => setTimeout(resolve, 4400));
        shakeAll();

        explodeTitle();
    }

   
}
