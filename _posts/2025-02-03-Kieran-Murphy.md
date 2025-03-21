---
layout: blog
title: "Where is the information in data?"
subtitle: "...and what does it look like?"
authors: ["[Kieran Murphy](https://www.kieranamurphy.com/)"]
author_pic: ["/assets/images/authors/K.A.Murphy.jpeg"]
author_title: ["Information theory/Machine learning/Physics postdoc"]
date: 2025-02-03
permalink: /Where-is-the-Information-in-Data/
summary: "Using machine learning to uncover where the most predictive insights hide in data."

---

Imagine you have a special X-ray-like device that you can point toward a dataset and then it illuminates the information contained within.  What sorts of things could you learn?  What would the illuminated information even look like?

My research is about building such a device with machine learning, and then finding ways to make what it finds interpretable. 
In this post, we'll dig into a small example where you try to predict the rate of bike rentals based on some time descriptors, derived from the classic [*Bikeshare* dataset](https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset).  Rather than using the full set of 12 descriptors, we'll pick four to make things simpler.  The four are:

- the year the data was collected (2011 or 2012, in Washington, D.C.)
- the season (winter, spring, summer, or fall)
- the day of the week
- the hour of the day

The dataset is a bunch of records of these four descriptors along with the number of bikes rented.
Inside the dataset is information about the relationship between the descriptors' values and bike rentals, and this information is what we are after.
By *information* we mean a quantity from the formalism of [information theory](https://en.wikipedia.org/wiki/Information_theory), but you can think of it as a clue that allows for better predictions.

Let's point our special device at the dataset, and illuminate the information!  You can hover over each descriptor to highlight the colored curve that it corresponds to.

<div class='sticky-container'>
<div class='tabular-decomp row sticky'></div>

<br/>

At first glance, this might not look like what you’d imagine 'information' to be. Don’t worry, what you’re seeing is just the beginning. Let’s break it down. <br/><br/>

The plot above is about a spectrum of predictive models found with machine learning, and each model uses a different amount of information about the input descriptors to do the best possible job predicting the number of bikes rented in a given hour.  On the left hand side of the plot is a model that uses no information, and its error (in black) is the worst of the models in the spectrum.  On the right hand side is a model that uses around 10 bits of information, and its error is the best we can attain with these four descriptors.  Along the way, information is extracted in order of importance to the relationship between the descriptors and the number of bike rentals.  In other words, asking "where is the information in the dataset?" is best answered with a prioritization of details: "Something is the most important information, then another thing, and then something else." <br/><br/>
 
So, what is the most important information?  The colored curves show the amount of information extracted from each input descriptor.  The red curve displays the amount of information (with the scale shown on the right vertical axis) pulled from the hour of the day, and we can tell it has the most information about bike rentals.  Then the other three descriptors contribute later and to a lesser degree, with season being the next most important after hour.  That's pretty interesting already, but is there more to the story?<br/><br/>

To dig deeper will require recognizing that information allows you to make distinctions between things.  An example of a partial piece of information about the hour of the day would tell you whether it's morning or afternoon; from this, a model trying to predict bike rentals would be able to distinguish 8am from 8pm, but could not distinguish 7pm from 8pm.  
Without being able to make that distinction, the model would have to output the same prediction for all hours of the afternoon.  With more information, the predictions can become more fine-grained.<br/><br/>

Below we show the information extracted from the four descriptors in terms of distinctions between their values, as a function of the total information extracted.  The distinctions are between pairs of inputs, so there is a square for the ability to distinguish winter from spring, another to distinguish winter from summer, and so on.  Entries are white if the feature values are indistinguishable, meaning no information was passed along to distinguish the values, and shades of blue depending on the degree of distinguishability.<a class='footstart' key='bhat'></a><br/><br/>

</div>

<div class="container">
  <div class='compression-level-slider'></div>
</div>
<div class='distinguishability-mats row' width="50"></div>

The most relevant information in all the descriptors is about the hour of the day, and roughly groups the hours of the day into nighttime, commuting hours, and everything else.

The next most relevant information (found by sliding the bar to the right) distinguishes winter from the warmer months, distinguishes the two years of data from each other, and distinguishes the weekend from the weekdays.  These specific distinctions are the information lying inside the data about the relationship between time and bike rentals. 

Eventually, more nuanced details from the descriptors is selected, and then it becomes easier to interpret what is left *indistinguishable*: spring from fall, the hours from 2am-6am, and the days Tuesday-Thursday.

### Parting thoughts

Data is essentially just a bunch of variation, and one of the central challenges in data science is finding the right variation to focus on.  In this example, the right variation was that which was most informative about bike rentals.
Machine learning identified the information for us, guiding our focus and allowing for our own mental modeling to kick in.

We focused on a small example with only four descriptors and a single output value to predict, but localizing information can scale gracefully to much larger problems, and less straightforward prediction setups.
If you're interested in learning more, check out the longer post that this one came from: [Where is the information in data?](https://murphyka.github.io/information_explorable/), and our publications on the topic:


<a class="paper-title-link" href="https://arxiv.org/abs/2211.17264">Interpretability with full complexity by constraining feature information (ICLR 2023)</a> 

<a class="paper-title-link" href="https://www.pnas.org/doi/abs/10.1073/pnas.2312988121">Information decomposition in complex systems via machine learning (PNAS 2024)</a> 


<a class='footend' key='bhat'></a> 
Specifically, we use the [Bhattacharyya coefficient](https://en.wikipedia.org/wiki/Bhattacharyya_distance) between the probability distributions of these values in representation space, and it is 1 when the representations perfectly overlap (white) and 0 when they have no overlap (dark blue).

<link rel='stylesheet' href='/datapoints/assets/post_assets/2025-01-13-Kieran-Murphy/footnote_v2.css'>
<link rel='stylesheet' href='/datapoints/assets/post_assets/2025-01-13-Kieran-Murphy/citation_v2.css'>
<link rel='stylesheet' href='/datapoints/assets/post_assets/2025-01-13-Kieran-Murphy/style.css'>

<script id='MathJax-script' async src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'></script>
<script defer src='https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/mathtex-script-type.min.js' integrity='sha384-jiBVvJ8NGGj5n7kJaiWwWp9AjC+Yh8rhZY3GtAX8yU28azcLgoRo4oukO87g7zDT' crossorigin='anonymous'></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></script>
<script src='/datapoints/assets/post_assets/2025-01-13-Kieran-Murphy/third_party/d3_.js'></script>
<script src='/datapoints/assets/post_assets/2025-01-13-Kieran-Murphy/third_party/d3-scale-chromatic.v1.min.js'></script>
<script src='/datapoints/assets/post_assets/2025-01-13-Kieran-Murphy/third_party/npyjs-global.js'></script>

<script src='/datapoints/assets/post_assets/2025-01-13-Kieran-Murphy/footnote_v2.js'></script>
<script src='/datapoints/assets/post_assets/2025-01-13-Kieran-Murphy/citation_v2.js'></script>


<script src='/datapoints/assets/post_assets/2025-01-13-Kieran-Murphy/util.js'></script>
<script src='/datapoints/assets/post_assets/2025-01-13-Kieran-Murphy/init-input-sliders.js'></script>

<link rel='stylesheet' href='/datapoints/assets/post_assets/2025-01-13-Kieran-Murphy/tabular/style.css'>
<script src='/datapoints/assets/post_assets/2025-01-13-Kieran-Murphy/tabular/init.js'></script>
<script src='/datapoints/assets/post_assets/2025-01-13-Kieran-Murphy/tabular/init-distinguishability.js'></script>

<script src='/datapoints/assets/post_assets/2025-01-13-Kieran-Murphy/init-info-plane.js'></script>
