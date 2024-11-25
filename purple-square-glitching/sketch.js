function setup() {
  createCanvas(800, 800);
  noStroke();
}

function draw() {
  background(0); // Black background

  // Draw the purple-toned rectangle in the middle
  let purpleTones = [
    color(128, 0, 128),   // Deep Purple
    color(147, 112, 219), // Medium Purple
    color(138, 43, 226),  // Blue Violet
    color(75, 0, 130),    // Indigo
    color(186, 85, 211)   // Orchid
  ];
  let rectHeight = height / purpleTones.length;
  for (let i = 0; i < purpleTones.length; i++) {
    fill(purpleTones[i]);
    rect(width / 4, height / 4 + i * rectHeight / 2, width / 2, rectHeight / 2);
  }

  // Draw circles with varying textures in the center
  let numCircles = 5;
  for (let i = 0; i < numCircles; i++) {
    let x = width / 2;
    let y = height / 2;
    let size = random(50, 150);

    // Random fill textures for circles
    if (i % 2 === 0) {
      fill(255, 0, 255, 100); // Transparent pink
    } else {
      fill(random(50, 150)); // Random grayscale
    }
    ellipse(x + random(-50, 50), y + random(-50, 50), size, size);
  }

  // Glitching geometric patterns (blues and reds)
  if (frameCount % 40 === 0) {
    let numShapes = int(random(3, 6));
    for (let i = 0; i < numShapes; i++) {
      let x = random(width / 4, 3 * width / 4);
      let y = random(height / 4, 3 * height / 4);
      let size = random(40, 100);
      let shapeType = int(random(3)); // 0: rect, 1: ellipse, 2: triangle

      fill(random([color(0, 0, 255), color(255, 0, 0)]));
      if (shapeType === 0) {
        rect(x, y, size, size);
      } else if (shapeType === 1) {
        ellipse(x, y, size, size);
      } else if (shapeType === 2) {
        triangle(
          x, y,
          x + size, y,
          x + size / 2, y - size
        );
      }
    }
  }
}
