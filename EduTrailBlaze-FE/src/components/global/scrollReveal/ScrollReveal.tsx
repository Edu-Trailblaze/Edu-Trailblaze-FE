'use client'
import React from 'react';
import { useInView } from 'react-intersection-observer';

interface ScrollRevealProps {
  children: React.ReactNode;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={`scroll-reveal ${inView ? 'visible' : 'hidden'}`}>
      {children}
    </div>
  );
};

export default ScrollReveal;