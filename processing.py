import cv2
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image




class Processing:
    def __init__(self , img , cropping_dimentions , mode , high_pass_bool) :
        self.img = img
        self.cropping_dimentions = cropping_dimentions
        self.mode = mode
        self.high_pass_bool = high_pass_bool

    def __fourier_transform (self):
        img_fft = np.fft.fftshift(np.fft.fft2(self.img)) 

        return img_fft

    
    def __get_magnitude(self):

        self.__magnitude = np.sqrt(np.real(Processing.__fourier_transform(self)) ** 2 +
                                             np.imag(Processing.__fourier_transform(self)) ** 2)

        path  = ("./static/images/_mag.jpg")
        plt.imsave(path ,np.log(self.__magnitude+1e-10), cmap='gray')
        
        return  path , self.__magnitude


    def __get_phase (self):
        self.__phase = np.arctan2(np.imag(Processing.__fourier_transform(self)), 
                                            np.real(Processing.__fourier_transform(self)))
        

        path  = ("./static/images/_phase.jpg")
        plt.imsave(path ,self.__phase, cmap='gray')

        return  path , self.__phase



    def Edit_Signal (self):
        if  self.mode == 1:
            value = 0
            path , signal_Edit  = Processing.__get_phase(self)

        else:
            value = 1
            path , signal_Edit= Processing.__get_magnitude(self)

        if self.high_pass_bool: 
            for x in range (0, signal_Edit.shape[0]):
                for y in range ( 0,signal_Edit.shape[1]):
                    if (x>=self.cropping_dimentions[0][0] and x<=self.cropping_dimentions[1][0]) and(y >=self.cropping_dimentions[0][1] and y <=self.cropping_dimentions[1][1]):
                            signal_Edit[x][y] =    value

        else:
            for x in range (0, signal_Edit.shape[0]):
                for y in range ( 0,signal_Edit.shape[1]):
                    if (x>=self.cropping_dimentions[0][0] and x<=self.cropping_dimentions[1][0]) and (y >=self.cropping_dimentions[0][1] and y <=self.cropping_dimentions[1][1]):
                            signal_Edit[x][y] =    signal_Edit[x][y]
                    else :
                        signal_Edit[x][y] =   value
                
        return path , signal_Edit

    
    # @staticmethod
    # def inverse_Fourier_Transform(image_compined):
    #     image_compined = np.abs(np.fft.ifft2(np.fft.ifftshift(image_compined)))
    #     return image_compined


    
        
       