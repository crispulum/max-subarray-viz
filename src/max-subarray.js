const maxSubarrayFlop = (arr) => {
  let maxSum = -Infinity; 
  let currentSum = 0; 

  for (let i = 0; i < arr.length; i++) {
    currentSum = 0; 
    for (let j = i; j < arr.length; j++) {

      currentSum += arr[j];
      maxSum = Math.max(maxSum, currentSum);
    }
  }

  return maxSum;
}

const input1 = [1, -20, 4, 10, -4, 7, 2, -5];
const input2 = [15, 20, -5, 10];
console.log(maxSubarrayFlop(input1)) //expect 19 - [4, 10, -4, 7, 2]
console.log(maxSubarrayFlop(input2)) //expect 40 - [15, 20, -5, 10]

function maxSubarraySlay(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
      //should we make a new currentSum, or continue our previous one?
        currentSum = Math.max(nums[i], currentSum + nums[i]);
      //track the max
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

//console.log(maxSubarraySlay(input1));  //expect 19 - [4, 10, -4, 7, 2]
//console.log(maxSubarraySlay(input2));  //expect 40 - [15, 20, -5, 10]