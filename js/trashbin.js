export class TrashBin {
  constructor() {
    //Sound
    this.sound = new Audio('assets/trash.mp3');

    this.trash = document.getElementById('trash-bin');
  }


  show() {
    this.trash.style.top = '80%';
  }

  hide() {
    this.trash.style.top = '100%';
  }


  playSound() {
    this.sound.currentTime = 0;
    this.sound.play();
  }

  // Verifica se o elemento está sobrepondo a lixeira
  isElementOverlapping(el) {
    const elRect = el.getBoundingClientRect();
    const trashRect = this.trash.getBoundingClientRect();

    return !(
      elRect.right < trashRect.left ||
      elRect.left > trashRect.right ||
      elRect.bottom < trashRect.top ||
      elRect.top > trashRect.bottom
    );
  }

  // Remove o elemento e "fecha" a lixeira
  disposeElement(el) {
    this.playSound();
    el.remove();
  }
}
