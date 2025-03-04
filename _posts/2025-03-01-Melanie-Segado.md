---
layout: blog
title: "Accelerating science with 'off-the-shelf' models"
subtitle: "analyzing small datasets with models trained on big datasets"
authors: ["[Melanie Segado]()"]
author_pic: ["/assets/images/authors/S_McD.jpeg"]
author_title: ["Machine learning/Movement/Healthcare"]
date: 2025-02-05
permalink: /off-the-shelf-ai/

---


Not long ago, extracting insights from video data required building custom computer vision models. This was a very time-consuming task that demanded large datasets, hours of researcher time spent hand-annotating data, and lots of computing power. For small datasets like those that are prevalent in many areas of science and medicine, training models was simply not an option altogether. This mismatch between the needs of machine learning and the size of available datasets left many interesting questions unanswered. The goal of my research is to bridge this gap, finding strategies to make the most of small, specialized datasets by analyzing them with foundation models.

## Why do small datasets matter?

Let’s consider a concrete example of where this can be useful. Subtle patterns in infant movement during the first months of life can help predict neurodevelopmental disorders such as **cerebral palsy** – a lifelong condition affecting balance and motor control. While clinicians excel at picking up these patterns, they don’t always get to see infants until they’re much older, and so infants miss out on a critical window of neuroplasticity where rehabilitation would be most helpful. However, videos of infants can be easily recorded using everyday tools like cell-phone cameras and their movements can be analyzed using computer vision, paving the way for the development of low-cost clinical tools that can be implemented at scale.

A big barrier to developing these tools has been the fact that infants are really difficult to analyze from a computer’s perspective. They tend to bunch up into complicated shapes (occluding their own limbs in the process),and they are often wearing clothes that look a lot like the blankets they’re laying on. To overcome these difficulties, researchers either had to train custom models for infant pose tracking, or fine-tuning existing algorithms, both of which required lots of time spent annotating videos. But look at how much things have improved over the past 7 years! 

Take a look at the video below and move the slider back and forth to compare the performance algorithm from the not-so-distant past (2017) with one from 2023, on a fully ai-generated video of an infant.  

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

<div id="button-container">
    <button id="pause-btn" class="cute-button">Pause</button>
</div>


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
    // Function to resync videos without playing
    function resyncVideos() {
        if (video1.paused && video2.paused) { 
            var currentTime = Math.min(video1.currentTime, video2.currentTime);
            video1.currentTime = currentTime;
            video2.currentTime = currentTime;
        }
    }
        // Automatically resync whenever a video is paused
    video1.addEventListener("pause", resyncVideos);
    video2.addEventListener("pause", resyncVideos);
    video1.addEventListener("play", resyncVideos);
    video2.addEventListener("play", resyncVideos);

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

On the bottom layer (when the slider is all the way to the left) is a model called [OpenPose](https://doi.org/10.48550/arXiv.1812.08008), which was a game-changer in the field when it released. The specific model shown here was pre-trained on 64K images, and finetuned on 47K annotated frames of infant video. While it performs very well when the infant's limbs are clearly visible, it fails in spots where the relevant parts of the image are covered by objects like the crib. This is because it's relying on finding parts of the image that _look like specific joints_ (e.g., knees). When they're occluded, the algorithm fails.  

The model overlayed on top (when the slider is all the way to the right) is [ViTPose-H](https://doi.org/10.48550/arXiv.2204.12484), a model pre-trained on vast amounts of image data (300M labelled images), fine-tuned on a much smaller dataset of human poses (250K), and not fine-tuned at all on infant data. As you can see, it does much better at capturing the overall shape of the infant's pose, even when the information is occluded, despite not having been trained on infants. This not only has it been trained on more data, it also uses a modern achitechture called a **[Vision Transformer](https://doi.org/10.48550/arXiv.2010.11929)** that enables it to learn not just _what specific joints look like_, but also _their spatial relationship_ to other joints (e.g., hips and ankles) and other parts of the image. 

## Why would these models help "accelerate science"? 

Foundation models, pre-trained on massive datasets, have transformed AI applications—from large language models to computer vision. Platforms like [HuggingFace](https://huggingface.co/) that host pre-trained models, and user-friendly tools like OpenMMLab's [MMPose](https://mmpose.readthedocs.io/en/latest/overview.html), make these powerful tools easily accessible. By fine-tuning pre-trained models with domain-specific data, or even using them straight *off the shelf*, researchers can achieve meaningful insights with far less effort and fewer resources. It's hard to overstate just how rapidly this landscape has evolved. To give an example, the first year of my postdoc was spent optimizing algorithms for infant pose estimation by carefully curating a database of difficult-to-detect poses, annotating them by hand, and training an algorithm to improve its performance. While I made progress, ViTPose performed better off-the-shelf than any of the custom models I had been working on. The ability to get precise pose tracking without the need to train models significantly lowers the barrier to entry for research groups with interesting questions and small, specialized datasets. 

## How much data is in a "massive dataset"

To get a sense of just how much data goes into pre-training a foundation model that can then be quickly fine-tuned for specialzed applications, let's take a look at the relative scale of a few of the datasets that went into training the models used for pose-tracking in the videos above. 

<script src="https://d3js.org/d3.v7.min.js"></script>

<style>
    #container {
        position: relative;
        width: 300px;
        height: 300px;
        border: 2px solid #333;
        overflow: hidden;
    }
    .dataset {
        position: absolute;
        background-color: rgba(0, 123, 255, 0.7);
        border: 1px solid #0056b3;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
        text-align: center;
    }
    .layout {
        display: flex;
        align-items: center;
        gap: 20px;
    }
    #buttons {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    button {
        padding: 10px;
        font-size: 14px;
        cursor: pointer;
        background-color: #0073e6;
        color: white;
        border: none;
        border-radius: 5px;
    }
    button:hover {
        background-color: #005bb5;
    }
    #info-box {
        margin-top: 20px;
        padding: 10px;
        width: 600px;
        text-align: center;
        font-size: 14px;
        background: white;
        border: 1px solid #ccc;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
    }
</style>

<div class="layout">
    <!-- Sidebar Buttons -->
    <div id="buttons">
        <button onclick="drawDatasets('jft300m', 300)">JFT-300M (300M images)</button>
        <button onclick="drawDatasets('mscoco', 10)">MS COCO (330K images)</button>
        <button onclick="drawDatasets('mscoco-person', 9)">MS COCO-Person (250K images)</button>
        <button onclick="drawDatasets('infant-frames', 5)">Infant Frames (47K images)</button>
        <button onclick="resetView()">Reset</button>
    </div>

    <!-- Visualization Container -->
    <div id="container"></div>
</div>

<!-- Dynamic Textbox Below -->
<div id="info-box">Click a button to explore dataset sizes.</div>

<script>
    const datasets = [
        { 
            id: "jft300m", name: "JFT-300M", size: 300000000, width: 300, color: "#1f77b4", children: ["mscoco"], 
            descriptions: [
                "JFT-300M is a massive dataset with 300 million images, used to train powerful AI models. Google’s proprietary dataset is used in training vision transformers, which can then be fine-tuned for tasks like pose estimation."
            ] 
        },
        { 
            id: "mscoco", name: "MS COCO", size: 330000, width: 10, color: "#ff7f0e", children: ["mscoco-person"], 
            descriptions: [
                "MS COCO is a dataset with 330K images, used for object detection and segmentation. The dataset contains labelled images with 80 different object categories inlcluding humans with keypoint annotations. It is widely used in pose estimation and object detection benchmarks"
            ] 
        },
        { 
            id: "mscoco-person", name: "MS COCO-Person", size: 250000, width: 9, color: "#d62728", children: ["infant-frames"], 
            descriptions: [
                "MS COCO-Person is a subset of COCO focused on human annotations, with 250K images. It contains annotations for keypoints, making it essential for training and testing pose-estimation algorithms. This was used to train the OpenPose model visualized above, and to fine-tune ViTPose"
            ] 
        },
        { 
            id: "infant-frames", name: "Infant Frames", size: 47000, width: 5, color: "#2ca02c", children: [], 
            descriptions: [
                "47K hand-annotated infant movement frames, used to finetune the OpenPose algorithm. This dataset highlights the small scale of data available for many specialized applications."
            ] 
        }
    ];

    let textIndex = {}; // Store which text index is currently displayed

    function drawDatasets(parentId, parentSize) {
        const container = document.getElementById("container");
        const infoBox = document.getElementById("info-box");
        container.innerHTML = ""; // Clear container before redrawing

        let parentDataset = datasets.find(d => d.id === parentId);
        let scaleFactor = 300 / parentSize;

        // Cycle text index
        if (!textIndex[parentId]) textIndex[parentId] = 0;
        let descriptions = parentDataset.descriptions;
        infoBox.innerText = descriptions[textIndex[parentId]];
        textIndex[parentId] = (textIndex[parentId] + 1) % descriptions.length; // Move to next text

        // Draw the selected dataset at full size
        let parentDiv = document.createElement("div");
        parentDiv.classList.add("dataset");
        parentDiv.id = parentDataset.id;
        parentDiv.style.width = "300px";
        parentDiv.style.height = "300px";
        parentDiv.style.backgroundColor = parentDataset.color;
        parentDiv.innerHTML = `${parentDataset.name}<br>(${parentDataset.size.toLocaleString()} images)`;

        container.appendChild(parentDiv);

        // Draw the child datasets inside
        parentDataset.children.forEach(childId => {
            let childDataset = datasets.find(d => d.id === childId);
            let childSize = childDataset.width * scaleFactor;
            
            let childDiv = document.createElement("div");
            childDiv.classList.add("dataset");
            childDiv.id = childDataset.id;
            childDiv.style.width = `${childSize}px`;
            childDiv.style.height = `${childSize}px`;
            childDiv.style.backgroundColor = childDataset.color;
            childDiv.style.bottom = "5px";
            childDiv.style.left = "5px";
            childDiv.innerHTML = `${childDataset.name}<br>(${childDataset.size.toLocaleString()} images)`;

            container.appendChild(childDiv);
        });
    }

    function resetView() {
        const container = document.getElementById("container");
        const infoBox = document.getElementById("info-box");
        container.innerHTML = ""; // Clear container
        infoBox.innerText = "Click a button to explore dataset sizes."; // Reset text

        datasets.forEach(dataset => {
            let div = document.createElement("div");
            div.classList.add("dataset");
            div.id = dataset.id;
            div.style.width = `${dataset.width}px`;
            div.style.height = `${dataset.width}px`;
            div.style.backgroundColor = dataset.color;
            div.style.position = "absolute";
            div.style.bottom = "5px";
            div.style.left = "5px";
            div.innerHTML = `${dataset.name}<br>(${dataset.size.toLocaleString()} images)`;

            container.appendChild(div);
        });

        textIndex = {}; // Reset cycling index
    }

    // Initialize view
    resetView();
</script>

## Impact and Future Directions

The rise of *off-the-shelf* AI models marks a significant shift in the ease with which researchers can integrate state-of-the-art tools into their research. **Vision transformers for movement analysis** are just one example of how accessible AI tools can help push the boundaries of disease detection and treatment. As these resources become even more widely available, the future holds breakthroughs that will benefit patients worldwide.

If you want to see how we've been able to put this approach to use, check out our pre-prints! 
<a class="paper-title-link" href="https://doi.org/10.1101/2025.02.10.25322007"> Data-Driven Early Prediction of Cerebral Palsy Using AutoML and interpretable kinematic features (medRxiv)</a> 

<a class="paper-title-link" href="https://doi.org/10.1101/2024.11.06.24316844"> Assessing infant risk of cerebral palsy with video-based motion tracking (medRxiv)</a> 

