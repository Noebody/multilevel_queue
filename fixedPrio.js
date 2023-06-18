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

  // Process
  class Process {
    constructor(pid, priority, cpuTime, ioTime) {
      this.pid = pid;
      this.priority = priority;
      this.cpuTime = cpuTime;
      this.ioTime = ioTime;
    }
  }
  
  // Function to add a new process to the ready queue
  function addToReadyQueue(process) {
    // Add the process to the appropriate ready queue
    readyQueue[process.priority].push(process);
  }
  
  // CPU scheduler
  function cpuScheduler() {
    for (let priority = 2; priority >= 0; priority--) {
      // Check if there are any processes in the ready queue
      if (readyQueue[priority].length > 0) {
        // Get the first process in the queue
        currentProcess = readyQueue[priority].shift();
        // Stop checking
        break;
      }
    }

    // If there is a process to execute
    if (currentProcess) {
      // Execute the process for one time unit
      executeProcess(currentProcess);
      // If the process is not finished
      if (currentProcess.cpuTime > 0) {
        // Add the process back to the ready queue
        addToReadyQueue(currentProcess);
      }
      // Reset the current process
      currentProcess = null;
      // Call the scheduler again
      cpuScheduler();
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

    
  // Add some sample processes to the queue  
  addToReadyQueue(new Process(1, 0, 3, 0)); // LOW priority
  addToReadyQueue(new Process(2, 1, 6, 3)); // MEDIUM priority
  addToReadyQueue(new Process(3, 2, 4, 4)); // HIGH priority
  addToReadyQueue(new Process(4, 0, 5, 5)); // LOW priority
  addToReadyQueue(new Process(5, 1, 2, 7)); // MEDIUM priority
  console.log("ready queue:\n",readyQueue);

  
  // Call the scheduler
  cpuScheduler();
  

