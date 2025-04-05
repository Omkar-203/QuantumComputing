import React from 'react';

interface LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function Link({ href, className, children }: LinkProps) {
  // Since this is a single page app, we'll just render an anchor for now
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}