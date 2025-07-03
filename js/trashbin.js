export class TrashBin {
  constructor() {
    this.trash = document.getElementById('trash-bin'); 
  }

  moveUp() {
    console.log(this.trash)
    this.trash.style.top = '80%';
  }

  playSound() {
    const sound = new Audio('assets/trash.mp3');
    sound.currentTime = 0;
    sound.play();
  }

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

  disposeElement(el) {
    this.playSound();
    el.remove();
    this.trash.style.top = '100%';
  }
}
