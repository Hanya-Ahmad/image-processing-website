import cv2
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image



# parent class
class ReadingImage:
    def __init__(self, image_1=None, image_2=None) -> None:
        self.__image_1 = image_1
        self.__image_2 = image_2

    def get_readed_first_image(self):
        self.__image_1 = cv2.imread(self.__image_1, 0)        
        return self.__image_1


    def get_readed_second_image(self):
        if self.__image_2 is None:
            self.__image_2 = cv2.imread("static/images/image_rgb.png", 0)
        else:
            self.__image_2= cv2.imread(self.__image_2, 0)
        return self.__image_2


        

# child class
class preprocessingImages(ReadingImage):


    def __init__(self, image_1=None, image_2=None) :
        super().__init__(image_1,image_2)


    
    @staticmethod
    def get_size(image):
        width = image.shape[1]
        height = image.shape[0]
        print ("the width is" , width)
        print ("the height is" , height)
        return width , height

    @staticmethod
    def get_demension_ORI(image_1 , image_2):
        width_1 , height_1 = preprocessingImages.get_size(image_1)
        width_2 , height_2 = preprocessingImages.get_size(image_2)

        if (width_1 > width_2):
            width = width_2
        else:
            width = width_1
        
        if (height_1 > height_2):
            height = height_2
        else:
            height = height_1

        return width , height

    def resizedImage(self):
        x = super().get_readed_first_image ()
        y = super().get_readed_second_image()


        self.__width , self.__hieght =  preprocessingImages.get_demension_ORI(x
                                                                ,y )

        print(f'befor error{self.__width}')
        print(self.__hieght)
        print (x)

        preprocessingImages.__resizedImg_1 =cv2.resize(x, (self.__width , self.__hieght))
        preprocessingImages.__resizedImg_2 =cv2.resize(y , (self.__width , self.__hieght))
        print (f'after error {self.__width }')
        print (self.__hieght)


    def get_readed_first_image (self):
        return preprocessingImages.__resizedImg_1
    
    def get_readed_second_image (self):
        return preprocessingImages.__resizedImg_2
    

