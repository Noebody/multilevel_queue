// create an algorith for fixed priority scheduling



const PRIORITY_LEVELS = {
    0: 'LOW',
    1: 'MEDIUM', 
    2: 'HIGH' 
  };
  
  // Ready queue for each priority level
  let readyQueue = {
    0: [],   // Low priority queue
    1: [],   // Medium priority queue
    2: []    // High priority queue 
  };
  
  // Currently executing process 
  let currentProcess = null; 
  
  // Function to add a new process to the ready queue
  function addToReadyQueue(process) {
    // Add the process to the appropriate ready queue
    readyQueue[process.priority].push(process);
  }
  
  // CPU scheduler
  function cpuScheduler() {
    // Check if there is a process currently executing
    if (currentProcess !== null) {
      // Check if the current process has completed its CPU burst
      if (currentProcess.cpuTime === 0) {
        // Terminate the current process
        terminateProcess(currentProcess);
      } else {
        // Lower the priority of the current process
        currentProcess.priority = Math.max(currentProcess.priority - 1, 0);
        // Move the current process to the back of the ready queue
        addToReadyQueue(currentProcess);
      }
    }
  
    // Check if there is a process in the high priority queue
    if (readyQueue[2].length > 0) {
      // Get the first process from the high priority queue
      currentProcess = readyQueue[2].shift();
    }
    // Check if there is a process in the medium priority queue
    else if (readyQueue[1].length > 0) {
      // Get the first process from the medium priority queue
      currentProcess = readyQueue[1].shift();
    }
    // Check if there is a process in the low priority queue
    else if (readyQueue[0].length > 0) {
      // Get the first process from the low priority queue
      currentProcess = readyQueue[0].shift();
    }
  
    // Check if there is a process currently executing
    if (currentProcess !== null) {
      // Execute the current process for one time unit
      executeProcess(currentProcess);
    }
    
  }
  
  // time variable
  let time = 0;

  // Function to execute a process for one time unit
  function executeProcess(process) {
    // Decrement the CPU burst of the process
    process.cpuTime--;
    // Increment the time
    time++;
    // Print the time and process ID
    console.log(`Time ${time}: Process ${process.pid} is running`);
  }




  
  // Process
  class Process {
    constructor(pid, priority, cpuTime) {
      this.pid = pid;
      this.priority = priority;
      this.cpuTime = cpuTime;
    }
  }
    
  // Add some sample processes to the queue  
  addToReadyQueue(new Process(1, 2, 10));   // High priority 
  addToReadyQueue(new Process(2, 0, 5));     // Low priority
  addToReadyQueue(new Process(3, 1, 20));   // Medium priority

  
  // Call the scheduler
  cpuScheduler();
  

