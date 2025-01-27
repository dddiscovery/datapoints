# DDDI DataPoints Blog

This repository contains the source code for the DDDI DataPoints blog, a series showcasing postdoctoral research through data-driven discoveries.

## Project Structure

```
DDDI_DP_Blog/
├── _layouts/           # Universal HTML layouts for the blog
├── _posts/            # Blog post content in Markdown
│   └── YYYY-MM-DD-FirstName-LastName.md
├── assets/            # Static assets
│   ├── css/          # Universal CSS files
│   ├── images/       # Global images
│   └── post_assets/  # Post-specific assets
│       └── YYYY-MM-DD-FirstName-LastName/  # Matches .md filename
└── README.md
```

### Directory Details
#### `_layouts/`
Contains universal HTML layouts used across the blog. These templates define the structure and appearance of different page types.

#### `_posts/`
Stores all blog post content in Markdown format. 
- Naming convention: `YYYY-MM-DD-FirstName-LastName.md`
- Example: `2025-01-27-Yuxin-Liang.md`

#### `assets/`
Static assets organized in three main categories:
- `css/`: Universal CSS files applied across the site
- `images/`: Global images used throughout the blog
- `post_assets/`: Post-specific assets
  - Each post should have its own directory matching the .md filename
  - Example: If your post is `2025-01-27-Yuxin-Liang.md`, create `assets/post_assets/2025-01-27-Yuxin-Liang/`
  - Store all post-specific settings, images, and other assets in this folder

## Branch Strategy

### Branch Structure
- `main`: Production-ready code, final destination for completed posts
- `firstname-lastname-staging`: Personal development branch for each author

### Workflow
1. **Create Your Branch**
   ```bash
   # Create and switch to your personal staging branch
   git checkout -b yuxin-liang-staging
   ```
2. **Development Process**
   - Make all your changes in your personal staging branch
   - Test locally using Jekyll server
   - Commit changes frequently with clear messages
3. **Push to Your Branch**
   ```bash
   git push origin yuxin-liang-staging
   ```
4. **Final Review**
   - Ensure all content is complete
   - Test all interactive elements
   - Verify formatting across devices
5. **Merge to Main**
   - Only merge to `main` when post is complete
   - Create pull request from your branch to `main`
   - Request review if needed

## For Authors
1. Create a new branch for your post
   - Branch naming convention: `post/YYYY-MM-DD-FirstName-LastName`
   - Example: `post/2025-01-27-Yuxin-Liang`
2. Create your blog post in `_posts/` following the naming convention
   - Create a new .md file named `YYYY-MM-DD-FirstName-LastName.md`
   - Use the template in `2025-01-22-post-temp.md` as a starting point
   - Write your blog content in Markdown format
3. Create a matching directory in `assets/post_assets/` for your specific assets
   - Directory should match your .md filename: `assets/post_assets/YYYY-MM-DD-FirstName-LastName/`
   - Place all post-specific content (images, CSS, scripts) in this directory
4. Work on your staging branch
   - Make all changes and test locally (follow the local development setup below)
   - Commit your changes regularly with descriptive messages
5. Review and publish
   - Request a review when your post is ready
   - After approval, merge your branch into main

## Local Development Setup
### Prerequisites
1. **Install Ruby**
   - Download and install Ruby from [RubyInstaller](https://rubyinstaller.org/)
   - Verify installation: `ruby -v`
2. **Install Jekyll and Bundler**
   ```bash
   gem install jekyll bundler
   ```
### Getting Started
1. **Clone the Repository**
   ```bash
   git clone https://github.com/dddiscovery/datapoints.git
   cd datapoints
   ```
2. **Install Dependencies**
   ```bash
   bundle install
   ```
3. **Start Local Server**
   ```bash
   bundle exec jekyll serve
   ```
### Common Issues
- If you get permission errors during gem installation, try:
  ```bash
  gem install jekyll bundler --user-install
  ```
- If `bundle install` fails, try:
  ```bash
  bundle update
  bundle install
  ```

### Preview Across Devices (Using ngrok)

ngrok allows you to access your local development site from any device, regardless of network.

1. **Start Jekyll Server with Host Settings**
   ```bash
   cd datapoints    # Navigate to your project directory
   bundle exec jekyll serve --host=0.0.0.0 --baseurl=""
   ```
   Keep this terminal window open!
2. **Start ngrok in New Terminal**
   ```bash
   ngrok http 4000
   ```
   Keep this terminal window open too!
3. **Get the Public URL**
   - Look for the 'Forwarding' line in ngrok output
   - Use the `https://` URL (example: `https://xxxx-xxxx.ngrok-free.app`)
4. **Access on Other Devices**
   - Open the ngrok URL on any device
   - Site will be accessible regardless of network
   - Great for testing responsive design
   - Share URL with collaborators for quick previews

### Notes
- ngrok URLs are temporary and change each session
- Free tier has some limitations
- For security, only share URLs with trusted collaborators

## Artwork Credits

The blog features artwork from the public domain as title images for posts:

### Title Images
- `assets/images/posts/title_km.jpg`  
  *"La Danse"* (1910)  
  - Artist: Henri Matisse  
  - Accession Number: AKG322604 
  - Source: Barnes Collection  
  - Status: Public Domain
- `assets/images/picture/call_for_particiate.jpg`
  *"London Bridge"*
  - Artist: André Derain
  - Accession Number: 195.1952
  - Source: Museum of Modern Art (MoMA)
  - Status: Public Domain
- `assets/images/picture/join_community.jpg`
  *"The Bathing Hour, Chester, Nova Scotia"*
  - Artist: William James Glackens
  - Accession Number: BF149
  - Source: Barnes Collection
  - Status: Public Domain
- `assets/images/picture/explore.jpg`
  *"Jockeys and Race Horses"*
  - Artist: Edgar Degas
  - Accession Number: BF572
  - Source: Barnes Collection
  - Status: Public Domain

*Note: All artwork used as title images are selected from the public domain to ensure proper usage rights.*

