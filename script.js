var drawingBolck=document.querySelector(".drawing");
var speed=document.querySelectorAll(".controls .speed button");
var sortType=document.querySelectorAll(".sort-types button");
var canavs=document.querySelector('.our-canvas'),
  theContext=canavs.getContext('2d');
  var delay=1000;

//create gradient

var thegradient=theContext.createLinearGradient(100,0,0,0);
var canavsW=canavs.width=window.innerWidth;
var canvasH=canavs.height;

//create array with random numbers
var arr=new Array();
//generate random number
for(var i=0;i<30;i++){
  arr.push(Math.floor(Math.random()*37+3));
}

//speed animation buttons
for(var y=0;y<speed.length;y++){
  speed[y].onclick=function(){
       delay=delay/(this.firstElementChild.textContent);
  }
}
//select sorting algorithem
for(var y=0;y<sortType.length;y++){
  sortType[y].onclick=function(){
      if(this.className=="selection"){
         selectionSort(arr,arr.length);
      }
      else if(this.className=="bubble"){
        bubbleSort(arr,arr.length);
      }
  }
}

// firstly draw the array
draw(arr);

/*
const promise=new Promise((resolve,reject)=>{
  let connect=true;
  if(connect){
    resolve("connection yeah");
  }else{

    reject(Error("not connected"));
  }
});
promise.then(
  (resolved)=>console.log(resolved),
  (rejected)=>console.log(rejected)
);
*/

//sleep function
 function sleep(ms) {
  return new Promise(resolve =>setTimeout(resolve,ms));	
   }

//clear all drawing
function clear(arr){
  var colW=25;
  for(var i=0;i<arr.length;i++){
    var scaleH=(arr[i]*10);
    theContext.clearRect(i*30,canvasH-scaleH,colW,scaleH);
  }
  }
 
  //clear speciefic position
  function clearIndex(arr,index){
    var colW=25;
    var scaleH=(arr[index]*10);
    theContext.clearRect(index*30+60,canvasH-scaleH,colW,scaleH);
  }

  //darw specific position
   function drawIndex(arr,index,color){
    var colW=25;
    var scaleH=(arr[index]*10);
    theContext.fillStyle=color;
    theContext.fillRect(index*30+60,canvasH-scaleH,colW,scaleH);
    theContext.fillStyle="red";
    theContext.font="20px Tahmoa";
    theContext.fillText(arr[index],index*30+65,canvasH-10);
  } 
  ///darw function
function draw(arr){
var colW=25;
for(var i=0;i<arr.length;i++){
  var scaleH=(arr[i]*10);
  theContext.fillStyle="green";
  theContext.fillRect(i*30+60,canvasH-scaleH,colW,scaleH);
  theContext.fillStyle="red";
  theContext.font="20px Tahmoa";
  theContext.fillText(arr[i],i*30+60,canvasH-10);
}
}

//swap tow elements in array
function swap(arr,xp, yp)
{
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}
 
//selection sort function
async function selectionSort(arr,  n)
{
    var i, j, min_idx;
 
    // One by one move boundary of unsorted subarray
    for (i = 0; i < n-1; i++)
    {
        // Find the minimum element in unsorted array
        min_idx = i;
        for (j = i + 1; j < n; j++){
               await drawIndex(arr,j,"skyblue");
               await sleep(delay/10);
               await drawIndex(arr,j,"green");
          if (arr[j] < arr[min_idx]){
              min_idx = j;
          }
             
        }
        
        await drawIndex(arr,i,"black");//clear last array here
        await drawIndex(arr,min_idx,"black");
        await sleep(delay);
        clearIndex(arr,i);
        clearIndex(arr,min_idx);
        // Swap the found minimum element with the first element
         swap(arr,min_idx, i);
        await drawIndex(arr,i,"green");
        await drawIndex(arr,min_idx,"green");
        await sleep(delay/10);
        drawIndex(arr,i,"gray");
        }
        drawIndex(arr,arr.length-1,"gray");
        // drawIndex(arr)//redraw new Array
    }

    //bubble sort**************************************************************************** 
async function bubbleSort( arr, n){
var i, j;
for (i = 0; i < n-1; i++){ 
    for (j = 0; j < n-i-1; j++)
    {
        if (arr[j] > arr[j+1])
        {
        await drawIndex(arr,j,"black");
        await drawIndex(arr,j+1,"black");
        await sleep(delay);
        await clearIndex(arr,j);
        await clearIndex(arr,j+1);
        swap(arr,j,j+1);
        await drawIndex(arr,j,"green");
        await drawIndex(arr,j+1,"green");
        await sleep(delay/10);
        }
    }
    await drawIndex(arr,j,"gray");
 
}
drawIndex(arr,0,"gray");
}

/// insertion sort *****************************************************************************************
async function insertionSort(arr, n) { 
    let i, key, j; 
    for (i = 1; i < n; i++){ 
        key = arr[i]; 
        j = i - 1; 
   
        /* Move elements of arr[0..i-1], that are 
        greater than key, to one position ahead 
        of their current position */
        await drawIndex(arr,i,"gold");
        await sleep(delay/10);
        while (j >= 0 && arr[j] > key){ 

            await clearIndex(arr,j+1);

            arr[j + 1] = arr[j];  

            await drawIndex(arr,j+1,"black");
            await sleep(delay/10);
            drawIndex(arr,j+1,"green");
            j = j - 1;
        } 
        await clearIndex(arr,j+1);
        arr[j + 1] = key; 
        await drawIndex(arr,j+1,"green");
    } 
    ///mark all index as sorted
    for(var x=0;x<arr.length;x++)
      drawIndex(arr,x,"gray");

} 
