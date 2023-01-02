from PreProcessing import preprocessingImages
from processing import Processing
import matplotlib.pyplot as plt



def ploting(image , second_image):
    plt.figure(figsize=(10, 15))
    plt.subplot(121)
    plt.imshow(image, cmap='gray')
    plt.subplot(122)
    plt.imshow(second_image, cmap='gray')
    plt.show()

def plot2(img):
    plt.figure(figsize=(10, 15))
    plt.imshow(img, cmap='gray')
    plt.show()

img1 = preprocessingImages (r"static\images\phase image.jpg" , r"static\images\messi.jpg")

img1.resizedImage()
img_resized = img1.get_readed_first_image()
img2_resized = img1.get_readed_second_image()

ploting(img_resized ,img2_resized)


final_data_1 = Processing(img_resized , [[150,200] ,[250 , 420] ] )

# final_data_2 = Processing(img_resized , [[150,150] ,[250 , 300] ] )

mag_1=final_data_1.get_magnitude()

phase_1=final_data_1.get_phase()

# mag_2 =final_data_2.get_magnitude()
# phase_2 = final_data_2.get_phase()

# x=final_data_2.Edit_Signal(mag_2 , 1)
# y=final_data_1.Edit_Signal(phase_1, 0)

z=Processing.compination(mag_1,phase_1 )

iz = Processing.inverse_Fourier_Transform(z)
plot2(iz)
