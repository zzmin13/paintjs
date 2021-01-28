const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#616161"; //처음 사용하는 사람이 이 색상으로 사용하도록 한다.
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting(){
    painting = true;
}
function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){ //painting의 값은 false 인데, !painting을 하는 이유는 if(조건식)에서 조건식이 true여야 하기 때문이다. 그러니깐 !painting이라는 것은 painting은 false일 때를 말한다.
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{ //painting is true
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function handleRangeChange(event){
    const brushSize = event.target.value;
    ctx.lineWidth = brushSize;
}

function handleModeClick(){
    if(filling === true){ //fill mode
        filling = false;
        mode.innerText ="Fill";
    } else{ // paint mode
        filling = true;
        mode.innerText = "Paint";
    }
}

if(canvas){
    //canvas가 존재하는지 확인
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange)
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}