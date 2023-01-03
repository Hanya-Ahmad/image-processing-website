import cv2
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image

class After_Processing():
    def __init__(self , Arr_1 ,Arr_2 , mode) :
        self.Arr_1 = Arr_1
        self.Arr_2 = Arr_2
        self.mode = mode

    def __compination(self):

        if  self.mode:
            compined_images = np.multiply( self.Arr_2, np.exp(1j *  self.Arr_1))
        
        else:
            compined_images = np.multiply( self.Arr_1, np.exp(1j *  self.Arr_2))

        return compined_images
    
    def Inverse_Fourier_Transform (self):
        image_compined = np.abs(np.fft.ifft2(np.fft.ifftshift(After_Processing.__compination(self))))
        return image_compined
        