import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from flask import Flask, render_template,request, json, redirect
import os
from PreProcessing import preprocessingImages
from processing import Processing
from After_Processing import After_Processing

import functions as fn
app = Flask(__name__)

UPLOAD_FOLDER = "./static/images"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

@app.route("/",methods=['GET','POST'])
def index():
    return render_template('index.html',path_to_first_pic="./static/images/image_rgb.jpeg",path_to_second_pic="./static/images/image_rgb.jpeg", output_image= "./static/images/image_rgb.jpeg")

global_first_path="./static/images/palmtunnel.jpg"
global_second_path = "./static/images/palmtunnel.jpg"
global_final_first_crop_array = [[0,0],[100,100]]
global_final_second_crop_array = [[0,0],[100,100]]

first_crop_array=[]
@app.route("/post",methods=['GET', 'POST'])
def post():

    global global_first_path
    global global_second_path
    global global_final_first_crop_array
    global first_crop_array
    global global_final_second_crop_array
    if request.method == 'POST':
        if 'file1' in request.files:
            file1 = request.files['file1']
            first_path = os.path.join(app.config['UPLOAD_FOLDER'], file1.filename)
            file1.save(first_path)
            global_first_path = first_path
        else:
            first_path = global_first_path
        if 'file2' in request.files:
            file2 = request.files['file2']
            second_path = os.path.join(app.config['UPLOAD_FOLDER'], file2.filename)
            file2.save(second_path)
            global_second_path = second_path

        else:
            second_path = global_second_path

        try:
            first_image_is_phase = request.get_json("first_image_is_phase")
            first_image_is_phase= first_image_is_phase['first_image_is_phase']
            print(first_image_is_phase, "first_image_is_phase")
             #top left , bottom right
            firstData = request.get_json("firstData")
            first_crop_array = firstData['firstData']
            final_first_crop_array = [first_crop_array[0], first_crop_array[3]]
            global_final_first_crop_array = final_first_crop_array
            secondData = request.get_json("secondData")
            second_crop_array = secondData['secondData']
            final_second_crop_array = [second_crop_array[0], second_crop_array[3]]
            global_final_second_crop_array = final_second_crop_array
            print("first crop", global_final_first_crop_array)
            print("second crop",global_final_second_crop_array)

        except:
            print("first except")
            pass
        images = preprocessingImages(global_first_path, global_second_path)
        # images_before_resize = preprocessingImages(global_first_path,global_second_path)
        images.resizedImage()
        image1 , image2 = images.get_resized_image()
        img1 = Processing(image1 , global_final_first_crop_array , 1 , 1)
        img2 = Processing(image2 , global_final_second_crop_array  , 0 , 1)
        path , data1 = img1.Edit_Signal()
        path_2 , data2 = img2.Edit_Signal()

        final =After_Processing(data1 , data2 , 1).Inverse_Fourier_Transform()
        plt.imsave("static\images\imag_final.jpg" , final , cmap = 'gray')
        return render_template('index.html',path_to_first_pic=path, path_to_second_pic=path_2,first_crop_array=first_crop_array, output_image=".\static\images\imag_final.jpg")
    else:
        return redirect("http://127.0.0.1:5000/")

if __name__ == '__main__':        

    app.run(debug=True)