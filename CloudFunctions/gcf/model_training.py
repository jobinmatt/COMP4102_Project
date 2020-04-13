import numpy as np
from matplotlib import pyplot as plt
import cv2
from keras.models import Sequential
from keras.layers.normalization import BatchNormalization
from keras.layers.convolutional import Conv2D
from keras.layers.core import Activation
from keras.layers.core import Flatten
from keras.layers.core import Dropout
from keras.layers.core import Dense
from keras.layers import MaxPool2D
from keras.utils import to_categorical
from keras.optimizers import Adam, SGD
import scipy.io as sio
"""
Desc: This is the the CNN classifier model training environemt. It is VGG-16 Net Architecture. 
We were unable to use this due to lack computational capacity.  
"""
mat_contents = sio.loadmat("../train_32x32.mat") # can get trainning data from http://ufldl.stanford.edu/housenumbers/
classes = 11
mat_test = sio.loadmat("../test_32x32.mat") # testing data from http://ufldl.stanford.edu/housenumbers/
X_train = mat_contents["X"]
X_train = X_train.reshape(X_train.shape[3], X_train.shape[0], X_train.shape[1], X_train.shape[2])
X_train_grayscale = np.zeros(X_train.shape[:-1])
for i in range(X_train.shape[0]): 
    X_train_grayscale[i] = cv2.cvtColor(X_train[i], cv2.COLOR_BGR2GRAY)
X_train = X_train_grayscale
X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], X_train.shape[2], 1)
print(X_train.shape)
y_train = mat_contents['y']
y_train = to_categorical(y_train,11)
# y_train = y_train.reshape(y_train.shape[3], y_train.shape[2], y_train.shape[0], y_train.shape[1])
 
 
X_test = mat_test["X"]
X_test = X_test.reshape(X_test.shape[3], X_test.shape[0], X_test.shape[1], X_test.shape[2])
X_test_grayscale = np.zeros(X_test.shape[:-1])
for i in range(X_test.shape[0]): 
    X_test_grayscale[i] = cv2.cvtColor(X_test[i], cv2.COLOR_BGR2GRAY)
X_test = X_test_grayscale
X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], X_test.shape[2], 1)
y_test =  mat_test['y']
y_test = to_categorical(y_test,11)
# print(X_train.shape, X_test.shape)

 
# classes = to_categorical(classes, num_classes=None, dtype='float32')
model = Sequential()
chanDim = 1
inputShape = (32, 32, 1)
model.add(Conv2D(input_shape=inputShape,filters=64,kernel_size=(3,3),padding="same", activation="relu"))
model.add(Conv2D(filters=64,kernel_size=(3,3),padding="same", activation="relu"))
model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))
model.add(Conv2D(filters=128, kernel_size=(3,3), padding="same", activation="relu"))
model.add(Conv2D(filters=128, kernel_size=(3,3), padding="same", activation="relu"))
model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))
model.add(Conv2D(filters=256, kernel_size=(3,3), padding="same", activation="relu"))
model.add(Conv2D(filters=256, kernel_size=(3,3), padding="same", activation="relu"))
model.add(Conv2D(filters=256, kernel_size=(3,3), padding="same", activation="relu"))
model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))
model.add(Conv2D(filters=512, kernel_size=(3,3), padding="same", activation="relu"))
model.add(Conv2D(filters=512, kernel_size=(3,3), padding="same", activation="relu"))
model.add(Conv2D(filters=512, kernel_size=(3,3), padding="same", activation="relu"))
model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))
model.add(Conv2D(filters=512, kernel_size=(3,3), padding="same", activation="relu"))
model.add(Conv2D(filters=512, kernel_size=(3,3), padding="same", activation="relu"))
model.add(Conv2D(filters=512, kernel_size=(3,3), padding="same", activation="relu"))
model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))
model.add(Flatten())
model.add(Dense(units=4096,activation="relu"))
model.add(Dense(units=4096,activation="relu"))
model.add(Dense(units=11, activation="softmax"))
 
EPOCHS = 100
INIT_LR = 1e-3
BS = 8
 
# opt = Adam(lr=INIT_LR, decay=INIT_LR / EPOCHS)
# sgd = SGD(lr=0.05, clipnorm=1.)
opt = Adam(lr=0.001)
model.compile(loss="categorical_crossentropy", optimizer=opt,metrics=["accuracy"])
 
history = model.fit(X_train, y_train,batch_size=BS,epochs=EPOCHS)
 
# Evaluate the model on the test data using `evaluate`
print('\n# Evaluate on test data')
results = model.evaluate(X_test, y_test, batch_size=BS)
print('test loss, test acc:', results)
 
# Generate predictions (probabilities -- the output of the last layer)
# on new data using `predict`
print('\n# Generate predictions for 3 samples')
predictions = model.predict(X_test[:3])
print('predictions shape:', predictions.shape)
model.save("SudokuModel")

