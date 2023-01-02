import cv2
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image



class Processing:
    def __init__(self , img , cropping_dimentions) -> None:
        self.__img = img
        self.__cropping_dimentions = cropping_dimentions

    def fourier_transform (self):
        img_fft = np.fft.fftshift(np.fft.fft2(self.__img)) 

        return img_fft

    
    def get_magnitude(self):

        self.__magnitude = np.sqrt(np.real(self.fourier_transform()) ** 2 +
                                             np.imag(self.fourier_transform()) ** 2)
        

        self.__magnitude  = self.Edit_Signal (self.__magnitude , 1)
        
        return self.__magnitude

    def get_phase (self):
        self.__phase = np.arctan2(np.imag(self.fourier_transform()), 
                                            np.real(self.fourier_transform()))

        self.__phase = self.Edit_Signal (self.__phase , 0)

        return self.__phase


    def Edit_Signal (self,signal_Edit , type_of_signal):
        if type_of_signal == 0:
            value = 0
        else:
            value = 1
        
        for x in range (0, signal_Edit.shape[0]):
            for y in range ( 0,signal_Edit.shape[1]):
                if (x>=self.__cropping_dimentions[0][0] and x<=self.__cropping_dimentions[0][1]) and (y >=self.__cropping_dimentions[1][0] and y <=self.__cropping_dimentions[1][1]):
                        signal_Edit[x][y] =    signal_Edit[x][y]
                else :
                    signal_Edit[x][y] =   value
                
        return signal_Edit


    @staticmethod
    def compination (magnitude , phase ,status=0):

        compined_image = np.multiply(magnitude, np.exp(1j * phase))
        return compined_image
    
    @staticmethod
    def inverse_Fourier_Transform(image_compined):
        image_compined = np.abs(np.fft.ifft2(np.fft.ifftshift(image_compined)))
        return image_compined

    
        
       