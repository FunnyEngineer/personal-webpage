
# [PrecipDiff – High-Resolution Atmospheric Downscaling via Residual Diffusion](https://ojs.aaai.org/index.php/AAAI/article/view/35010)

## The Problem: Addressing the Global Data Gap

In short, we want to downscale the satellite-derived precipitation data but found that there is a **systematic bias** existing due to the indirect measurement techniques compared to the ground radars. The problem now becomes twofold: 
1. The original downscaling problem: How to increase the spatial resolution of IMERG dataset (10km) using purely computer vision techniques, without relying on auxiliary meteorological data.
2. NEW calibration problem: How to reduce the bias between two system observations, e.g., satellites and radars. 


***

## Mathematical Formulation

We use a two-step approach with a unified diffusion framework. Two diffusion models using **Residual learning** (or **Euler integration**, the cool naming strategy works 😊) are responsible for **Bias Correction** and **Downscaling** respectively.

$$x_{new} = f(x_{old}) + \epsilon$$

![Pipeline diagram](/windbone-application/inference.png)
*The inference process where satellite data is first corrected, then upsampled and detailed via the second diffusion model.*

### 1. The Core Diffusion Mechanism
Given a data distribution $x_0$, the forward process injects Gaussian noise over $T$ steps:

$$q(x_t|x_{t-1}) = \mathcal{N}(x_t; \sqrt{1-\beta_t}x_{t-1}, \beta_t I)$$

The reverse process recovers the clean residual by learning a parameterized transition kernel using a U-Net:

$$p_{\theta}(x_{t-1}|x_t) = \mathcal{N}(x_{t-1}; \mu_{\theta}(x_t, t, c), \Sigma_{\theta}(x_t, t, c))$$

where $c$ represents the conditioning low-resolution or satellite input.

### 2. Stage I: Bias Correction (Calibration)

The first computational challenge is correcting the systematic bias between satellite sensors (IMERG) and ground radar (MRMS). We formulate this as learning the residual distribution $\epsilon_{bias}$ at the coarse (10 km) resolution .

Let $x_{sat}$ be the raw satellite observation and $x_{rad}^{LR}$ be the coarsened ground radar truth. The model $\theta_{corr}$ learns to denoise the bias residual:

$$\epsilon_{bias} = x_{rad}^{LR} - x_{sat}$$

$$x_{corrected} = x_{sat} + \mathcal{F}_{\theta_{corr}}(z, x_{sat})$$

Here, $\mathcal{F}$ represents the diffusion sampling process conditioned on the original satellite data $x_{sat}$, and now we have a **calibrated** *Low-Res* precipitation data $x_{corrected}$.

### 3. Stage II: Downscaling (Super-Resolution)
Once calibrated, the data is upsampled to the target resolution (1 km). The second model $\theta_{down}$ learns the resolution residual $\epsilon_{resolution}$ lost during downsampling.


Let $x_{rad}^{HR}$ be the high-resolution ground truth (MRMS at 1 km).

$$\epsilon_{resolution} = x_{rad}^{HR} - \text{Upsample}(x_{rad}^{LR})$$

$$x_{final} = \text{Upsample}(x_{corrected}) + \mathcal{F}_{\theta_{down}}(z, \text{Upsample}(x_{corrected}))$$

A good conclusion of the method is: The calibration process in low-resolution avoids the model being optimized in a sparse scenario (precipitation data), and the downscaling process maintains the extremes when doing spatial detailing.

## Computational Strategy & Bottlenecks

### Toolchain

  * **Language:** Python
  * **Deep Learning Framework:** PyTorch
  * **Architecture:** Custom U-Net with attention mechanisms.
  * **Hardware:** 2x NVIDIA Quadro RTX 8000 GPUs.

### The Computational Bottleneck

1. **The traditional DDPM process**: The distance of each denoising step is fixed in the DDPM model. Here we use EDM formulations to sample the image within 25 steps. The batch size of our experiment is 15, which approaches the limitation of our device.
2. **The image size**: The common bottleneck of using pixel-level diffusion is the image size. Computing the gradient of each denoising step is pretty heavy. We attempted to use a standard CNN-based autoencoder to compress the precipitation data into latent space, but we failed due to the sparsity of the image. Maybe something heterogeneous will work, but we haven't answered that yet. The current POC is conducted based on the Seattle region where a 200x200 pixel image at 1 km scale is used. It might not be the limit of our system, rather a good POC region. 

## Visuals and Results

### 1\. Error accumulation violin Plot

We visualize the error distribution for each stage using violin plots. The aim of plotting out distributed errors is to observe the model's predictive behavior. 

![Violin Plot: Correction](/windbone-application/correction_I2LRM_new.png)
*The error distribution between original IMERG and Corrected IMERG. The errors are calculated based on the LR MRMS observations, with all pixels flattened for the comparison.*

![Violin Plot: Downscaling](/windbone-application/downscaled_M2M_new.png)
*The error distribution between LR MRMS and downscaled MRMS. The errors are calculated based on the original MRMS observations, with sampling from the pixels flattened for the comparison.*


### 2\. Restoration of Storm Structure

The diffusion approach successfully recovered high-intensity storm centers.

![Result Stage Figure](/windbone-application/result.png)
*Visual results showing (a) Original coarse Satellite data, (b) The corrected LR data, (c) Our Corrected & Downscaled prediction, and (d) Ground Truth. Note the recovery of the high-intensity red cells in the center of the storm.*

## Final Conclusion

Hi John, and everyone who is reading this. Thank you for reading this so far. I like how you depict the skills and the qualifications. I would like to introduce myself with some final remarks in honesty so you can know more about me.

 - I came from a civil engineering background, but I love math and computers. Compared to the truly talented people in mathematics and computer science, I know my inadequacy in math, but I am catching up—by using LLMs.
 - Although I use "neural networks" a lot to solve problems, I totally get your mindset of solving problems in a mathematical style instead of using a giant NN.
 - My past experience shows similar interests. As I mentioned earlier, we failed at compressing the sparse precipitation data, and one of your responsibilities is to compress telemetry. I want to tackle the problem in a different way.
 - I truly love solving problems, especially weather-related stuff. I found this position by searching "Weather AI company". Your SEO is working. 😊