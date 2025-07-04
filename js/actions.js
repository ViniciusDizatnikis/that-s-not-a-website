import { speak } from "./narrator.js";


const narrator = document.querySelector('#narrator');
const title = document.querySelector('.word-container');
const words = document.querySelectorAll('.word-container h1');

let grabbing = false;


export function setGrabbing(value) {
    grabbing = value;
}

//efeito de impacto
export function shakeAll(duration = 150, intensity = 3) {
    const start = Date.now();

    function shake() {
        const elapsed = Date.now() - start;

        if (elapsed < duration) {
            const x = (Math.random() * 2 - 1) * intensity;
            const y = (Math.random() * 2 - 1) * intensity;
            const angle = (Math.random() * 2 - 1) * intensity * 2;

            if (title) title.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
            if (narrator) narrator.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;

            requestAnimationFrame(shake);
        } else {
            if (title) title.style.transform = 'none';
            if (narrator) narrator.style.transform = 'none';
        }
    }

    shake();
}

//Verifica as palavras visíveis e alinhadas corretamente
function getVisualOrder() {
    const titleRect = title.getBoundingClientRect();
    const elements = Array.from(document.querySelectorAll('.word-container h1'));

    const visibleElements = elements.filter(el => {
        const rect = el.getBoundingClientRect();

        const isHorizontallyVisible =
            rect.left + rect.width * 0.5 > titleRect.left &&
            rect.right - rect.width * 0.5 < titleRect.right;

        const isVerticallyVisible =
            rect.top + rect.height * 0.5 > titleRect.top &&
            rect.bottom - rect.height * 0.5 < titleRect.bottom;

        const hasStraightClass = el.classList.contains('straight');

        return isHorizontallyVisible && isVerticallyVisible && hasStraightClass;
    });

    // Ordena da esquerda para a direita com base no `left`
    visibleElements.sort((a, b) => {
        const aLeft = parseFloat(a.style.left || 0);
        const bLeft = parseFloat(b.style.left || 0);
        return aLeft - bLeft;
    });

    return visibleElements.map(el => el.textContent);
}


//Espalha as palavras e ativa a função de arrastar
export async function explodeTitle() {
    words.forEach(word => {
        word.style.cursor = 'grab';

        const initialLeft = 450;
        const initialTop = 0;

        word.style.position = 'fixed';
        word.style.left = `${initialLeft}px`;
        word.style.top = `${initialTop}px`;
        word.style.margin = '0';
        word.style.zIndex = 999;

        const offsetX = Math.floor(Math.random() * 600) - 400;
        const offsetY = Math.floor(Math.random() * 600) - 400;

        const finalLeft = initialLeft + offsetX;
        const finalTop = initialTop + offsetY;
        const angle = (Math.random() - 0.5) * 720;

        word.style.transition = 'left 1s ease-out, top 1s ease-out, transform 1s ease-out';
        void word.offsetWidth;

        word.style.left = `${finalLeft}px`;
        word.style.top = `${finalTop}px`;
        word.style.transform = `rotate(${angle}deg)`;



        makeDraggable(word);
    });
}

//Torna palavras arrastáveis e verifica a frase formada ao soltar
async function makeDraggable(element) {
    element.style.position = 'absolute';
    let isDragging = false;
    let offsetX, offsetY;

    // Pressionou para arrastar
    element.addEventListener('mousedown', e => {
        if (!grabbing) return;
        element.style.transition = 'none';
        element.classList.add('straight');

        const rect = element.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        isDragging = true;
        element.style.cursor = 'grabbing';
    });

    // Enquanto arrasta
    document.addEventListener('mousemove', e => {
        if (!grabbing) return;
        if (isDragging) {
            const parentRect = element.parentElement.getBoundingClientRect();
            const x = e.clientX - offsetX - parentRect.left;
            const y = e.clientY - offsetY - parentRect.top;

            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            element.style.transform = 'none';
        }
    });

    // Soltou o clique
    document.addEventListener('mouseup', () => {
        if (!grabbing) return;
        if (isDragging) {
            isDragging = false;
            element.style.cursor = 'grab';

            const ordem = getVisualOrder();
            const phrase = ordem.join(' ').trim();

            // Verificações com base na frase formada
            if (phrase === 'that ` s not a website') {
                speak(`thanks, now leave`, 3000);

                const words = Array.from(title.children);
                words.forEach(word => {
                    if (word.textContent.trim() === 'not') return;
                    word.style.position = 'static';
                    if (word.textContent.trim() === 'a') {
                        word.style.marginLeft = '210px';
                    }
                });

            } else if (phrase === '') {
                speak(`don't leave it empty`, 2000);
            } else if (phrase === 'that ` s a website') {
                speak(`no, this is not a website, put the "not"`, 5000);
            } else {
                speak(`not is "${phrase}"`, 3000);
            }
        }
    });
}