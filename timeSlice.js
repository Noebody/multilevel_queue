// Time slice 
const TIME_SLICE = 5;  

// Ready queue 
let readyQueue = [];  

// Currently executing process
let currentProcess = null;  

// Function to add a new process to ready queue
function addToReadyQueue(process) {
  readyQueue.push(process); 
}

// CPU scheduler
function cpuScheduler() {
  // While there are processes in the ready queue or a process is executing
  while(readyQueue.length > 0 || currentProcess != null) {
    
    // If a process was preempted, add it back to ready queue
    if(currentProcess != null) {
      readyQueue.push(currentProcess); 
      currentProcess = null; 
    }  
    
    // Pick the next process from ready queue
    currentProcess = readyQueue.shift();  
    
    // Execute the process for 1 unit time 
    currentProcess.cpuTime--;  
    
    // If process completes, continue 
    if(currentProcess.cpuTime == 0) continue; 
    
    // Preempt the process and add back to ready queue 
    if(currentProcess.timer == TIME_SLICE) {
      currentProcess.timer = 0;   // Reset timer
      addToReadyQueue(currentProcess);
      currentProcess = null; 
    } else {
      currentProcess.timer++;  // Increment timer
    }
  }
}

// Process
function Process(id, cpuTime) {
  this.id = id; 
  this.cpuTime = cpuTime;     // Remaining CPU time
  this.timer = 0;            // Timer for time slice
}

// Add some sample processes to the queue
addToReadyQueue(new Process(1, 10));
addToReadyQueue(new Process(2, 5)); 
addToReadyQueue(new Process(3, 20));

// Call the scheduler
cpuScheduler();