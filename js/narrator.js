const narrator = document.getElementById('narrator');


export function speak(text, duration, color = 'white') {
    return new Promise((resolve) => {

        const narratorText = narrator.querySelector('h1');

        narrator.classList.remove('fade-out');

        narrator.classList.add('fade-in');

        narratorText.textContent = text;

        narrator.style.color = color;

        setTimeout(() => {

            narrator.classList.remove('fade-in');

            narrator.classList.add('fade-out');

            resolve();

        }, duration);

    });
}


export async function runIntroductionSequence() {
    const sequence = [
        { text: 'what', duration: 1500 },
        { text: 'who is here?', duration: 3000 },
        { text: 'Do you not know read?', duration: 4000 },
        { text: "that's not a website", duration: 4000 },
        { text: 'get out here!', duration: 3000, color: 'red' },
    ];

    for (const line of sequence) {
        await speak(line.text, line.duration, line.color);
        await new Promise(r => setTimeout(r, 500));
    }
}


export async function runWarningSequence() {
    const sequence = [
        { text: 'wow', duration: 1500 },
        { text: 'thanks for it', duration: 2500 },
        { text: 'you destroyed my site', duration: 1500 },
        { text: "ops", duration: 500 },
        { text: 'you destoyed the warning', duration: 2500 },
        { text: 'now clean up the mess you made ', duration: 3000 },
        { text: 'or suffer major consequences', duration: 3000, color: 'red' },
    ];

    for (const line of sequence) {
        await speak(line.text, line.duration, line.color);
        await new Promise(r => setTimeout(r, 500));
    }
}