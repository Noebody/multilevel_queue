// create an algorith for time slicing scheduling

// Process
class Process {
  constructor(pid, priority, cpuTime, ioTime) {
    this.pid = pid;
    this.priority = priority;
    this.cpuTime = cpuTime;
    this.ioTime = ioTime;
  }
}

let highPrioQueue = [];
let lowPrioQueue = [];
let midPrioQueue = [];

// Function to add a new process to the ready queue
function addToQueue(process) {
  // If process priority is 2, add the process to the high priority queue
  if (process.priority == 2) {
    highPrioQueue.push(process);
  }
  // If process priority is 1, add the process to the mid priority queue
  else if (process.priority == 1) {
    midPrioQueue.push(process);
  }
  // If process priority is 0, add the process to the low priority queue
  else {
    lowPrioQueue.push(process);
  }

  // Print the ready queue
  console.log("Ready queue: ");
  for (let i = 0; i < highPrioQueue.length; i++) {
    console.log(
      `Process ${highPrioQueue[i].pid} Priority ${highPrioQueue[i].priority} CPU time ${highPrioQueue[i].cpuTime} I/O time ${highPrioQueue[i].ioTime}`
    );
  }
  for (let i = 0; i < midPrioQueue.length; i++) {
    console.log(
      `Process ${midPrioQueue[i].pid} Priority ${midPrioQueue[i].priority} CPU time ${midPrioQueue[i].cpuTime} I/O time ${midPrioQueue[i].ioTime}`
    );
  }
  for (let i = 0; i < lowPrioQueue.length; i++) {
    console.log(
      `Process ${lowPrioQueue[i].pid} Priority ${lowPrioQueue[i].priority} CPU time ${lowPrioQueue[i].cpuTime} I/O time ${lowPrioQueue[i].ioTime}`
    );
  }
}

// Function to execute a process for one time unit
function executeProcess(process) {
  // Print the process being executed
  console.log(`Executing process ${process.pid}`);

  // Decrement the CPU time based on priority
  if (process.priority == 2) {
    process.cpuTime -= 1; //  4/7 as fraction
  } else if (process.priority == 1) {
    process.cpuTime -= 0.5; //  2/7 as fraction
  } else {
    process.cpuTime -= 0.25; //  1/7 as fraction
  }

  // If CPU time is zero, remove the process from the queue
  if (process.cpuTime == 0) {
    console.log(`Process ${process.pid} completed`);
    if (process.priority == 2) {
      highPrioQueue.shift();
    } else if (process.priority == 1) {
      midPrioQueue.shift();
    } else {
      lowPrioQueue.shift();
    }
  }
}

function processQueue() {
  while (
    highPrioQueue.length > 0 ||
    midPrioQueue.length > 0 ||
    lowPrioQueue.length > 0
  ) {
    // If high priority queue is not empty, execute the first process
    if (highPrioQueue.length > 0) {
      executeProcess(highPrioQueue[0]);
    } else {
      console.log("No high priority process");
    }

    // If mid priority queue is not empty, execute the first process
    if (midPrioQueue.length > 0) {
      executeProcess(midPrioQueue[0]);
    } else {
      console.log("No mid priority process");
    }

    // If low priority queue is not empty, execute the first process
    if (lowPrioQueue.length > 0) {
      executeProcess(lowPrioQueue[0]);
    } else {
      console.log("No low priority process");
    }
  }
}

// Create processes
let p1 = new Process(1, 2, 7, 2);
let p2 = new Process(2, 1, 4, 1);
let p3 = new Process(3, 0, 1, 4);
let p4 = new Process(4, 1, 4, 4);
let p5 = new Process(5, 2, 5, 1);

// Add processes to the ready queue
addToQueue(p1);
addToQueue(p2);
addToQueue(p3);
addToQueue(p4);
addToQueue(p5);

// Execute processes
processQueue();
processQueue();
