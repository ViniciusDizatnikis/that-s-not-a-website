import { setGrabbing } from './actions.js';
import { PlayButton } from './playButton.js';
import { Detonator } from './detonator.js';
import { runIntroductionSequence, runWarningSequence } from './narrator.js';

class MainController {
    constructor() {
        this.detonator = new Detonator(async () => {
            await runWarningSequence();
            setGrabbing(true);
        });

        new PlayButton(async () => {
            await runIntroductionSequence();
            await new Promise(resolve => setTimeout(resolve, 5000));
            this.detonator.show();
        });
    }
}

new MainController();
