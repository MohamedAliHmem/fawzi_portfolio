// Client-side utility function to handle image paths with basePath
export function getImagePath(imagePath: string): string {
  // For production builds with GitHub Pages deployment
  const basePath = '/fawzi_portfolio';
  
  // If the path already includes the basePath, return as is
  if (imagePath.startsWith('/fawzi_portfolio/')) {
    return imagePath;
  }
  
  // If it's an absolute path starting with /, add basePath
  if (imagePath.startsWith('/')) {
    return `${basePath}${imagePath}`;
  }
  
  // For relative paths, return as is
  return imagePath;
}