let pad = 20; // Offset offstage
let tick = 0; // Ticker var
let mic; // Mic instance
let fft; // Fast Fourier Transform module

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  fft.smooth(0); // Disable smoothing to avoid artificial dips
  background(0); // Black background for contrast
}

function draw() {
  // Get the current mic amplitude
  let amp = mic.getLevel() * 60;

  // Analyze audio spectrum
  let spectrum = fft.analyze();

  // Boost high frequencies
  for (let i = spectrum.length / 2; i < spectrum.length; i++) {
    spectrum[i] *= 1.1; // Amplify higher frequencies
  }

  // Interpolate to fill any gaps
  for (let i = 1; i < spectrum.length - 1; i++) {
    if (spectrum[i] === 0) {
      spectrum[i] = (spectrum[i - 1] + spectrum[i + 1]) / 2;
    }
  }

  // Divide width into steps for each frequency bin
  let x_step = width / spectrum.length;

  // Begin drawing the frequency curve
  beginShape();

  // Bug workaround for well-formed shape
  curveVertex(0, tick);
  curveVertex(0, tick);

  for (let x = 0; x < spectrum.length; x++) {
    let offy = spectrum[x] * 0.5;

    // Assign distinct colors for frequency ranges
    let hueValue = map(x, 0, spectrum.length, 0, 200); // Hue across the spectrum
    let brightness = map(spectrum[x], 0, 100, 50, 50); // Brightness based on intensity

    colorMode(HSB, 360, 100, 100, 100); // Use HSB for smoother colors
    stroke(hueValue, 100, brightness, amp * 8); // Multicolor stroke based on HSB

    curveVertex(x * x_step, tick - offy);
  }

  endShape();

  // Add glowing points at spectrum peaks
  for (let x = 0; x < spectrum.length; x += 10) {
    let offy = spectrum[x] * 0.5;
    let glowSize = map(spectrum[x], 0, 255, 2, 13);
    let alpha = map(spectrum[x], 0, 255, 50, 150);

    let hueValue = map(x, 0, spectrum.length, 0, 360); // Hue across the spectrum

    fill(hueValue, 70, 80, alpha); // Multicolor glowing points
    noStroke();
    ellipse(x * x_step, tick - offy, glowSize, glowSize);
  }

  // Move the spectrogram downwards
  tick++;

  // Reset ticker to start from the top if it moves offscreen
  if (tick > height + pad) {
    tick = -pad;
  }
}
