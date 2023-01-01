
let firstImageCropX;
let firstImageCropY;
let firstImageCropWidth;
let firstImageCropHeight;
let secondImageCropX;
let secondImageCropY;
let secondImageCropWidth;
let secondImageCropHeight;


let checkbox1 = document.getElementById("for_img_1");
let checkbox2 = document.getElementById("for_img_2");

// Add a change event listener to each checkbox
checkbox1.addEventListener("change", function() {
    if (checkbox1.checked) {
        checkbox2.checked = false;
    }
    else{
        checkbox2.checked = true;
    }
});

checkbox2.addEventListener("change", function() {
    if (checkbox2.checked) {
        checkbox1.checked = false;
    }
    else{
        checkbox1.checked = true; 
    }
});

const firstImage = document.getElementById('first_image');
const secondImage = document.getElementById('second_image')
const firstCropper = new Cropper(firstImage, {
    aspectRatio:0,
    viewMode:3,
     crop(event){
        firstImageCropX = event.detail.x;
        firstImageCropY = event.detail.y;
        firstImageCropWidth = event.detail.width;
        firstImageCropHeight = event.detail.height;  
}});
const secondCropper = new Cropper(secondImage, {
    aspectRatio:0,
    viewMode:3,
     crop(event){
        secondImageCropX = event.detail.x;
        secondImageCropY = event.detail.y;
        secondImageCropWidth = event.detail.width;
        secondImageCropHeight = event.detail.height;  
}});

const cropPhaseImgBtn = document.getElementById('cropPhaseImgBtn');
const cropMagnitudeImgBtn = document.getElementById('cropMagnitudeImgBtn')

console.log("heree")
cropPhaseImgBtn.addEventListener('click',
function(){
    console.log(" FIRSTTT CLICKEDDD")
// let croppedFirstImage = firstCropper.getCroppedCanvas().toDataURL("image/png");
// document.getElementById('first_output').src = croppedFirstImage;


//top left point, bottom left point, top right point, bottom right point
let firstCropArray=[[firstImageCropX , firstImageCropY],
[firstImageCropX , firstImageCropY+firstImageCropHeight],
[firstImageCropX+firstImageCropWidth , firstImageCropY],
[firstImageCropX+firstImageCropWidth , firstImageCropY+firstImageCropHeight]
]

console.log(firstCropArray)
fetch('/', {
          method: 'POST',
          body: JSON.stringify({firstData:firstCropArray}),
          headers:{
            'Content-Type': 'application/json',
          'Accept': 'json'
      }}).then(function (response) {
        // responseClone = response.clone(); // 2
        return response.json();
    })

});




cropMagnitudeImgBtn.addEventListener('click',
function(){
    console.log("SECOND CLICKEDDD")
// let croppedSecondImage = secondCropper.getCroppedCanvas().toDataURL("image/png");
// document.getElementById('second_output').src = croppedSecondImage;



//top left point, bottom left point, top right point, bottom right point
let secondCropArray=[[secondImageCropX , secondImageCropY],
[secondImageCropX , secondImageCropY+secondImageCropHeight],
[secondImageCropX+secondImageCropWidth , secondImageCropY],
[secondImageCropX+secondImageCropWidth , secondImageCropY+secondImageCropHeight]
]

fetch('/', {
    method: 'POST',
    body: JSON.stringify({secondData:secondCropArray}),
    headers:{
      'Content-Type': 'application/json',
    'Accept': 'json'
}}).then(function (response) {

  return response.json();
})

});

