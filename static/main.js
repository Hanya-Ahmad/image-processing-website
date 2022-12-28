// let cropper;
// let imageFile;
// let base64ImageString;
// let cropX;
// let cropY;
// let cropWidth;
// let cropHeight;
// let imageField;

// enableImageOverlay();

// imageField = document.getElementById("phase_img");


// function enableImageOverlay(){
//     cropper = new Cropper(imageField,{
//         crop(event){
//             console.log("CROP START");
//             console.log("x:" + event.detail.x);
//             console.log("y:" + event.detail.y);
//             console.log("width:" + event.detail.width);
//             console.log("height:" + event.detail.height);
//             setImageCropProperties(image,
//                 event.detail.x,
//                 event.detail.y,
//                 event.detail.width,
//                 event.detail.height);
//         }
//     })
// 		let cropConfirm = document.getElementById("id_image_crop_confirm")
// 		cropConfirm.classList.remove("d-flex")
// 		cropConfirm.classList.remove("flex-row")
// 		cropConfirm.classList.remove("justify-content-between")
// 		cropConfirm.classList.add("d-none")

//         let confirm = document.getElementById("id_confirm")

// 			cropImage(
// 				imageFile, 
// 				cropX, 
// 				cropY, 
// 				cropWidth,
// 				cropHeight
// 			)
// 		}


// function isImageSizeValid(image){

//     // console.log(image)
//     let startIndex = image.indexOf("base64,") + 7;
//     let base64str = image.substr(startIndex);
//     let decoded = atob(base64str);
//     console.log("FileSize: " + decoded.length);
//     return base64str
// }

// function cropImage(image, x, y, width, height){
//     base64ImageString = isImageSizeValid(image);
//     if(base64ImageString != null){
//         var requestData = {
//             "csrfmiddlewaretoken": "{{ csrf_token }}",
//             "image": base64ImageString,
//             "cropX": cropX,
//             "cropY": cropY,
//             "cropWidth": cropWidth,
//             "cropHeight": cropHeight
//         }
//         console.log('testtttttttt')
//         fetch('http://127.0.0.1:5000/', {
//           method: 'POST',
//           headers: {"Content-Type": "application/json"},
//           dataType:'json',
//           data: requestData 

//       }).then(response => response.json()
//       ).then(json => {
//           console.log(json)
//       });
// }
// }

// function setImageCropProperties(image, x, y, width, height){
//  imageFile = image;
//  cropX = x;
//  cropY = y;
//  cropWidth = width;
//  cropHeight = height;
 
// }
let cropX;
let cropY;
let cropWidth;
let cropHeight;
const image = document.getElementById('phase_img');
const cropper = new Cropper(image, {
    aspectRatio:0,
    viewMode:3,
     crop(event){
                    // console.log("CROP START");
                    // console.log("x:" + event.detail.x);
                    // console.log("y:" + event.detail.y);
                    // console.log("width:" + event.detail.width);
                    // console.log("height:" + event.detail.height);
        cropX = event.detail.x;
        cropY = event.detail.y;
        cropWidth = event.detail.width;
        cropHeight = event.detail.height;  
}});
const cropBtn = document.getElementById('cropPhaseImgBtn');
cropBtn.addEventListener('click',
function(){
let croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");
document.getElementById('output').src = croppedImage;
console.log("x:" + cropX);
console.log("y:" + cropY);
console.log("width:" + cropWidth);
console.log("height:" + cropHeight);



});