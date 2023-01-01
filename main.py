from flask import Flask, render_template,request, json
import os
import numpy as np
# import functions as fn
app = Flask(__name__)

UPLOAD_FOLDER = ".\static\images"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
@app.route("/",methods=['GET', 'POST'])
def index():
    global_first_path = "..\static\images\santamonica.jpg"
    global_second_path = "..\static\images\messi.jpg"
    print("methodddddd: ",request.method)
    first_crop_array=[]
    print("globalssss",global_first_path,global_second_path)

    if request.method == 'POST':
        try:
            firstData = request.get_json("firstData")
            first_crop_array = firstData['firstData']
            # saved_array = first_crop_array
            print("firstcroparrayyyyy",first_crop_array)
        except:
            pass
        try:
            secondData = request.get_json("secondData")
            second_crop_array = secondData['secondData']
            # saved_array = first_crop_array
            print("secondcroparrayyyyy",second_crop_array)
        except:
            pass
        if 'file1' in request.files:
            file1 = request.files['file1']
            print("FILLELEEEEEE",file1)

            first_path = os.path.join(app.config['UPLOAD_FOLDER'], file1.filename)
            file1.save(first_path)
            global_first_path = first_path
        else:
            first_path = global_first_path
        if 'file2' in request.files:
            file2 = request.files['file2']
            second_path = os.path.join(app.config['UPLOAD_FOLDER'], file2.filename)
            file2.save(second_path)
            # first_image,second_image = fn.set_images(first_path,second_path)
            # first_image_resized , second_image_resized = fn.resizing_image(first_image,second_image)
            # formData = request.get_json("formData")
            # print(formData)
            global_second_path = second_path
        else:
            second_path = global_second_path
        return render_template('index.html',path_to_first_pic=first_path, path_to_second_pic=second_path,first_crop_array=first_crop_array)
            
    else:
        # print("globalssss",global_first_path,global_second_path)
        first_crop_array = []  
        first_path = global_first_path
        second_path = global_second_path

        return render_template('index.html', path_to_first_pic=first_path, path_to_second_pic=second_path,first_crop_array=first_crop_array)
    
if __name__ == '__main__':        

    app.run(debug=True)