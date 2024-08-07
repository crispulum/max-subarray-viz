import React, { useState, useEffect, useRef } from 'react';
import IndicesColumn from './IndicesColumn';
import ArrayGrid from './ArrayGrid';
import SumColumns from './SumColumns';
import VisualizerControls from './visualizerControls';
import './AlgorithmVisualizer.css';

const AlgorithmVisualizer = () => {
  const [inputArray, setInputArray] = useState([-1, 2, -33, 4, 5]);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(isPaused);

const [currentIndex, setCurrentIndex] = useState(-1);
const [currentSums, setCurrentSums] = useState([" ", " ", " ", " ", " "]);
const [maxSums, setMaxSums] = useState([" ", " ", " ", " ", " "]);
const [highlightedCells, setHighlightedCells] = useState([]);
const [maxSubarray, setMaxSubarray] = useState({ start: -1, end: -1 });
const [isRunning, setIsRunning] = useState(false);
const [currentElement, setCurrentElement] = useState(-1);


  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    console.log('outer called')
    let isCancelled = false;
    
    async function kadane(array) {
      setIsRunning(true);
      let overallMaxSum = array[0];
      let overallStart = 0;
      let overallEnd = 0;
      
      const newCurrentSums = new Array(array.length).fill(0);
      const newMaxSums = new Array(array.length).fill(0);
      
      for (let i = 0; i < array.length+1 && !isCancelled; i++) {
        
        // terrible hack to render correctly if the final subarray includes the final ele
        if (i === array.length) { setCurrentIndex(i); break;}
        setCurrentIndex(i);
        setCurrentElement(i);
        while (isPausedRef.current && !isCancelled) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        await new Promise(resolve => setTimeout(resolve, 1000))
        // first row? it's just the first ele
        if (i === 0) {
          newCurrentSums[i] = array[i];
          newMaxSums[i] = array[i];
        } else {
          // ...otherwise, newCurrentSums[i] is the max of either starting a new array, 
          // or including the new ele in the old max array
          newCurrentSums[i] = Math.max(array[i], newCurrentSums[i-1] + array[i]);
          newMaxSums[i] = Math.max(newMaxSums[i-1], newCurrentSums[i]);
        }
        // all the highlights are handled by conditional css classes, which was certainly a decision I made
        setCurrentSums([...newCurrentSums]);
        setMaxSums([...newMaxSums]);
        
        if (newCurrentSums[i] === array[i]) {
          setHighlightedCells([i]);
        } else {
          setHighlightedCells(prev => [...prev, i]);
        }
        while (isPausedRef.current && !isCancelled) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        if (newMaxSums[i] > overallMaxSum) {
          //grab indeces. this might cause issues?
          overallMaxSum = newMaxSums[i];
          overallEnd = i;
          let tempStart = i;
          while (tempStart > 0 && newCurrentSums[tempStart-1] > 0) {
            tempStart--;
          }
          overallStart = tempStart;
          setMaxSubarray({ start: overallStart, end: overallEnd });
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        while (isPausedRef.current && !isCancelled) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      await new Promise(resolve => setTimeout(resolve, 200));
      setIsRunning(false);
      return overallMaxSum;
    }

    kadane(inputArray)
    return () => {
      isCancelled = true
    }
  }, [inputArray])


  const handleArraySubmit = (newArray) => {
    setInputArray(newArray);
    setCurrentIndex(-1);
    setCurrentSums([]);
    setMaxSums([]);
    setHighlightedCells([]);
    setMaxSubarray({ start: -1, end: -1 });
    setIsRunning(false);
  };

  const handlePauseToggle = (pauseState) => {
    setIsPaused(pauseState);
  };

  return (
    <div className="algorithm-visualizer">
      <VisualizerControls 
        onArraySubmit={handleArraySubmit}
        onPauseToggle={handlePauseToggle}
        isRunning={isRunning}
      />
      <div className="visualizer-grid">
        <IndicesColumn length={inputArray.length} currentIndex={currentIndex} />
        <ArrayGrid 
          inputArray={inputArray} 
          currentIndex={currentIndex}
          highlightedCells={highlightedCells}
          maxSubarray={maxSubarray}
          currentElement={currentElement}
        />
        <SumColumns 
          currentSums={currentSums} 
          maxSums={maxSums} 
          currentIndex={currentIndex}
        />
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;