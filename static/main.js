
let firstImageCropX;
let firstImageCropY;
let firstImageCropWidth;
let firstImageCropHeight;
let secondImageCropX;
let secondImageCropY;
let secondImageCropWidth;
let secondImageCropHeight;
const checkbox1 = document.getElementById("for_img_1");
const checkbox2 = document.getElementById("for_img_2");
const hpCheckbox = document.getElementById("for_output");
const firstImage = document.getElementById('phase_image');
const secondImage = document.getElementById('magnitude_image');
const output = document.getElementById('output');
let first_image_is_phase;
let hp_checked = 0;
var firstCropper = firstCrop();
var secondCropper = secondCrop();


function firstCrop(){
let firstCropper = new Cropper(firstImage, {
    url:firstImage.src,
    aspectRatio:0,
    zoomOnWheel: false,
    viewMode:3,
    guides: false,
    movable:false,
    center:false,
     crop(event){
        firstImageCropX = parseInt(event.detail.x);
        firstImageCropY = parseInt(event.detail.y);
        firstImageCropWidth = parseInt(event.detail.width);
        firstImageCropHeight = parseInt(event.detail.height);  
       
}, cropend(event){
sendData();


}});
return firstCropper;
}


function secondCrop(){
    let secondCropper = new Cropper(secondImage, {
        url:secondImage.src,
        aspectRatio:0,
        zoomOnWheel: false,
        viewMode:3,
        guides: false,
        movable:false,
        center:false,
         crop(event){
            secondImageCropX = parseInt(event.detail.x);
            secondImageCropY = parseInt(event.detail.y);
            secondImageCropWidth = parseInt(event.detail.width);
            secondImageCropHeight = parseInt(event.detail.height);  
           
    }, cropend(event){
    sendData();
    // updateData();

    }});
    return secondCropper;
    }


// Add a change event listener to each checkbox
checkbox1.addEventListener("change", function() {
    const random1 = new Date();
    if (checkbox1.checked) {
        checkbox2.checked = false;
        first_image_is_phase = 1;
    }
    else{
        checkbox2.checked = true;
        first_image_is_phase= 0;
    }
    fetch('http://127.0.0.1:5000/post', {
        method: 'POST',
        body: JSON.stringify({phaseBool:first_image_is_phase}),
        headers:{
          'Content-Type': 'application/json',
        'Accept': 'json, html'
    }}).then(() =>{
        updateData();
      }
    )
    // .then(setTimeout(()=>{window.location.reload();}, 1.5*1000));
    window.localStorage.setItem('first_image_is_phase', first_image_is_phase);
});

hpCheckbox.addEventListener("change", function(){
    const random = new Date();
    if (hpCheckbox.checked){
        hp_checked=1;
    }
    else{
        hp_checked=0;
    }
    fetch('http://127.0.0.1:5000/post', {
    method: 'POST',
    body: JSON.stringify({hpBool:hp_checked}),
    headers:{
    'Content-Type': 'application/json',
    'Accept': 'json, html'
}}).then(() =>{
    updateData();
  }
)
window.localStorage.setItem('hp_checked', hp_checked);
});


checkbox2.addEventListener("change", function() {
    if (checkbox2.checked) {
        checkbox1.checked = false;
        first_image_is_phase = 0;
    }
    else{
        checkbox1.checked = true; 
        first_image_is_phase = 1;
    }
    fetch('http://127.0.0.1:5000/post', {
        method: 'POST',
        body: JSON.stringify({phaseBool:first_image_is_phase}),
        headers:{
          'Content-Type': 'application/json',
        'Accept': 'json'
    }}).then(() =>{
        updateData();
      }
    )
    // .then(setTimeout(()=>{window.location.reload();}, 1.5*1000));
    window.localStorage.setItem('first_image_is_phase', first_image_is_phase);
});


function sendData(){
    let firstCropArray=[[(firstImageCropX) , (firstImageCropY) ],
    [(firstImageCropX), (firstImageCropY+firstImageCropHeight)],
    [(firstImageCropX+firstImageCropWidth) , (firstImageCropY) ],
    [(firstImageCropX+firstImageCropWidth), (firstImageCropY+firstImageCropHeight) ]
    ]
    let secondCropArray=[[secondImageCropX , secondImageCropY],
    [secondImageCropX , secondImageCropY+secondImageCropHeight],
    [secondImageCropX+secondImageCropWidth , secondImageCropY],
    [secondImageCropX+secondImageCropWidth , secondImageCropY+secondImageCropHeight]
    ]
    console.log(firstCropArray,secondCropArray)
fetch('http://127.0.0.1:5000/post', {
    method: 'POST',
    body: JSON.stringify({firstData:firstCropArray, secondData:secondCropArray}),
    headers:{
      'Content-Type': 'application/json',
    'Accept': 'json, html'

    }}).then(()=>{
        output.src="static/images/imag_final.jpg?"+ new Date().getMilliseconds();
    });
}

function updateData(){
    


    if (first_image_is_phase ==1 ){
        firstCropper.destroy();
        secondCropper.destroy();
        firstImage.src="static/images/_phase.jpg?"+new Date().getMilliseconds();
        secondImage.src="static/images/_mag.jpg?"+new Date().getMilliseconds();
   
        firstCropper = firstCrop();
        secondCropper = secondCrop();
    }
    else{
        firstCropper.destroy();
        secondCropper.destroy();
        firstImage.src="static/images/_mag.jpg?"+new Date().getMilliseconds();
        secondImage.src="static/images/_phase.jpg?"+new Date().getMilliseconds();
        firstCropper = firstCrop();
        secondCropper = secondCrop();

    }
    output.src="static/images/imag_final.jpg?"+ new Date().getMilliseconds();

}


window.addEventListener('load', function() {
    if (parseInt(window.localStorage.getItem('first_image_is_phase')) == 1){
    checkbox1.checked = true;
    checkbox2.checked = false;
    }
    else{
        checkbox1.checked = false;
        checkbox2.checked = true;
    }
    if (parseInt(window.localStorage.getItem('hp_checked')) == 1){
        hpCheckbox.checked = true;
    }
    else{
        hpCheckbox.checked = false;
    }
  });