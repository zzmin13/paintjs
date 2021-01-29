const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const editColor = document.getElementById("editColor");


const INITIAL_COLOR = "#616161";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width, canvas.height); //캔버스 처음의 배경 색 지정, 이걸 안해주면 사진 저장했을 때 배경이 투명하게 저장이 된다.

ctx.strokeStyle = INITIAL_COLOR; //처음 사용하는 사람이 이 색상으로 사용하도록 한다.
ctx.fillStyle = INITIAL_COLOR;
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
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const brushSize = event.target.value;
    ctx.lineWidth = brushSize;
}

function handleModeClick(event){
    if(filling === true){ //fill mode -> paint mode
        filling = false;
        mode.innerText = "fill";
        canvas.classList.toggle("fillCursor");
    }else{ // paint mode -> fill mode
        filling = true;
        mode.innerText = "paint";
        canvas.classList.toggle("fillCursor");
    
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    
}

function handleRightClick(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS";
    link.click();
}

function handleEditColor(event){

    const selectColor = event.target.value;
    ctx.strokeStyle = selectColor;
    ctx.fillStyle =selectColor;
}

if(canvas){
    //canvas가 존재하는지 확인
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu", handleRightClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange)
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}

if(editColor){
    editColor.addEventListener("change",handleEditColor);
}