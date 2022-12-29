from flask import Flask, render_template,request, json
import os
# import functions as fn
app = Flask(__name__)
UPLOAD_FOLDER = "./static/images"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
@app.route("/",methods=['GET', 'POST'])
def index():

    if request.method == 'POST':
        print(request.get_data())
        if 'file2' in request.files and 'file1' in request.files:
            # print(request.headers) 
            file1 = request.files['file1']
            first_path = os.path.join(app.config['UPLOAD_FOLDER'], file1.filename)
            file1.save(first_path)
            file2 = request.files['file2']
            second_path = os.path.join(app.config['UPLOAD_FOLDER'], file2.filename)
            file2.save(second_path)
            # phase_image,magnitude_image = fn.set_images(first_path,second_path)
            # phase_image_resized , magnitude_image_resized = fn.resizing_image(phase_image,magnitude_image)
            return render_template('index.html',path_to_first_pic=file1.filename, path_to_second_pic=file2.filename)
            
        else:
            return render_template('index.html', path_to_first_pic="messi.jpg", path_to_second_pic="My project.jpg")
    else:
        return render_template('index.html', path_to_first_pic="messi.jpg", path_to_second_pic="My project.jpg")
if __name__ == '__main__':        

    app.run(debug=True)