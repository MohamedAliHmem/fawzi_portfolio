// Client-side utility function to handle image paths with basePath
export function getImagePath(imagePath: string): string {
  // Only add basePath in production (when building for GitHub Pages)
  // In development, use images as-is
  const isProduction = process.env.NODE_ENV === 'production';
  const basePath = isProduction ? '/fawzi_portfolio' : '';
  
  // If the path already includes the basePath, return as is
  if (imagePath.startsWith('/fawzi_portfolio/')) {
    return imagePath;
  }
  
  // If it's an absolute path starting with /, add basePath if in production
  if (imagePath.startsWith('/')) {
    return `${basePath}${imagePath}`;
  }
  
  // For relative paths, return as is
  return imagePath;
}