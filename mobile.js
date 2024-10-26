let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {
    paper.addEventListener('touchstart', (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;

      // Get current position
      const transform = getComputedStyle(paper).transform;
      if (transform !== 'none') {
        const matrix = new DOMMatrix(transform);
        this.currentX = matrix.m41;
        this.currentY = matrix.m42;
      }
    });

    paper.addEventListener('touchmove', (e) => {
      if (!this.holdingPaper) return;

      e.preventDefault(); // Prevent default scrolling

      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;

      // Update position
      const deltaX = touchX - this.startX;
      const deltaY = touchY - this.startY;

      paper.style.transform = `translate(${this.currentX + deltaX}px, ${this.currentY + deltaY}px) rotateZ(${this.rotation}deg)`;
    });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
