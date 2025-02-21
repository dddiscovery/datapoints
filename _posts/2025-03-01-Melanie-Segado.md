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


Not long ago, extracting insights from video data required building custom computer vision models. This was a very time-consuming task that demanded large datasets and computing power. For small datasets like those that are prevalent in many areas of science and medicine, training models was simply not an option altogether. This mismatch between the needs of machine learning and the size of available datasets left many interesting questions unanswered. The goal of my research is to bridge this gap, finding strategies to make the most of small, specialized datasets by analyzing them with foundation models.

## Why do small datasets matter?

Let’s consider a concrete example of where this can be useful. Subtle patterns in infant movement during the first months of life can help predict neurodevelopmental disorders such as **cerebral palsy** – a lifelong condition affecting balance and motor control. While clinicians excel at picking up these patterns, they don’t always get to see infants until they’re much older, and so infants miss out on a critical window of neuroplasticity where rehabilitation would be most helpful. However, infant movements can be recorded using everyday tools like cell-phone cameras and analyzed through computer vision, paving the way for the development of low-cost clinical tools that can be implemented at scale.

Infants are really difficult to analyze from a computer’s perspective. They tend to bunch up into complicated shapes (often occluding their own limbs in the process), and they are often wearing clothes that look a lot like the blankets they’re laying on. For computer vision algorithms that relied on similar-looking pixel content, as was the case for many years, this challenge was often insurmountable. Training a custom model for infant movement tracking, or fine-tuning existing algorithms, certainly improved performance but required lots of time spent annotating videos, only to find that the model didn’t generalize well to a new dataset.

## From Foundation Models to Vision Transformers

Foundation models, pre-trained on massive datasets, have transformed AI applications—from large language models to computer vision. **Vision transformers**, originally developed for image classification, excel in video analysis due to their ability to capture relationships between multiple points within a frame as well as long-range dependencies across frames. Platforms like [HuggingFace](https://huggingface.co/) that host pre-trained models, and user-friendly tools like OpenMMLabs, make these powerful tools easily accessible. By fine-tuning pre-trained models with domain-specific data, or even using them straight *off the shelf*, researchers can achieve meaningful insights with far less effort and fewer resources.

## Let's take a look at the two side-by-side 



## Impact and Future Directions

The rise of *off-the-shelf* AI models marks a significant advance in scientific rigor and generalizability. By enabling research centers to aggregate de-identified datasets across institutions, these tools help break down silos and drive large-scale insights. **Vision transformers for movement analysis** are just one example of how accessible AI tools are pushing the boundaries of disease detection and treatment. As these resources become even more widely available, the future holds breakthroughs that will benefit patients worldwide.

