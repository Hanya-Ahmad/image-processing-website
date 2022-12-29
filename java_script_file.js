var checkbox1 = document.getElementById("for_img_1");
var checkbox2 = document.getElementById("for_img_2");

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


const wrapper = document.querySelector(".wrapper");
const defaultBtn = document.querySelector("#default-btn");
const customBtn = document.querySelector("#custom-btn");
const cancelBtn = document.querySelector("#cancel-btn i");
const img = document.querySelector("img");
let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
function defaultBtnActive(){
    defaultBtn.click();
}
defaultBtn.addEventListener("change", function(){
    const file = this.files[0];
    if(file){
    const reader = new FileReader();
    reader.onload = function(){
        const result = reader.result;
        img.src = result;
        wrapper.classList.add("active");
    }
    cancelBtn.addEventListener("click", function(){
        img.src = "";
        wrapper.classList.remove("active");
    })
    reader.readAsDataURL(file);
    }
    if(this.value){
    let valueStore = this.value.match(regExp);
    }
});


const wrapper_second = document.querySelector("#second_wrapper");
const defaultBtn_second = document.querySelector(".default_btn_class");
const customBtn_second = document.querySelector(".custom_btn_second");
const cancelBtn_second = document.querySelector(".second_cancel i");
const img_second = document.querySelector("#second_image");
let regExp_second = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

function defaultBtnSecondActive(){
    defaultBtn_second.click();
}
defaultBtn_second.addEventListener("change", function(){
    const file = this.files[0];
    if(file){
    const reader_second = new FileReader();
    reader_second.onload = function(){
        const result_second = reader_second.result;
        img_second.src = result_second;
        wrapper_second.classList.add("active");
    }
    cancelBtn_second.addEventListener("click", function(){
        img_second.src = "";
        wrapper_second.classList.remove("active");
    })
    reader_second.readAsDataURL(file);
    }
    if(this.value){
    let valueStore = this.value.match(regExp_second);
    }
});
