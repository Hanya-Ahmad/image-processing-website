
let phaseImageCropX;
let phaseImageCropY;
let phaseImageCropWidth;
let phaseImageCropHeight;
let magnitudeImageCropX;
let magnitudeImageCropY;
let magnitudeImageCropWidth;
let magnitudeImageCropHeight;

const phaseImage = document.getElementById('phase_img');
const magnitudeImage = document.getElementById('magnitude_img')
const phaseCropper = new Cropper(phaseImage, {
    aspectRatio:0,
    viewMode:3,
     crop(event){
        phaseImageCropX = event.detail.x;
        phaseImageCropY = event.detail.y;
        phaseImageCropWidth = event.detail.width;
        phaseImageCropHeight = event.detail.height;  
}});
const magnitudeCropper = new Cropper(magnitudeImage, {
    aspectRatio:0,
    viewMode:3,
     crop(event){
        magnitudeImageCropX = event.detail.x;
        magnitudeImageCropY = event.detail.y;
        magnitudeImageCropWidth = event.detail.width;
        magnitudeImageCropHeight = event.detail.height;  
}});

const cropPhaseImgBtn = document.getElementById('cropPhaseImgBtn');
const cropMagnitudeImgBtn = document.getElementById('cropMagnitudeImgBtn')


cropPhaseImgBtn.addEventListener('click',
function(){
let croppedPhaseImage = phaseCropper.getCroppedCanvas().toDataURL("image/png");
document.getElementById('phase_output').src = croppedPhaseImage;


//top left point, bottom left point, top right point, bottom right point
let phaseCropArray=[[phaseImageCropX , phaseImageCropY],
[phaseImageCropX , phaseImageCropY+phaseImageCropHeight],
[phaseImageCropX+phaseImageCropWidth , phaseImageCropY],
[phaseImageCropX+phaseImageCropWidth , phaseImageCropY+phaseImageCropHeight]
]

let formData=new FormData()
formData.append('data', phaseCropArray);
console.log(phaseCropArray)
fetch('/', {
          method: 'POST',
          body: JSON.stringify({'formData':formData}),
          contentType: "application/json",
          dataType: 'json'
      }).then(function (response) {
        responseClone = response.clone(); // 2
        return response.json();
    }).then(function (data) {
        // Do something with data
    }, function (rejectionReason) { // 3
        console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
        responseClone.text() // 5
        .then(function (bodyText) {
            console.log('Received the following instead of valid JSON:', bodyText); // 6
        });

});


})


cropMagnitudeImgBtn.addEventListener('click',
function(){
let croppedMagnitudeImage = magnitudeCropper.getCroppedCanvas().toDataURL("image/png");
document.getElementById('magnitude_output').src = croppedMagnitudeImage;

});
