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

### For Authors
1. Create your blog post in `_posts/` following the naming convention
   - Main blog content should be written in Markdown format in your .md file
   - Follow the template in `2025-01-22-post-temp.md` to edit the content
2. Create a matching directory in `assets/post_assets/` for your specific assets
   - Place all post-specific content (images, CSS, scripts) in your post's asset directory


## Branch Strategy
not sure what should be the branch strategy for this project. ;\)

## Artwork Credits

The blog features artwork from the public domain as title images for posts:

### Title Images
- `assets/images/posts/title_km.jpg`  
  *"La Danse"* (1910)  
  Artist: Henri Matisse  
  Accession Number: AKG322604 
  Source: Barnes Collection  
  Status: Public Domain

- `assets/images/picture/call_for_particiate.jpg`
  *"London Bridge"*
  Artist: André Derain
  Accession Number: 195.1952
  Source: Museum of Modern Art (MoMA)
  Status: Public Domain

- `assets/images/picture/join_community.jpg`
  *"The Bathing Hour, Chester, Nova Scotia"*
  Artist: William James Glackens
  Accession Number: BF149
  Source: Barnes Collection
  Status: Public Domain

- `assets/images/picture/explore.jpg`
  *"Jockeys and Race Horses"*
  Artist: Edgar Degas
  Accession Number: BF572
  Source: Barnes Collection
  Status: Public Domain



*Note: All artwork used as title images are selected from the public domain to ensure proper usage rights.*

