// imagePathHelper.js

/**
 * Helper function to get the correct image path regardless of environment
 * @param {string} relativePath - The relative path to the image from the images folder
 * @return {string} The correct path to use for the image
 */
export const getImagePath = (relativePath) => {
  // Check if we're in a GitHub Pages or similar deployment environment
  const isGitHubPages = window.location.hostname.includes('github.io');
  const isProductionBuild = process.env.NODE_ENV === 'production';
  
  // Get the repository name from the pathname if it's GitHub Pages
  let repoName = '';
  if (isGitHubPages) {
    // Extract repository name from URL path
    const pathParts = window.location.pathname.split('/');
    if (pathParts.length > 1) {
      repoName = pathParts[1];
    }
  }
  
  // Determine the base path based on environment
  let basePath = '';
  
  if (isGitHubPages) {
    // GitHub Pages path: /{repo-name}/ format
    basePath = `/${repoName}`;
  } else if (isProductionBuild) {
    // Other production environments might need the PUBLIC_URL
    basePath = process.env.PUBLIC_URL || '';
  }
  
  // Make a more robust path that works with various structures
  const formattedPath = relativePath.startsWith('/') 
    ? relativePath 
    : `/${relativePath}`;
    
  return `${basePath}/images${formattedPath}`;
};

/**
 * Helper specifically for mascot images
 */
export const getMascotPath = (mascotFilename) => {
  return getImagePath(`/Mascots/${mascotFilename}`);
};

/**
 * Helper specifically for logo images
 */
export const getLogoPath = (logoFilename) => {
  return getImagePath(`/Logos/${logoFilename}`);
};