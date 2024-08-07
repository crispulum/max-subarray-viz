import React from 'react';

const SumColumns = ({ currentSums, maxSums, currentIndex }) => {
  return (
    <div className="sum-columns">
      <div className="column">
        <div className="header">Curr Sum</div>
        {currentSums.map((sum, index) => (
          <div key={index} className={`cell ${index === currentIndex ? 'current' : ''}`}>
            {index <= currentIndex ? sum : ''}
          </div>
        ))}
      </div>
      <div className="column">
        <div className="header">Max Sum</div>
        {maxSums.map((sum, index) => (
          <div key={index} className={`cell ${index === currentIndex ? 'current' : ''}`}>
            {index <= currentIndex ? sum : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SumColumns;