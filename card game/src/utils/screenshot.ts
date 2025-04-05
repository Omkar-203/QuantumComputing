import html2canvas from 'html2canvas';

export async function captureElement(element: HTMLElement): Promise<string> {
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
    });
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Failed to capture screenshot:', error);
    return '';
  }
}