import { runIntroductionSequence } from './narrator.js';

export class PlayButton {
    constructor(onStartCallback) {
        this.button = document.getElementById('play-button');
        this.menuElements = Array.from(document.getElementsByClassName('menu'));
        this.active = false;
        this.onStartCallback = onStartCallback;

        // Sons
        this.creak = new Audio('assets/creak.mp3');
        this.falling = new Audio('assets/falling.mp3');

        this.init();
    }

    init() {
        if (!this.button) return;
        this.button.style.cursor = 'pointer';
        this.button.addEventListener('click', () => this.handleClick());
    }

    async handleClick() {
        if (this.active) return;
        this.active = true;

        this.animateButton();
        this.hideMenu();

        await new Promise(resolve => setTimeout(resolve, 5500));

        if (this.onStartCallback) {
            await this.onStartCallback();
        }
    }

    animateButton() {
        this.creak.play();
        this.falling.currentTime = 0;

        this.resetStyles();

        this.creak.play();
        this.button.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
        this.button.style.transform = 'rotate(-5deg) translateY(3px)';
        this.button.style.opacity = '0.8';


        setTimeout(() => {
            this.falling.play();
            this.button.style.transition = 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.6s ease';
            this.button.style.transform = 'rotate(0deg) translateY(300px) scale(0.95)';
            this.button.style.opacity = '0.6';
            this.button.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        }, 800);
    }

    resetStyles() {
        this.button.style.transition = 'none';
        this.button.style.transform = 'none';
        this.button.style.opacity = '1';
        this.button.style.boxShadow = 'none';
        this.button.style.transformOrigin = 'center top';

        void this.button.offsetWidth;
    }

    hideMenu() {
        setTimeout(() => {
            this.menuElements.forEach(el => {
                el.classList.add('fade-out');
                setTimeout(() => {
                    el.style.display = 'none';
                }, 500);
            });
        }, 1500);
    }
}
