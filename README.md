# DDDI DataPoints Blog

This repository contains the source code for the DDDI DataPoints blog, a platform for sharing data-driven discoveries and insights.

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

## Directory Details
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
