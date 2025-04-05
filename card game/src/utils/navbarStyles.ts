export function getNavbarBackground(isScrolled: boolean, isHomePage: boolean): string {
  if (isScrolled) {
    return 'bg-indigo-900/90 backdrop-blur-sm shadow-lg';
  }
  return isHomePage ? 'bg-transparent' : 'bg-indigo-900/90 backdrop-blur-sm';
}