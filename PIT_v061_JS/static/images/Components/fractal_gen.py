#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Feb  4 16:01:42 2019

@author: vman
"""

''' Code from: 
https://www.ibm.com/developerworks/community/blogs/jfp/entry/My_Christmas_Gift?lang=en
'''


import numpy as np
from numba import jit

@jit
def mandelbrot(z,maxiter,horizon,log_horizon):
    c = z
    for n in range(maxiter):
        az = abs(z)
        if az > horizon:
            return n - np.log(np.log(az))/np.log(2) + log_horizon
        z = z*z + c
    return 0

@jit
def mandelbrot_set(xmin,xmax,ymin,ymax,width,height,maxiter):
    horizon = 2.0 ** 40
    log_horizon = np.log(np.log(horizon))/np.log(2)
    r1 = np.linspace(xmin, xmax, width)
    r2 = np.linspace(ymin, ymax, height)
    n3 = np.empty((width,height))
    for i in range(width):
        for j in range(height):
            n3[i,j] = mandelbrot(r1[i] + 1j*r2[j],maxiter,horizon, log_horizon)
    return (r1,r2,n3)


from matplotlib import pyplot as plt
from matplotlib import colors
%matplotlib inline

def mandelbrot_image(xmin,xmax,ymin,ymax,width=10,height=10,\
                     maxiter=1024,cmap='jet',gamma=.3):
    dpi = 72
    img_width = dpi * width
    img_height = dpi * height
    x,y,z = mandelbrot_set(xmin,xmax,ymin,ymax,img_width,img_height,maxiter)
    
    fig, ax = plt.subplots(figsize=(width, height),dpi=72)
    ticks = np.arange(0,img_width,3*dpi)
    x_ticks = xmin + (xmax-xmin)*ticks/img_width
    plt.xticks(ticks, x_ticks)
    y_ticks = ymin + (ymax-ymin)*ticks/img_width
    plt.yticks(ticks, y_ticks)
    ax.set_title(cmap)
    plt.axis('off')
    
    norm = colors.PowerNorm(gamma)
    ax.imshow(z.T,cmap=cmap,origin='lower',norm=norm)  
    save_image(fig)
    
image_counter = 30 
def save_image(fig):
    global image_counter
    filename = "mandelbrodt_%d.png" % image_counter
    image_counter += 1
    fig.savefig(filename)
    

mandelbrot_image(-2.0,0.5,-1.25,1.25,cmap='jet')

xmin = -0.4800
ymin = 0.6143
mandelbrot_image(xmin,xmin+0.0002,ymin,ymin+0.0002,cmap='hot',gamma=.6)

xmin = -0.48108
ymin = 0.61472
mandelbrot_image(xmin,xmin+0.0002,ymin,ymin+0.0002,cmap='jet',gamma=.7)

xmin = -0.4890
ymin = 0.6100
mandelbrot_image(xmin,xmin+0.0002,ymin,ymin+0.0002,cmap='Greens',gamma=0.25)


xmin = -0.4811
ymin = 0.6151
mandelbrot_image(xmin,xmin+0.0002,ymin,ymin+0.0002,cmap='plasma',gamma=0.3)
