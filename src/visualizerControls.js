import React, { useState } from 'react';

const VisualizerControls = ({ onArraySubmit, onPauseToggle }) => {
  const [arrayInput, setArrayInput] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  const handleInputChange = (e) => {
    setArrayInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // error handling could use some work
    const newArray = arrayInput.split(',').map(num => parseInt(num.trim(), 10));
    if (newArray.every(num => !isNaN(num))) {
      onArraySubmit(newArray);
      setArrayInput('');
    } else {
      alert('Please enter valid numbers separated by commas');
    }
  };
  // ... perhaps I should simply use one piece of state instead
  const togglePause = () => {
    setIsPaused(!isPaused);
    onPauseToggle(!isPaused);
  };

  return (
    <div className="visualizer-controls">
      <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={arrayInput}
          onChange={handleInputChange}
          placeholder="Enter numbers separated by commas"
        />
        <div>
        <button type="submit">Submit</button>
        
        </div>
        
      </form>
      <button onClick={togglePause}>{isPaused ? 'Resume' : 'Pause'}</button>
      </div>
      
    </div>
  );
};

export default VisualizerControls;