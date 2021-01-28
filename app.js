const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#616161"; //처음 사용하는 사람이 이 색상으로 사용하도록 한다.
ctx.lineWidth = 2.5;

let painting = false;

function startPainting(){
    painting = true;
}
function stopPainting(){
    painting = false;
}

function onMouseDown(event){
    painting = true;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

if(canvas){
    //canvas가 존재하는지 확인
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
}