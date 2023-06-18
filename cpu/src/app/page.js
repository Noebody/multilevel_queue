"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";

export default function Home() {
  const [queue, setQueue] = useState([]);

  function createProcess(PID, priority, cpuTime, ioTime) {
    return {
      pid: PID,
      priority: priority,
      cpuTime: cpuTime,
      ioTime: ioTime,
    };
  }

  const sortedQueue = useMemo(() => {
    return queue.sort((a, b) => a.priority - b.priority);
  }, [queue]);

  console.log(sortedQueue);

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

    // Execute the process at the front of the process
    executeProcess(process[0]);

    // Execute the next process in the process
    processQueue();
  }

  useEffect(() => {
    setQueue([
      createProcess(1, 0, 3, 0),
      createProcess(2, 1, 6, 3),
      createProcess(3, 2, 4, 4),
      createProcess(4, 0, 5, 5),
      createProcess(5, 1, 2, 7),
    ]);
  }, []);

  return (
    <main className="">
      <h1>Process Scheduling with Multiple Queues</h1>
      <div>
        <table class="table-auto">
          <thead>
            <tr>
              <th class="px-4 py-2">Process</th>
              <th class="px-4 py-2">Arrival Time</th>
              <th class="px-4 py-2">Burst Time</th>
              <th class="px-4 py-2">Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">P1</td>
              <td class="border px-4 py-2">0</td>
              <td class="border px-4 py-2">8</td>
              <td class="border px-4 py-2">2</td>
            </tr>
            <tr class="bg-gray-100">
              <td class="border px-4 py-2">P2</td>
              <td class="border px-4 py-2">1</td>
              <td class="border px-4 py-2">4</td>
              <td class="border px-4 py-2">1</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">P3</td>
              <td class="border px-4 py-2">2</td>
              <td class="border px-4 py-2">9</td>
              <td class="border px-4 py-2">3</td>
            </tr>
            <tr class="bg-gray-100">
              <td class="border px-4 py-2">P4</td>
              <td class="border px-4 py-2">3</td>
              <td class="border px-4 py-2">5</td>
              <td class="border px-4 py-2">2</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">P5</td>
              <td class="border px-4 py-2">4</td>
              <td class="border px-4 py-2">2</td>
              <td class="border px-4 py-2">3</td>
            </tr>
          </tbody>
        </table>

        <table class="table-auto">
          <thead>
            <tr>
              <th class="px-4 py-2">Process</th>
              <th class="px-4 py-2">Arrival Time</th>
              <th class="px-4 py-2">Burst Time</th>
              <th class="px-4 py-2">Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">P1</td>
              <td class="border px-4 py-2">0</td>
              <td class="border px-4 py-2">8</td>
              <td class="border px-4 py-2">2</td>
            </tr>
            <tr class="bg-gray-100">
              <td class="border px-4 py-2">P2</td>
              <td class="border px-4 py-2">1</td>
              <td class="border px-4 py-2">4</td>
              <td class="border px-4 py-2">1</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">P3</td>
              <td class="border px-4 py-2">2</td>
              <td class="border px-4 py-2">9</td>
              <td class="border px-4 py-2">3</td>
            </tr>
            <tr class="bg-gray-100">
              <td class="border px-4 py-2">P4</td>
              <td class="border px-4 py-2">3</td>
              <td class="border px-4 py-2">5</td>
              <td class="border px-4 py-2">2</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">P5</td>
              <td class="border px-4 py-2">4</td>
              <td class="border px-4 py-2">2</td>
              <td class="border px-4 py-2">3</td>
            </tr>
          </tbody>
        </table>

        <table class="table-auto">
          <thead>
            <tr>
              <th class="px-4 py-2">Process</th>
              <th class="px-4 py-2">Arrival Time</th>
              <th class="px-4 py-2">Burst Time</th>
              <th class="px-4 py-2">Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">P1</td>
              <td class="border px-4 py-2">0</td>
              <td class="border px-4 py-2">8</td>
              <td class="border px-4 py-2">2</td>
            </tr>
            <tr class="bg-gray-100">
              <td class="border px-4 py-2">P2</td>
              <td class="border px-4 py-2">1</td>
              <td class="border px-4 py-2">4</td>
              <td class="border px-4 py-2">1</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">P3</td>
              <td class="border px-4 py-2">2</td>
              <td class="border px-4 py-2">9</td>
              <td class="border px-4 py-2">3</td>
            </tr>
            <tr class="bg-gray-100">
              <td class="border px-4 py-2">P4</td>
              <td class="border px-4 py-2">3</td>
              <td class="border px-4 py-2">5</td>
              <td class="border px-4 py-2">2</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">P5</td>
              <td class="border px-4 py-2">4</td>
              <td class="border px-4 py-2">2</td>
              <td class="border px-4 py-2">3</td>
            </tr>
          </tbody>
        </table>

        <table class="table-auto">
          <thead>
            <tr>
              <th class="px-4 py-2">Process</th>
              <th class="px-4 py-2">Arrival Time</th>
              <th class="px-4 py-2">Burst Time</th>
              <th class="px-4 py-2">Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">P1</td>
              <td class="border px-4 py-2">0</td>
              <td class="border px-4 py-2">8</td>
              <td class="border px-4 py-2">2</td>
            </tr>
            <tr class="bg-gray-100">
              <td class="border px-4 py-2">P2</td>
              <td class="border px-4 py-2">1</td>
              <td class="border px-4 py-2">4</td>
              <td class="border px-4 py-2">1</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">P3</td>
              <td class="border px-4 py-2">2</td>
              <td class="border px-4 py-2">9</td>
              <td class="border px-4 py-2">3</td>
            </tr>
            <tr class="bg-gray-100">
              <td class="border px-4 py-2">P4</td>
              <td class="border px-4 py-2">3</td>
              <td class="border px-4 py-2">5</td>
              <td class="border px-4 py-2">2</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">P5</td>
              <td class="border px-4 py-2">4</td>
              <td class="border px-4 py-2">2</td>
              <td class="border px-4 py-2">3</td>
            </tr>
          </tbody>
        </table>

        <table class="table-auto" id="table-4">
          <thead>
            <tr>
              <th class="px-4 py-2">Process</th>
              <th class="px-4 py-2">Arrival Time</th>
              <th class="px-4 py-2">Burst Time</th>
              <th class="px-4 py-2">Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">P1</td>
              <td class="border px-4 py-2">0</td>
              <td class="border px-4 py-2">8</td>
              <td class="border px-4 py-2">2</td>
            </tr>
            <tr class="bg-gray-100">
              <td class="border px-4 py-2">P2</td>
              <td class="border px-4 py-2">1</td>
              <td class="border px-4 py-2">4</td>
              <td class="border px-4 py-2">1</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">P3</td>
              <td class="border px-4 py-2">2</td>
              <td class="border px-4 py-2">9</td>
              <td class="border px-4 py-2">3</td>
            </tr>
            <tr class="bg-gray-100">
              <td class="border px-4 py-2">P4</td>
              <td class="border px-4 py-2">3</td>
              <td class="border px-4 py-2">5</td>
              <td class="border px-4 py-2">2</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">P5</td>
              <td class="border px-4 py-2">4</td>
              <td class="border px-4 py-2">2</td>
              <td class="border px-4 py-2">3</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div></div>
    </main>
  );
}
