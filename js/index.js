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
let isTherePaint = false;

// Page Loading
window.addEventListener("load", () => {
  canvas.width = drawingArea.offsetWidth;
  canvas.height = drawingArea.offsetHeight;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Drawing with Mouse
canvas.addEventListener("mousedown", () => {
  isDrawing = true;
  ctx.beginPath();
  ctx.lineWidth = currentBrushThickness;
  isTherePaint = true;
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

// Drawing with Touch
canvas.addEventListener("touchstart", () => {
  isDrawing = true;
  ctx.beginPath();
  ctx.lineWidth = currentBrushThickness;
  isTherePaint = true;
});

canvas.addEventListener("touchend", () => {
  isDrawing = false;
});

canvas.addEventListener("touchmove", (event) => {
  if (isDrawing) {
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(event.touches[0].clientX - rect.left, event.touches[0].clientY - rect.top);
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

// Clear Draw
clear.addEventListener("click", () => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  isTherePaint = false;
});

// Save Draw
save.addEventListener("click", () => {
  if (isTherePaint) {
    let fileName = window.prompt("Please Enter Your File Name...", `${Date.now()}`);
    fileName === null ? fileName = `${Date.now()}` : "";
    let link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = `${fileName}.jpg`;
    link.click();
  } else {
    alert("Your Drawing is Empty! \nPlease Draw Something...");
  }
});
