/**
 * Utility to handle asset paths with basePath for GitHub Pages deployment
 */
export function assetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/fawzi_portfolio' : '';
  
  // If the path already contains the basePath, return it as is
  if (path.startsWith('/fawzi_portfolio/')) {
    return path;
  }
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${basePath}/${cleanPath}`;
}