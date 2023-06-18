// create an algorith for fixed priority scheduling

// Process
class Process {
  constructor(pid, priority, cpuTime, ioTime) {
    this.pid = pid;
    this.priority = priority;
    this. = cpuTime;
    this.ioTime = ioTime;
  }
}
// Ready queue for each priority level
let queue = [];

// Function to add a new process to the ready queue
function addToQueue(process) {
  // If queue is empty, add the process
  if (queue.length == 0) {
    queue.push(process);
    return;
  }

  // Find the position to insert the process
  let i = 0;
  while (i < queue.length && queue[i].priority >= process.priority) {
    i++;
  }
  // Insert the process at the position
  queue.splice(i, 0, process);

  // Print the ready queue
  console.log("Ready queue: ");
  for (let i = 0; i < queue.length; i++) {
    console.log(
      `Process ${queue[i].pid} Priority ${queue[i].priority} CPU time ${queue[i].cpuTime} I/O time ${queue[i].ioTime}`
    );
  }
}

// Function to execute a process for one time unit
function executeProcess(process) {
  // Print the process being executed
  console.log(`Executing process ${process.pid}`);

  // Decrement the CPU time
  process.cpuTime--;

  // If CPU time is zero, remove the process from the queue
  if (process.cpuTime == 0) {
    console.log(`Process ${process.pid} completed`);
    queue.shift();
  }
}

function processQueue() {
  // If queue is empty, return
  if (queue.length == 0) {
    console.log("No more processes to execute");
    return;
  }

  // Execute the process at the front of the queue
  executeProcess(queue[0]);

  // Execute the next process in the queue
  processQueue();
}

// Add some sample processes to the queue
addToQueue(new Process(1, 0, 3, 0)); // LOW priority
addToQueue(new Process(2, 1, 6, 3)); // MEDIUM priority
addToQueue(new Process(3, 2, 4, 4)); // HIGH priority
addToQueue(new Process(4, 0, 5, 5)); // LOW priority
addToQueue(new Process(5, 1, 2, 7)); // MEDIUM priority

// Call the scheduler
processQueue();
