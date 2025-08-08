# Enhanced Image Syntax Examples

This file demonstrates how content writers can use the enhanced image syntax in their markdown articles.

## Basic Image Syntax

### Standard Image (Centered, Medium Size)
```markdown
![Bitcoin Mining Rig](https://raw.githubusercontent.com/your-org/content/main/images/mining-rig.jpg)
```

### Image with Caption
```markdown
![Mining Hardware|caption:ASIC miners in a professional mining facility](https://raw.githubusercontent.com/your-org/content/main/images/mining-facility.jpg)
```

## Size Variations

### Small Image
```markdown
![Small Logo|size:small](https://raw.githubusercontent.com/your-org/content/main/images/logo-small.png)
```

### Large Image
```markdown
![Detailed Chart|size:large](https://raw.githubusercontent.com/your-org/content/main/images/price-chart-detailed.png)
```

### Full Width Image
```markdown
![Full Width Banner|size:full](https://raw.githubusercontent.com/your-org/content/main/images/banner.jpg)
```

## Style Variations

### Full Width (Breakout of Container)
```markdown
![Mining Farm Aerial View|style:full-width|caption:Large-scale Bitcoin mining operations require significant infrastructure](https://raw.githubusercontent.com/your-org/content/main/images/mining-farm-aerial.jpg)
```

### Float Left
```markdown
![Antminer S19|style:float-left|size:small|border:rounded](https://raw.githubusercontent.com/your-org/content/main/images/antminer-s19.jpg)

The Antminer S19 is currently one of the most efficient miners available. With its advanced chip technology, it offers excellent hash rate per watt consumption. The text will wrap around this floating image naturally.
```

### Float Right  
```markdown
![Error Screenshot|style:float-right|size:medium|border:thick|spacing:tight](https://raw.githubusercontent.com/your-org/content/main/images/error-screen.png)

If you encounter this error message, check your network configuration. The most common cause is incorrect pool settings. This image floats to the right while the text flows around it.
```

### Inline Images
```markdown
![Step 1|style:inline|size:small](https://raw.githubusercontent.com/your-org/content/main/images/setup-1.jpg) First, unbox your miner carefully.

![Step 2|style:inline|size:small](https://raw.githubusercontent.com/your-org/content/main/images/setup-2.jpg) Connect the power supply.

![Step 3|style:inline|size:small](https://raw.githubusercontent.com/your-org/content/main/images/setup-3.jpg) Configure network settings.
```

## Border and Shadow Effects

### Thin Border
```markdown
![Interface Screenshot|border:thin|shadow:sm](https://raw.githubusercontent.com/your-org/content/main/images/interface.png)
```

### Thick Border with Large Shadow
```markdown
![Product Photo|border:thick|shadow:lg](https://raw.githubusercontent.com/your-org/content/main/images/product.jpg)
```

### Rounded Border
```markdown
![Profile Picture|border:rounded|size:small](https://raw.githubusercontent.com/your-org/content/main/images/profile.jpg)
```

### Circle Border (Perfect for Avatars)
```markdown
![Author Avatar|border:circle|size:small](https://raw.githubusercontent.com/your-org/content/main/images/author-avatar.jpg)
```

## Advanced Combinations

### Chart with Full Styling
```markdown
![Profitability Analysis|style:centered|size:large|border:thin|shadow:md|caption:Mining profitability comparison for Q4 2024 across different hardware configurations](https://raw.githubusercontent.com/your-org/content/main/images/charts/mining-profit-analysis.png)
```

### Technical Diagram
```markdown
![Network Architecture|style:full-width|border:rounded|shadow:lg|caption:Complete overview of the Bitcoin network architecture showing nodes, miners, and transaction flow](https://raw.githubusercontent.com/your-org/content/main/images/diagrams/network-architecture.svg)
```

### Code Screenshot with Tight Spacing
```markdown
![Code Example|style:centered|size:medium|border:rounded|spacing:tight|caption:Example implementation of the mining pool connection](https://raw.githubusercontent.com/your-org/content/main/images/code/pool-connection.png)
```

## Hover Effects (Optional)

### Zoom on Hover
```markdown
![Interactive Chart|hover:zoom|shadow:md](https://raw.githubusercontent.com/your-org/content/main/images/interactive-chart.png)
```

### Lift Effect on Hover
```markdown
![Product Card|hover:lift|border:rounded](https://raw.githubusercontent.com/your-org/content/main/images/product-card.jpg)
```

## Special Effects

### Grayscale Filter
```markdown
![Historical Photo|effect:grayscale|border:rounded](https://raw.githubusercontent.com/your-org/content/main/images/historical.jpg)
```

### Sepia Filter
```markdown
![Vintage Mining Equipment|effect:sepia|shadow:md](https://raw.githubusercontent.com/your-org/content/main/images/vintage-mining.jpg)
```

## Complex Layout Examples

### Article Introduction with Hero Image
```markdown
# Bitcoin Mining Complete Guide

![Mining Operations Overview|style:full-width|shadow:lg|caption:Modern Bitcoin mining facilities combine efficiency with sustainability](https://raw.githubusercontent.com/your-org/content/main/images/heroes/mining-guide-hero.jpg)

Bitcoin mining is the process of creating new bitcoins by solving computational puzzles...
```

### Step-by-Step Tutorial
```markdown
## Hardware Setup Process

### Step 1: Unboxing and Inspection

![Unboxing Process|style:float-right|size:medium|border:rounded|spacing:normal](https://raw.githubusercontent.com/your-org/content/main/images/tutorials/unboxing.jpg)

Carefully remove your ASIC miner from the packaging. Check for any physical damage during shipping and ensure all components are included.

### Step 2: Power Connection

![Power Setup|style:centered|size:large|caption:Proper power connection is crucial for stable operation](https://raw.githubusercontent.com/your-org/content/main/images/tutorials/power-setup.jpg)

Connect the power supply unit to your miner following the manufacturer's guidelines...
```

### Comparison Section
```markdown
## Hardware Comparison

![Antminer S19|style:float-left|size:small|border:circle](https://raw.githubusercontent.com/your-org/content/main/images/miners/s19.jpg)
![Whatsminer M30S|style:float-right|size:small|border:circle](https://raw.githubusercontent.com/your-org/content/main/images/miners/m30s.jpg)

When comparing the Antminer S19 and Whatsminer M30S, several factors come into play...

![Performance Comparison Chart|style:full-width|border:thin|shadow:md|caption:Head-to-head performance comparison showing hash rate, power consumption, and efficiency metrics](https://raw.githubusercontent.com/your-org/content/main/images/charts/s19-vs-m30s.png)
```

## Best Practices

1. **Use descriptive alt text** - The first part before the pipe should clearly describe what's in the image
2. **Choose appropriate sizes** - Don't use large images for small decorative elements
3. **Consider mobile responsiveness** - Float and inline styles will automatically adapt on mobile
4. **Use captions for context** - Help readers understand why the image is relevant
5. **Optimize image files** - Use appropriate formats (WebP, PNG, JPEG) and compress images
6. **Consistent naming** - Use clear, consistent naming for your image files
7. **Test combinations** - Some style combinations work better than others

## Available Options Summary

### Sizes
- `small` (300px max-width)
- `medium` (500px max-width) - Default
- `large` (800px max-width)
- `full` (100% width)

### Styles
- `centered` - Default, centered in container
- `full-width` - Breaks out of container, full viewport width
- `float-left` - Floats left, text wraps around
- `float-right` - Floats right, text wraps around
- `inline` - Displays inline with text

### Borders
- `thin` - 1px solid border
- `thick` - 3px solid border
- `rounded` - Rounded corners
- `circle` - Perfect circle (for avatars)

### Shadows
- `sm` - Small shadow
- `md` - Medium shadow
- `lg` - Large shadow

### Spacing
- `tight` - Reduced margin (1rem)
- `normal` - Standard margin (2rem) - Default
- `loose` - Increased margin (3rem)

### Alignment
- `left` - Left aligned
- `center` - Center aligned - Default
- `right` - Right aligned

### Hover Effects
- `zoom` - Scales image on hover
- `shadow` - Adds shadow on hover
- `lift` - Lifts image up on hover

### Special Effects
- `grayscale` - Grayscale filter
- `sepia` - Sepia filter
- `blur` - Blur effect
- `brightness` - Increased brightness