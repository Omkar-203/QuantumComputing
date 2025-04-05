import html2canvas from 'html2canvas';

export const captureScreenshot = async (): Promise<string> => {
  try {
    const element = document.querySelector('main');
    if (!element) throw new Error('Main element not found');

    // Use higher scale for better quality downloaded image
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2, // Higher scale for better quality
      logging: false,
      useCORS: true,
      allowTaint: true,
      width: element.clientWidth,
      height: element.clientHeight
    });
    
    // Return full quality image
    return canvas.toDataURL('image/png', 1.0);
  } catch (error) {
    console.error('Screenshot error:', error);
    return '';
  }
};