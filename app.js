const canvas = document.getElementById("jsCanvas");

let painting = false; /*painting은 기본적으로 false이지만
                    마우스를 클릭했을 때 true*/
function stopPainting(){
    painting = false;
}

function onMouseUp(event){
    stopPainting();
}
function onMouseDown(event){
    painting = true;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    console.log(x,y);
}

if(canvas){
    //canvas가 존재하는지 확인
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup",onMouseUp);
    canvas.addEventListener("mouseleave",stopPainting);
}