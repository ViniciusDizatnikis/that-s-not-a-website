import {runIntroductionSequence, runWarningSequence} from './narrator.js';
import { Detonator } from './detonator.js';
import { TrashBin } from './trashbin.js'; 



const button = document.getElementById('play-button');
const menu = document.getElementsByClassName('menu');
const dialog = document.getElementById('narrator');
const title = document.querySelector('.title');



const detonator = new Detonator();

setTimeout(() => {
    detonator.show();
}, 1000);


// Botão "Go"
let buttonActive = false;
button.addEventListener('click', () => {

    if (buttonActive) return;
    buttonActive = true;
    const cair = new Audio('assets/cair.mp3');
    const caindo = new Audio('assets/caindo.mp3');
    cair.play();
    caindo.currentTime = 0;

    button.style.transition = 'none';
    button.style.transform = 'none';
    button.style.opacity = '1';
    button.style.boxShadow = 'none';
    button.style.transformOrigin = 'center top';
    void button.offsetWidth;

    button.style.transition = 'transform 0.2s ease-out';

    setTimeout(() => {
        cair.play();
        button.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
        button.style.transform = 'rotate(-5deg) translateY(3px)';
        button.style.opacity = '0.8';
    }, 200);

    setTimeout(() => {
        caindo.play();
        button.style.transition = 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.6s ease';
        button.style.transform = 'rotate(0deg) translateY(300px) scale(0.95)';
        button.style.opacity = '0.6';
        button.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    }, 800);

    setTimeout(() => {
        Array.from(menu).forEach(el => {
            el.classList.add('fade-out');
            setTimeout(() => el.style.display = 'none', 500);
        });

        setTimeout(() => {
            
            
            
            runIntroductionSequence();
        }, 4000);
    }, 1500);
});
