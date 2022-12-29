import cv2
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image

def set_images(phase_path, magnitude_path):
    phase_image = phase_path
    magnitude_image = magnitude_path
    phase_image = cv2.imread(phase_image, 0)
    magnitude_image = cv2.imread(magnitude_image, 0)
    return phase_image, magnitude_image

# plt.figure(figsize=(10, 15))
# plt.subplot(121)
# plt.imshow(phase_image, cmap='gray')
# plt.subplot(122)
# plt.imshow(magnitude_image, cmap='gray')
# plt.show()
# print(phase_image)

def get_size_of_images(img):      
    # get width and height
    width = img.shape[1]
    height = img.shape[0]
    print ("the width is" , width)
    print ("the height is" , height)
    return width , height

def dimension_to_transform(img_1,img_2):
    width1 , height1  = get_size_of_images(img_1)
    width2 , height2  = get_size_of_images(img_2)
    if (width1 > width2):
        width = width2
    else:
        width = width1
    
    if (height1 > height2):
        height = height2
    else:
        height = height1

    return width , height

def resizing_image(img_1 , img_2):
    width , height = dimension_to_transform(img_1,img_2)
    print(width)
    print(height)
    img_1=cv2.resize(img_1 , (width,height))
    img_2=cv2.resize(img_2 , (width,height))
    return img_1 , img_2


phase_image,magnitude_image = set_images('./static/images/messi.jpg','./static/images/magnitude image.jpg')
phase_image_resized , magnitude_image_resized =resizing_image(phase_image,magnitude_image)
plt.figure(figsize=(10, 15))
plt.subplot(121)
plt.imshow(phase_image_resized, cmap='gray')
plt.subplot(122)
plt.imshow(magnitude_image_resized, cmap='gray')
plt.show()

 #------------------------ ALL OF THE ABOVE CODE IS IMPLEMENTED IN FLASK SERVER ------------------------#
 #------------------------ THE CODE BELOW IS STILL NOT IMPLEMENTED IN FLASK SERVER  ------------------------#


phase_image_fft = np.fft.fftshift(np.fft.fft2(phase_image_resized))
magnitude_image_fft = np.fft.fftshift(np.fft.fft2(magnitude_image_resized))

plt.figure(figsize=(10, 15))
plt.subplot(121)
plt.imshow(np.log(np.abs(phase_image_fft)), cmap='gray')
plt.subplot(122)
plt.imshow(np.log(np.abs(magnitude_image_fft)), cmap='gray')
plt.show()

phase_image_amplitude = np.sqrt(np.real(phase_image_fft) ** 2 + np.imag(phase_image_fft) ** 2)
phase_image_phase = np.arctan2(np.imag(phase_image_fft), np.real(phase_image_fft))
magnitude_image_amplitude = np.sqrt(np.real(magnitude_image_fft) ** 2 + np.imag(magnitude_image_fft) ** 2)
magnitude_image_phase = np.arctan2(np.imag(magnitude_image_fft), np.real(magnitude_image_fft))
plt.figure(figsize=(10, 15))
plt.subplot(121)
plt.imshow(np.log(phase_image_amplitude+1e-10), cmap='gray')
plt.subplot(122)
plt.imshow(phase_image_phase, cmap='gray')

plt.figure(figsize=(10, 15))
plt.subplot(121)
plt.imshow(np.log(magnitude_image_amplitude+1e-10), cmap='gray')
plt.subplot(122)
plt.imshow(magnitude_image_phase, cmap='gray')


# amplitude_phase
phase_image_magnitude_image_comb = np.multiply(phase_image_amplitude, np.exp(1j * magnitude_image_phase))
phase_image_magnitude_image = np.real(np.fft.ifft2(np.fft.ifftshift(phase_image_magnitude_image_comb)))  # drop imagniary as they are around 1e-14

magnitude_image_phase_image_comb = np.multiply(magnitude_image_amplitude, np.exp(1j * phase_image_phase))
magnitude_image_phase_image = np.real(np.fft.ifft2(np.fft.ifftshift(magnitude_image_phase_image_comb )))  # drop imagniary as they are around 1e-14

# combined image has values < 0 and > 1, needs to be scaled.
plt.figure(figsize=(10, 15))
plt.subplot(121)
plt.imshow(np.abs(phase_image_magnitude_image), cmap='gray')
plt.subplot(122)
plt.imshow(np.abs(magnitude_image_phase_image), cmap='gray')

print (phase_image_amplitude)
print(phase_image_amplitude.shape)
x, y = phase_image_amplitude.shape
print(x)
print(y)

for x in range (0, phase_image_phase.shape[0]):
    for y in range ( 0,phase_image_phase.shape[1]):
        if (x>=0 and x<=200) and(y >=0 and y <=200):
                phase_image_amplitude[x][y] =   1


for x in range (0, phase_image_phase.shape[0]):
    for y in range ( 0,phase_image_phase.shape[1]):
        if (x>=0 and x<=200) and(y >=0 and y <=200):
                phase_image_phase[x][y] =   0

print(phase_image_amplitude)
print(phase_image_phase)
plt.figure(figsize=(10, 15))
plt.subplot(121)
plt.imshow(np.log(phase_image_amplitude), cmap='gray')
plt.subplot(122)
plt.imshow(phase_image_phase, cmap='gray')

phase_image_magnitude_image_comb = np.multiply(magnitude_image_amplitude, np.exp(1j * phase_image_phase))
phase_image_magnitude_image = np.real(np.fft.ifft2(np.fft.ifftshift(phase_image_magnitude_image_comb)))  # drop imagniary as they are around 1e-14



# combined image has values < 0 and > 1, needs to be scaled.
plt.figure(figsize=(10, 15))
plt.subplot(121)
plt.imshow(phase_image_magnitude_image, cmap='gray')


plt.figure(figsize=(10, 15))
plt.subplot(122)
plt.imshow(phase_image, cmap='gray')
plt.show()



