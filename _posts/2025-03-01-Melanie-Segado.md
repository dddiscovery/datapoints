---
layout: blog
title: "Accelerating science with 'off-the-shelf' models"
subtitle: "analyzing small datasets with models trained on big datasets"
authors: ["[Melanie Segado]()"]
author_pic: ["/assets/images/authors/S_McD.jpeg"]
author_title: ["Machine learning/Movement/Healthcare"]
date: 2025-02-03
permalink: /off-the-shelf-ai/

---


Not long ago, extracting insights from video data required building custom computer vision models. This was a very time-consuming task that demanded large datasets, hours of researcher time spent hand-annotating data, and lots of computing power. For small datasets like those that are prevalent in many areas of science and medicine, training models was simply not an option altogether. This mismatch between the needs of machine learning and the size of available datasets left many interesting questions unanswered. The goal of my research is to bridge this gap, finding strategies to make the most of small, specialized datasets by analyzing them with foundation models.

## Why do small datasets matter?

Let’s consider a concrete example of where this can be useful. Subtle patterns in infant movement during the first months of life can help predict neurodevelopmental disorders such as **cerebral palsy** – a lifelong condition affecting balance and motor control. While clinicians excel at picking up these patterns, they don’t always get to see infants until they’re much older, and so infants miss out on a critical window of neuroplasticity where rehabilitation would be most helpful. However, videos of infants can be easily recorded using everyday tools like cell-phone cameras and their movements can be analyzed using computer vision, paving the way for the development of low-cost clinical tools that can be implemented at scale.

Infants are really difficult to analyze from a computer’s perspective. They tend to bunch up into complicated shapes (occluding their own limbs in the process),and they are often wearing clothes that look a lot like the blankets they’re laying on. A common strategy in computer vision is to pre-train a model on a related dataset, for instance on videos of adults, but in this case adults have very different proportions than infants, and are usually upright and walking around whereas infants are typically laying down and moving very differently than adults. To overcome these difficulties, researchers either had to train custom models for infant pose tracking, or fine-tuning existing algorithms, both of which required lots of time spent annotating videos. While this approach can work well within a research group, it makes it difficult for researchers to build on eachother's work.

## The opportunities of foundation models 

Foundation models, pre-trained on massive datasets, have transformed AI applications—from large language models to computer vision. Platforms like [HuggingFace](https://huggingface.co/) that host pre-trained models, and user-friendly tools like OpenMMLab's [MMPose](https://mmpose.readthedocs.io/en/latest/overview.html), make these powerful tools easily accessible. By fine-tuning pre-trained models with domain-specific data, or even using them straight *off the shelf*, researchers can achieve meaningful insights with far less effort and fewer resources. It's hard to overstate just how rapidly this landscape is shifting. To give an example, the first year of my postdoc was spent optimizing algorithms for infant pose estimation by carefully curating a database of difficult-to-detect poses, annotating them by hand, and training an algirhtm to improve its performance. While I certainly made progress towards improving algorithm performance, none of them performed as well as a a model called ViTPose, which performed better off-the-shelf than any of the custom models I had been working to train. And while fine-tuning could almost certainly improve performance of this algirhtm as well, the ability to get precise skeletal tracking without the need to finetune significantly lowers the barrier to entry for research groups with interesting questions and datasets that may lack the technical expertise (or time and resources) to devote to building a custom model. 

Take a look at the video below and move the slider back and forth to see just how much algorithm performance has improved over the past 8 years! On the bottom layer (when the slider is all the way to the left) is a model called OpenPose, which was a game-changer when it released in 2015. The model pictured here is a newer version of that algorithm released in 2017, and finetuned on 47K frames of annotated infant poses. While it performs very well when the infants limbs are clearly visible, it fails in spots where the relevant parts of the image are covered by objects like the crib. 

The model overlayed on top (when the slider is all the way to the right) is ViTPose-H, a model pre-trained on vast amounts of image data, fine-tuned on a large amount of adult-human pose data, and not fine-tuned at all on infant data. As you can see, it does much better at capturing the overal shape of the infant's pose, even when the information is occluded. 

<div id="video-compare-container">
  <video id="video1" loop muted autoplay poster="../assets/post_assets/2025-03-01-Melanie-Segado/openpose.jpg">
    <source src="../assets/post_assets/2025-03-01-Melanie-Segado/openpose.mp4" type="video/mp4">
    <source src="../assets/post_assets/2025-03-01-Melanie-Segado/openpose.webm" type="video/webm">
  </video>
  <div id="video-clipper">
    <video id="video2" loop muted autoplay poster="../assets/post_assets/2025-03-01-Melanie-Segado/vitposeh.jpg">
      <source src="../assets/post_assets/2025-03-01-Melanie-Segado/vitposeh.mp4" type="video/mp4">
      <source src="../assets/post_assets/2025-03-01-Melanie-Segado/vitposeh.webm" type="video/webm">
    </video>
  </div>
  <!-- Initial Center Line with Arrows -->
  <div id="initial-line">
    <div class="arrow" id="left-arrow">◀</div>
    <div class="arrow" id="right-arrow">▶</div>
  </div>
  <div id="slider-line">
    <div class="arrow" id="dynamic-left-arrow">◀</div>
    <div class="arrow" id="dynamic-right-arrow">▶</div>
  </div>
</div>

<!-- Pause Button -->
<button id="pause-btn" class="cute-button">Pause</button>

<style>

  .cute-button{
    background:rgb(23, 235, 242); /* Soft turquoise */
    border: none;
    padding: 12px 24px;
    border-radius: 20px; /* Makes it rounded */
    font-size: 16px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

  #video-compare-container {
    display: inline-block;
    line-height: 0;
    position: relative;
    width: 100%;
    padding-top: 42.3%;
  }

  #video-compare-container > video {
    width: 100%;
    position: absolute;
    top: 0;
    height: 100%;
  }

  #video-clipper {
    width: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }

  #video-clipper video {
    width: 200%;
    position: absolute;
    height: 100%;
  }

  /* Style the Pause Button */
  #pause-btn {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }

  /* Initial Center Line */
  #initial-line {
    position: absolute;
    top: 0;
    left: 50%;
    width: 3px;
    height: 100%;
    background: white;
    transform: translateX(-50%);
    z-index: 10;
    transition: opacity 0.3s ease-in-out;
  }

  /* Vertical Slider Line */
  #slider-line {
    position: absolute;
    top: 0;
    width: 3px;
    height: 100%;
    background: white;
    pointer-events: none;
    z-index: 10;
    display: none;
  }

  /* Arrow Styles */
  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    color: white;
    font-weight: bold;
    background: rgba(0, 0, 0, 0);
    padding: 5px;
    border-radius: 50%;
    pointer-events: none;
  }

  #left-arrow, #dynamic-left-arrow {
    left: -20px;
  }

  #right-arrow, #dynamic-right-arrow {
    right: -20px;
  }

  /* Position the arrows for the initial line */
  #left-arrow {
    left: -30px;
  }

  #right-arrow {
    right: -30px;
  }

</style>

<script>
document.addEventListener("DOMContentLoaded", function () {
    var videoContainer = document.getElementById("video-compare-container"),
        video1 = document.getElementById("video1"),
        video2 = document.getElementById("video2"),
        videoClipper = document.getElementById("video-clipper"),
        initialLine = document.getElementById("initial-line"),
        sliderLine = document.getElementById("slider-line"),
        pauseBtn = document.getElementById("pause-btn");

    if (!video1 || !video2) {
        console.error("Error: One or more videos are missing.");
        return;
    }

    // Ensure both videos play initially
    video1.play();
    video2.play();

    // Pause and Play Functionality
    pauseBtn.addEventListener("click", function () {
        if (video1.paused || video2.paused) {
            video1.play();
            video2.play();
            pauseBtn.textContent = "Pause";
        } else {
            video1.pause();
            video2.pause();
            pauseBtn.textContent = "Play";
        }
    });

    // Hide initial line when user interacts
    videoContainer.addEventListener("mouseenter", function () {
        initialLine.style.opacity = "0"; // Fade out initial line
    });

    videoContainer.addEventListener("mouseleave", function () {
        initialLine.style.opacity = "1"; // Fade it back in when mouse leaves
    });

    // Track Mouse Movement to Adjust Clipper Width and Show Dynamic Line
    videoContainer.addEventListener("mousemove", function (e) {
        var rect = videoContainer.getBoundingClientRect(),
            position = ((e.pageX - rect.left) / videoContainer.offsetWidth) * 100;

        if (position <= 100) { 
            videoClipper.style.width = position + "%";
            video2.style.width = ((100 / position) * 100) + "%";
            video2.style.zIndex = 3;

            // Show and move the dynamic vertical line
            sliderLine.style.display = "block";
            sliderLine.style.left = e.pageX - rect.left + "px";
        }
    });

    // Hide dynamic line when mouse leaves
    videoContainer.addEventListener("mouseleave", function () {
        sliderLine.style.display = "none";
    });
});
</script>

## Why do vision transformers work so well 

**Vision transformers**, originally developed for image classification, excel in image analysis due to their ability to capture not just local information in a frame, but also dependencies between multiple points. In the case of the infant video, the older algorthm relies on pixels in each frame that look like a knee to be able to detect that the infant's knee is in the video. Because the knees are often hidden behind the crib, the algorthm has no way of correctly annotating them even if it's really good at detecting knees! In contrast, the vision-transformer algorithm has learned not just what a knee looks like, but also that human poses typically have knees, and that they are at a straight line out from the hip, and then connect to the ankle. These algorithms are therefore much more robust at tracking poses with occluded body parts.      

## Impact and Future Directions

The rise of *off-the-shelf* AI models marks a significant shift in the ease with which researchers can integrate state of the art tools into their research. **Vision transformers for movement analysis** are just one example of how accessible AI tools can help push the boundaries of disease detection and treatment. As these resources become even more widely available, the future holds breakthroughs that will benefit patients worldwide.

