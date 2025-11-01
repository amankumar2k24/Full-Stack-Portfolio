# Next.js Image URL Configuration Fix

## 🐛 **Problem**
Error: `Invalid src prop (https://revueo.ai) on next/image, hostname "revueo.ai" is not configured under images in your next.config.js`

## 🔍 **Root Cause**
Website URLs (like `https://revueo.ai`) were being used as image sources instead of actual image URLs. These should be in the `liveLinks` array, not `imageUrls` array.

## ✅ **Solutions Implemented**

### 1. **Updated next.config.js**
Added additional domains for portfolio websites:
```javascript
{
    protocol: 'https',
    hostname: 'shobhit-connect.vercel.app',
},
{
    protocol: 'https',
    hostname: 'beryl.esieve.in',
},
{
    protocol: 'https',
    hostname: 'fullstack-ak-portfolio.vercel.app',
},
```

### 2. **Added Image URL Validation**
Created `isValidImageUrl()` function that checks:
- ✅ Image file extensions (jpg, jpeg, png, gif, webp, svg, bmp, ico)
- ✅ Known image hosting services (Cloudinary, Unsplash, jsDelivr)
- ❌ Filters out website URLs

### 3. **Updated Components**
Both `ProjectsSection.tsx` and `AdminProjectsManager.tsx` now:
- Filter out invalid image URLs automatically
- Show "No image available" when no valid images exist
- Prevent Next.js image errors

## 🔧 **How to Fix Data**

### Option 1: Run the Fix Script
```bash
cd backend
npm run fix-image-urls
```

### Option 2: Manual Database Fix
Update your projects in the database:
```javascript
// Move website URLs from imageUrls to liveLinks
{
  "imageUrls": ["https://actual-image.jpg"], // Only real images
  "liveLinks": ["https://revueo.ai", "https://demo.com"] // Website URLs
}
```

### Option 3: Admin Panel Fix
1. Go to Admin → Projects
2. Edit each project
3. Move website URLs from "Image URLs" to "Live Links"
4. Keep only actual image URLs in "Image URLs"

## 📋 **Valid Image URL Examples**

### ✅ **Valid (Will Work)**
```
https://res.cloudinary.com/demo/image/upload/sample.jpg
https://images.unsplash.com/photo-123456789
https://example.com/image.png
https://cdn.jsdelivr.net/npm/package/image.svg
```

### ❌ **Invalid (Will Be Filtered Out)**
```
https://revueo.ai
https://example.com
https://mywebsite.vercel.app
```

## 🎯 **Benefits**

- ✅ **No More Errors**: Next.js image errors eliminated
- ✅ **Automatic Filtering**: Invalid URLs filtered automatically
- ✅ **Graceful Fallback**: Shows placeholder when no valid images
- ✅ **Data Integrity**: Separates images from website links
- ✅ **Better UX**: Proper image display and navigation

## 🚀 **Result**

Your portfolio will now:
1. Display only valid images in carousels
2. Show website links in the "Live Links" section
3. Handle invalid image URLs gracefully
4. Work without Next.js configuration errors

The error should be completely resolved! 🎉