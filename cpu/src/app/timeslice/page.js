"use client";

import { useState, useEffect } from "react";

const page = () => {
  //--------------------//
  // Time Slicing Scheduling //
  //create three queues with different priorities (high, mid, low)
  const [messages, setMessages] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const [queue, setQueue] = useState({
    highPrioQueue: [],
    midPrioQueue: [],
    lowPrioQueue: [],
  });

  //   console.log(queue);

  function createProcess(PID, priority, cpuTime, ioTime) {
    return {
      pid: PID,
      priority: priority,
      cpuTime: cpuTime,
      ioTime: ioTime,
      done: false,
    };
  }

  useEffect(() => {
    const array = [
      createProcess(1, 0, 3, 0),
      createProcess(2, 1, 6, 3),
      createProcess(3, 2, 4, 4),
      createProcess(4, 0, 5, 5),
      createProcess(5, 1, 2, 7),
    ];
    function addProcessToQueue(processes) {
      // Add the processes to the queue based on priority
      processes.forEach((process) => {
        if (process.priority == 2) {
          setQueue((prev) => {
            return {
              ...prev,
              highPrioQueue: [...prev.highPrioQueue, process],
            };
          });
        } else if (process.priority == 1) {
          setQueue((prev) => {
            return {
              ...prev,
              midPrioQueue: [...prev.midPrioQueue, process],
            };
          });
        }
        if (process.priority == 0) {
          setQueue((prev) => {
            return {
              ...prev,
              lowPrioQueue: [...prev.lowPrioQueue, process],
            };
          });
        }
      });
    }
    addProcessToQueue(array);
  }, []);

  // Function to execute a process
  async function executeProcessBySlicing(process) {
    // Print the process being executed
    if (process.cpuTime == 0) {
      setQueue((prev) => {
        if (process.priority == 2) {
          return {
            ...prev,
            highPrioQueue: prev.highPrioQueue.filter(
              (p) => p.pid !== process.pid
            ),
          };
        }
        if (process.priority == 1) {
          return {
            ...prev,
            midPrioQueue: prev.midPrioQueue.filter(
              (p) => p.pid !== process.pid
            ),
          };
        }
        if (process.priority == 0) {
          return {
            ...prev,
            lowPrioQueue: prev.lowPrioQueue.filter(
              (p) => p.pid !== process.pid
            ),
          };
        }
      });
      return setMessages((prev) => {
        return [...prev, `Process ${process.pid} completed`];
      });
    }
    // Decrement the CPU time based on priority

    if (process.priority == 2) {
      setMessages((prev) => {
        return [
          ...prev,
          `Executing high priority process ${process.pid} with CPU time ${process.cpuTime}`,
        ];
      });
      process.cpuTime -= 1;
    }

    if (process.priority == 1) {
      setMessages((prev) => {
        return [
          ...prev,
          `Executing mid priority process ${process.pid} with CPU time ${process.cpuTime}`,
        ];
      });
      process.cpuTime -= 0.5;
    }

    if (process.priority == 0) {
      setMessages((prev) => {
        return [
          ...prev,
          `Executing low priority process ${process.pid} with CPU time ${process.cpuTime}`,
        ];
      });
      process.cpuTime -= 0.25;
    }
    // If CPU time is zero, remove the process from the queue
  }

  // Function to process the priority queues
  function processQueueBySlicing() {
    // If all queues are empty, return
    if (
      queue.highPrioQueue.length == 0 &&
      queue.midPrioQueue.length == 0 &&
      queue.lowPrioQueue.length == 0
    ) {
      setMessages((prev) => {
        return [...prev, `All processes completed`];
      });
      clearInterval(intervalId);
      setIntervalId(null);
      return;
    }

    // Execute the process at the front of the process
    setQueue((prev) => {
      if (prev.highPrioQueue.length > 0) {
        executeProcessBySlicing(prev.highPrioQueue[0]);
      }

      if (prev.midPrioQueue.length > 0) {
        executeProcessBySlicing(prev.midPrioQueue[0]);
      }

      if (prev.lowPrioQueue.length > 0) {
        executeProcessBySlicing(prev.lowPrioQueue[0]);
      }
      return prev;
    });

    // Execute the next process in the process
  }

  return (
    <div>
      <h1 className="text-xl font-bold p-4">Time-slice Scheduling</h1>
      <div>
        <table class="table-auto mx-16 my-4">
          <thead>
            <tr>
              <th class="px-4 py-2">Process</th>
              <th class="px-4 py-2">Priority</th>
              <th class="px-4 py-2">Burst Time</th>
              <th class="px-4 py-2">Arrival Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">P1</td>
              <td class="border px-4 py-2">0</td>
              <td class="border px-4 py-2">3</td>
              <td class="border px-4 py-2">0</td>
            </tr>
            <tr class="bg-gray-100">
              <td class="border px-4 py-2">P2</td>
              <td class="border px-4 py-2">1</td>
              <td class="border px-4 py-2">6</td>
              <td class="border px-4 py-2">3</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">P3</td>
              <td class="border px-4 py-2">2</td>
              <td class="border px-4 py-2">4</td>
              <td class="border px-4 py-2">4</td>
            </tr>
            <tr class="bg-gray-100">
              <td class="border px-4 py-2">P4</td>
              <td class="border px-4 py-2">0</td>
              <td class="border px-4 py-2">5</td>
              <td class="border px-4 py-2">5</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">P5</td>
              <td class="border px-4 py-2">1</td>
              <td class="border px-4 py-2">2</td>
              <td class="border px-4 py-2">3</td>
            </tr>
          </tbody>
        </table>

        <button
          className="p-2 bg-blue-500 rounded-md text-white mt-4 mx-16 my-4"
          onClick={() => {
            if (!intervalId) {
              const interval = setInterval(() => {
                processQueueBySlicing();
                // setSecondsLine((prev) => {
                //   return [...prev, <div>{prev.length + 1}</div>];
                // });
                setSeconds((second) => {
                  setMessages((prev) => {
                    return [...prev, `Second: ${second}`];
                  });
                  return second + 1;
                });
              }, 1000);
              setIntervalId(interval);
            } else {
              clearInterval(intervalId);
              setIntervalId(null);
            }
          }}
        >
          {intervalId ? "Stop" : "Start"}
        </button>

        {/* add a number of  */}

        {messages.map((message, index) => {
          return (
            <div key={index} className="py-2 mx-16 my-4">
              {message}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
