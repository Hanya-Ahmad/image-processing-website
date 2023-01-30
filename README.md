# Image Processing Website

## 1. Project Overview
### This project uses digital signal processing concepts to implement an image processing website that can either smooth or sharpen images using a low-pass or high-pass filter. This is accomplished by acquiring the phase from one image and the magnitude from a second image and combining them together accordingly. The user can choose certain parts of the image in the frequency domain using a cropper. This project also uses Flask Session and JavaScript LocalStorage to save the changes made by the user. 

![ezgif com-gif-maker](https://user-images.githubusercontent.com/93945902/215366760-3bb711ad-532c-4d88-8bab-0f71446f8075.gif)



## 2. How To Install and Run
1. Install the required python libraries
```
pip install library-name
```
2. Install the required JavaScript libraries
```
npm run library-name
```
3. Run the project
```
python main.py
```

## 3. Project Dependencies
  * Flask
  * Matplotlib
  * Numpy
  * OS
  * CV2
  * Cropper.js


## 4. Project Description
### The user can upload two images to the website and choose whether to acquire the phase or magnitude from one of the images, which automatically acquires the magnitude or phase from the other image, respectively. 
![Screenshot (157)](https://user-images.githubusercontent.com/93945902/210880819-35638743-7c25-4b6a-9828-ad7fdb7cd0ca.png)


### The user can toggle betweel low-pass and high-pass filtering modes (LP and HP) where LP smoothes the image while HP sharpens it. This effect can be seen more clearly when uploading two similar images as shown below.

![Screenshot (154)](https://user-images.githubusercontent.com/93945902/210882642-6717b388-99bf-46f6-9299-e92e6780bd31.png)
*Note that when moving the cropper towards the center of the phase plot, the resulting image starts getting blurry in LP mode*

![Screenshot (159)](https://user-images.githubusercontent.com/93945902/210883469-c3be55a6-b759-4ba7-9b63-574a8dfaf097.png)
*Note that when moving the cropper towards the center of the phase plot, the resulting image's contrast increases in HP mode*

## 5. Read more
### You can read more about images in frequency domain [here](https://sbme-tutorials.github.io/2018/cv/notes/3_week3.html "Images in Frequency Domain")


