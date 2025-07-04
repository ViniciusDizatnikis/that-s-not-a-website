import { shakeAll, explodeTitle } from "./actions.js";

export class Detonator {
    constructor(onExplodeCallback) {
        // Elementos DOM
        this.title = document.querySelectorAll('.word-container h1');
        this.detonator = document.getElementById('detonator');
        this.cable = document.getElementById('lever');
        this.tnt = document.getElementById('tnt');

        // Sons
        this.slide = new Audio('./assets/slide.mp3');
        this.triggering = new Audio('assets/triggering.mp3');
        this.explosion = new Audio('assets/explosion.mp3');

        this.activated = false; // evitar múltiplas ativações
        this.onExplodeCallback = onExplodeCallback;

        this.tnt.addEventListener('click', () => this.handleClick());
    }

    show() {
        this.slide.play();
        this.detonator.style.left = '75%';
    }

    hide() {
        this.detonator.style.left = '100%';
    }

    // Move visualmente a alavanca para simular ativação
    moveCable(y) {
        this.cable.style.transform = `translateY(${y}px)`;
    }

    // Ao clicar no TNT
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
        await new Promise(r => setTimeout(r, 4400));
        shakeAll();

        await explodeTitle();

        if (this.onExplodeCallback) this.onExplodeCallback();
    }
}
