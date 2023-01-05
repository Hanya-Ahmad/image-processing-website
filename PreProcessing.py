import cv2

# parent class
class ReadingImage:
    def __init__(self, image=None):
        self.__image = image

    def get_readed_image(self, image):
        if image is None:
            self.__image = cv2.imread("./static/images/image_rgb.png", cv2.IMREAD_GRAYSCALE)
        else:
            self.__image= cv2.imread(image, cv2.IMREAD_GRAYSCALE)
        return self.__image
        

# child class
class preprocessingImages(ReadingImage):

    def __init__(self, image_1=None, image_2=None) :
         self.image_1 = image_1
         self.image_2 = image_2


    
    def __get_size(image):
        width = image.shape[1]
        height = image.shape[0]
        print ("the width is" , width)
        print ("the height is" , height)
        return width , height

    @staticmethod
    def get_demension_ORI(image_1 , image_2):
        width_1 , height_1 = preprocessingImages.__get_size(image_1)
        width_2 , height_2 = preprocessingImages.__get_size(image_2)

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
        
        for_first = super().get_readed_image(self.image_1)
        for_second = super().get_readed_image(self.image_2)


        self.__width , self.__hieght =  preprocessingImages.get_demension_ORI(for_first,for_second )

        print(f'befor error{self.__width}')
        print(self.__hieght)

        preprocessingImages.__resizedImg_1 =cv2.resize(for_first, (self.__width , self.__hieght))
        preprocessingImages.__resizedImg_2 =cv2.resize(for_second , (self.__width , self.__hieght))
        print (f'after error {self.__width }')
        print (self.__hieght)



    def get_resized_image (self):
        return preprocessingImages.__resizedImg_1 , preprocessingImages.__resizedImg_2
    

