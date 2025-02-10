---
layout: guide
title: Contributor Guide
permalink: /contributor-guide/
---

<section id="github-repo" markdown="1">
## GitHub Repo
<img src="{{ '/assets/images/picture/git-repo.jpg' | relative_url }}" alt="GitHub Repository" style="max-width: 100%; height: auto;">
</section>

<section id="local-setup" markdown="1">
### Setting Up Local Environment

1. **Install Prerequisites**
   - Install Ruby (version 2.7.0 or higher)
   - Install Bundler: `gem install bundler`
   - Install Git

2. **Clone the Repository**
   ```bash
   git clone https://github.com/YourUsername/datapoints.git
   cd datapoints
   ```

3. **Install Dependencies**
   ```bash
   bundle install
   ```

4. **Run Local Server**
   ```bash
   bundle exec jekyll serve
   ```
   Your site will be available at `http://localhost:4000`

5. **Common Issues**
   - If you see gem errors, try: `bundle update`
   - For permission errors, use: `sudo gem install bundler`
   - Make sure your Ruby version matches the one in `.ruby-version`

6. **Development Tips**
   - Changes are auto-reloaded (except `_config.yml`)
   - Check console for build errors
   - Use `--livereload` flag for automatic browser refresh
</section>

<section id="branches" markdown="1">
### Working with Branches
<!-- Branches content -->
</section>

<section id="template" markdown="1">
### Using Blog Template
<!-- Template content -->
</section>

<section id="git-resources" markdown="1">
### Git Resources
<!-- Git resources content -->
</section>

<section id="blog-inspirations" markdown="1">
## Blog Inspirations
<img src="{{ '/assets/images/picture/blog-inspirations.jpg' | relative_url }}" alt="GitHub Repository" style="max-width: 100%; height: auto;">
</section>