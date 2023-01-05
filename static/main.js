
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
let hpCheckbox = document.getElementById("for_output");
let first_image_is_phase;
let hp_checked = 0;
// Add a change event listener to each checkbox
checkbox1.addEventListener("change", function() {
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
    }}).then(response => response.json()
    ).then(json => {
        console.log(json)
    }).then(setTimeout(()=>{window.location.reload();}, 1*1000));
});
hpCheckbox.addEventListener("change", function(){
    if (hpCheckbox.checked){
        hp_checked=1;
    }
    fetch('http://127.0.0.1:5000/post', {
    method: 'POST',
    body: JSON.stringify({hpBool:hp_checked}),
    headers:{
      'Content-Type': 'application/json',
    'Accept': 'json, html'
}}).then(response => response.json()
).then(json => {
    console.log(json)
}).then(setTimeout(()=>{window.location.reload();}, 1*1000));

});

// fetch('http://127.0.0.1:5000/post', {
//     method: 'POST',
//     body: JSON.stringify({first_image_is_phase:first_image_is_phase}),
//     headers:{
//       'Content-Type': 'application/json',
//     'Accept': 'json'
// }}).then(function (response) {
//   // responseClone = response.clone(); // 2

//   return response.json();
// }).then(function(){console.log(first_image_is_phase)})

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
    }}).then(response => response.json()
    ).then(json => {
        console.log(json)
    }).then(setTimeout(()=>{window.location.reload();}, 1*1000));

});

const firstImage = document.getElementById('phase_image');
const secondImage = document.getElementById('magnitude_image')
const firstCropper = new Cropper(firstImage, {
    aspectRatio:0,
    zoomOnWheel: false,
    viewMode:3,
    guides: false,
    movable:false,
     crop(event){
        firstImageCropX = parseInt(event.detail.x);
        firstImageCropY = parseInt(event.detail.y);
        firstImageCropWidth = parseInt(event.detail.width);
        firstImageCropHeight = parseInt(event.detail.height);  
       
}, cropend(event){
    console.log("first cropper ended")

sendData()
}});
const secondCropper = new Cropper(secondImage, {
    aspectRatio:0,
    zoomOnWheel: false,
    viewMode:3,
    guides: false,
    movable:false,
     crop(event){
        secondImageCropX = parseInt(event.detail.x);
        secondImageCropY = parseInt(event.detail.y);
        secondImageCropWidth = parseInt(event.detail.width);
        secondImageCropHeight = parseInt(event.detail.height);  
       
}, cropend(event){
    console.log("second cropper ended")
    sendData()
}});


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
}}).then(response => response.json()
).then(json => {
    console.log(json)
}).then(setTimeout(()=>{window.location.reload();}, 1*1000));
}
const cropPhaseImgBtn = document.getElementById('cropPhaseImgBtn');
const cropMagnitudeImgBtn = document.getElementById('cropMagnitudeImgBtn')

// console.log("heree")
// cropPhaseImgBtn.addEventListener('click',
// function(){
//     console.log(" FIRSTTT CLICKEDDD")
// // let croppedFirstImage = firstCropper.getCroppedCanvas().toDataURL("image/png");
// // document.getElementById('first_output').src = croppedFirstImage;


// //top left point, bottom left point, top right point, bottom right point
// let firstCropArray=[[(firstImageCropX)*3/16 , (firstImageCropY)*3/16 ],
// [(firstImageCropX) *3/16 , (firstImageCropY+firstImageCropHeight)*3/16 ],
// [(firstImageCropX+firstImageCropWidth)*3/16  , (firstImageCropY)*3/16 ],
// [(firstImageCropX+firstImageCropWidth)*3/16  , (firstImageCropY+firstImageCropHeight)*3/16 ]
// ]

// console.log(firstCropArray)
// fetch('/', {
//           method: 'POST',
//           body: JSON.stringify({firstData:firstCropArray}),
//           headers:{
//             'Content-Type': 'application/json',
//           'Accept': 'json'
//       }}).then(function (response) {
//         // responseClone = response.clone(); // 2
//         return response.json();
//     })

// });




// cropMagnitudeImgBtn.addEventListener('click',
// function(){
//     console.log("SECOND CLICKEDDD")
// // let croppedSecondImage = secondCropper.getCroppedCanvas().toDataURL("image/png");
// // document.getElementById('second_output').src = croppedSecondImage;



// //top left point, bottom left point, top right point, bottom right point
// let secondCropArray=[[secondImageCropX , secondImageCropY],
// [secondImageCropX , secondImageCropY+secondImageCropHeight],
// [secondImageCropX+secondImageCropWidth , secondImageCropY],
// [secondImageCropX+secondImageCropWidth , secondImageCropY+secondImageCropHeight]
// ]

// fetch('/', {
//     method: 'POST',
//     body: JSON.stringify({secondData:secondCropArray}),
//     headers:{
//       'Content-Type': 'application/json',
//     'Accept': 'json'
// }}).then(function (response) {

//   return response.json();
// })

// });
