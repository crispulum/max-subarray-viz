import React from 'react';

const ArrayGrid = ({ inputArray, currentIndex, highlightedCells, maxSubarray, currentElement }) => {
  return (
    <div className="array-grid">
      <div key='gridHeader' className='row'>
        <div className='headerCell cell'>{inputArray.toString()}</div>
      </div>
      {inputArray.map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          {inputArray.map((value, colIndex) => {
            // I hate react. This was so much easier with vanilla DOM manipulation.
            // 
            const isInMaxSubarray = rowIndex >= maxSubarray.end && 
                                    rowIndex < currentIndex &&
                                    colIndex >= maxSubarray.start && 
                                    colIndex <= maxSubarray.end;
            return (
              <div 
                key={colIndex} 
                className={`cell 
                  ${colIndex <= rowIndex ? 'active' : ''}
                  ${colIndex === currentIndex && rowIndex === currentIndex ? 'current' : ''}
                  ${highlightedCells.includes(colIndex) && rowIndex === currentIndex ? 'highlighted' : ''}
                  ${isInMaxSubarray  ? 'max-subarray' : ''}
                  ${colIndex === currentElement && rowIndex === currentIndex ? 'current-element' : ''}
                `}
              >
                {colIndex <= rowIndex ? value : ''}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
export default ArrayGrid;