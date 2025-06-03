const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const drawingArea = document.getElementById("drawing-area");

const brushThickness = document.getElementById("brush-thickness");
const brushColor = document.getElementById("brush-color");

const brush = document.getElementById("brush");
const eraser = document.getElementById("eraser");

const clear = document.getElementById("clear");
const save = document.getElementById("save");

let isDrawing = false;
let currentBrushThickness = "5";
let currentBrushColor = "#000000";
let lastBrushColor = "#000000";

// Page Loading
window.addEventListener("load", () => {
  canvas.width = drawingArea.offsetWidth;
  canvas.height = drawingArea.offsetHeight;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Drawing
canvas.addEventListener("mousedown", () => {
  isDrawing = true;
  ctx.beginPath();
  ctx.lineWidth = currentBrushThickness;
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvas.addEventListener("mousemove", (event) => {
  if (isDrawing) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.strokeStyle = `${currentBrushColor}`;
    ctx.stroke();
  }
});

// Brush Thickness
brushThickness.addEventListener("change", (event) => {
  currentBrushThickness = event.target.value;
});

// Brush Color
brushColor.addEventListener("change", (event) => {
  currentBrushColor = event.target.value;
  lastBrushColor = event.target.value;
});

// Clear Draw
clear.addEventListener("click", () => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Brush
brush.addEventListener("click", () => {
  brush.classList.add("active");
  eraser.classList.remove("active");
  currentBrushColor = lastBrushColor;
});

// Eraser
eraser.addEventListener("click", () => {
  eraser.classList.add("active");
  brush.classList.remove("active");
  currentBrushColor = "#ffffff";
});
