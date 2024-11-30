const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - document.querySelector('.toolbar').offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Variables for drawing
let painting = false;
let lineWidth = 5;
let strokeColor = '#000000';
let backgroundColor = '#ffffff';
let isEraser = false;

// Update canvas background color
document.getElementById('backgroundColorPicker').addEventListener('input', (e) => {
  backgroundColor = e.target.value;
  canvas.style.backgroundColor = backgroundColor;
});

// Start drawing
canvas.addEventListener('mousedown', () => (painting = true));
canvas.addEventListener('mouseup', () => {
  painting = false;
  ctx.beginPath(); 
});
canvas.addEventListener('mousemove', draw);

function draw(event) {
  if (!painting) return;

  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = isEraser ? backgroundColor : strokeColor; 
  ctx.lineCap = 'round';

  ctx.lineTo(event.clientX, event.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(event.clientX, event.clientY - canvas.offsetTop);
}

// Clear the board
document.getElementById('clearBoard').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Change stroke color
document.getElementById('colorPicker').addEventListener('input', (e) => {
  strokeColor = e.target.value;
});

// Update line width
document.getElementById('lineWidth').addEventListener('change', (e) => {
  lineWidth = parseInt(e.target.value, 10);
});

// Toggle eraser mode
document.getElementById('eraser').addEventListener('click', () => {
  isEraser = !isEraser;

  const eraserButton = document.getElementById('eraser');
  if (isEraser) {
    eraserButton.classList.add('active');
    eraserButton.innerText = 'Brush';
  } else {
    eraserButton.classList.remove('active');
    eraserButton.innerText = 'Eraser';
  }
});
