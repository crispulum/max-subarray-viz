import React from 'react';

const IndicesColumn = ({ length, currentIndex }) => {
  return (
    <div className="indices-column">
      <div className="header">Indices</div>
      {Array.from({ length }, (_, index) => (
        <div key={index} className={`cell ${index === currentIndex ? 'current' : ''}`}>{index}</div>
      ))}
    </div>
  );
};

export default IndicesColumn;