import React from 'react';
import './style.css';

const Loading: React.FC = () => {
  return (
    <section>
      <div className="loader">
        {[...Array(20)].map((_, index) => (
          <span
            key={index}
            style={{ '--i': index + 1 } as React.CSSProperties}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Loading;
