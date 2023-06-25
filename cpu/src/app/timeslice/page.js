"use client";

import { useState, useEffect } from "react";

const page = () => {
  //--------------------//
  // Time Slicing Scheduling //
  //create three queues with different priorities (high, mid, low)
  const [messages, setMessages] = useState([]);
  const [ms, setTotalMs] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [currentQueue, setCurrentQueue] = useState("highPrioQueue");

  const [queue, setQueue] = useState({
    highPrioQueue: [],
    midPrioQueue: [],
    lowPrioQueue: [],
  });

  console.log(ms);

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
      createProcess(1, 0, 30, 0),
      createProcess(2, 1, 60, 0),
      createProcess(3, 2, 40, 0),
      createProcess(4, 0, 50, 0),
      createProcess(5, 1, 20, 0),
    ];
    function addProcessToQueue(processes) {
      // Add the processes to the queue based on priority
      processes.forEach((process) => {
        if (process.priority == 0) {
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
        if (process.priority == 2) {
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

  function getExecutableProcess(process) {
    if (process.priority == 0 && process.cpuTime - 10 <= 0) {
      return true;
    }
    if (process.priority == 1 && process.cpuTime - 6 <= 0) {
      return true;
    }
    if (process.priority == 2 && process.cpuTime - 4 <= 0) {
      return true;
    }
    return false;
  }

  // Function to execute a process
  async function executeProcessBySlicing(process) {
    let time = 0;

    console.log("process", process);

    // Print the process being executed
    if (getExecutableProcess(process)) {
      if (process.priority == 0) {
        time = time + process.cpuTime;
        setTotalMs((prev) => prev + time);

        setQueue((prev) => {
          if (process.priority == 0) {
            return {
              ...prev,
              highPrioQueue: prev.highPrioQueue.filter(
                (p) => p.pid !== process.pid
              ),
            };
          }
        });

        return setMessages((prev) => {
          return [
            ...prev,
            // `Executing high priority process ${process.pid} with CPU time ${process.cpuTime}`,
            `Process ${process.pid} completed`,
          ];
        });
      }

      if (process.priority == 1) {
        time = time + process.cpuTime;
        setTotalMs((prev) => prev + time);

        setQueue((prev) => {
          if (process.priority == 1) {
            return {
              ...prev,
              midPrioQueue: prev.midPrioQueue.filter(
                (p) => p.pid !== process.pid
              ),
            };
          }
        });

        return setMessages((prev) => {
          return [
            ...prev,
            // `Executing high priority process ${process.pid} with CPU time ${process.cpuTime}`,
            `Process ${process.pid} completed`,
          ];
        });
      }

      if (process.priority == 2) {
        time = time + process.cpuTime;
        setTotalMs((prev) => prev + time);

        setQueue((prev) => {
          if (process.priority == 2) {
            return {
              ...prev,
              lowPrioQueue: prev.lowPrioQueue.filter(
                (p) => p.pid !== process.pid
              ),
            };
          }
        });

        return setMessages((prev) => {
          return [
            ...prev,
            // `Executing high priority process ${process.pid} with CPU time ${process.cpuTime}`,
            `Process ${process.pid} completed`,
          ];
        });
      }
    }

    if (process.priority == 0) {
      setMessages((prev) => {
        return [...prev, `High-prio P${process.pid}: ${process.cpuTime}`];
      });
      process.cpuTime -= 10;
      time = time + 10;

      setQueue((prev) => {
        const highPrioProcess = prev.highPrioQueue.find(
          (p) => p.pid == process.pid
        );
        if (highPrioProcess) {
          return {
            ...prev,
            highPrioQueue: [
              ...prev.highPrioQueue.filter((p) => p.pid !== process.pid),
              highPrioProcess,
            ],
          };
        }
      });
    }

    if (process.priority == 1) {
      setMessages((prev) => {
        return [...prev, `Mid-prio P${process.pid}: ${process.cpuTime}`];
      });
      process.cpuTime -= 6;
      if (process.cpuTime - 6 < 0) {
        setCurrentQueue((prevQueue) => {
          return "highPrioQueue";
        });
      }
      time = time + 6;
    }

    if (process.priority == 2) {
      setMessages((prev) => {
        return [...prev, `Low-prio P${process.pid}: ${process.cpuTime}`];
      });
      process.cpuTime -= 4;
      if (process.cpuTime - 4) time = time + 4;
    }

    setTotalMs((prev) => {
      return prev + time;
    });

    // If CPU time is zero, remove the process from the queue
  }

  // Function to process the priority queues
  function processQueueBySlicing() {
    // If all queues are empty, return

    setQueue((prev) => {
      setCurrentQueue((prevQueue) => {
        prev[prevQueue].length !== 0 &&
          executeProcessBySlicing(prev[prevQueue][0]);
        if (prevQueue === "lowPrioQueue") {
          return "highPrioQueue";
        }
        if (prevQueue === "highPrioQueue") {
          return "midPrioQueue";
        }
        return "lowPrioQueue";
      });
      if (
        prev.highPrioQueue.length == 0 &&
        prev.midPrioQueue.length == 0 &&
        prev.lowPrioQueue.length == 0
      ) {
        setMessages((prev) => {
          return [...prev, `All processes completed`];
        });

        setIntervalId((prev) => {
          console.log(prev);
          clearInterval(prev);
          return null;
        });
      }
      return prev;
    });
  }

  return (
    <div>
      <h1 className="text-xl font-bold p-4">Time-slice Scheduling</h1>
      <div>
        <table className="table-auto mx-16 my-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Process</th>
              <th className="px-4 py-2">Priority</th>
              <th className="px-4 py-2">Burst Time</th>
              <th className="px-4 py-2">Arrival Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">P1</td>
              <td className="border px-4 py-2">0</td>
              <td className="border px-4 py-2">30</td>
              <td className="border px-4 py-2">0</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2">P2</td>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">60</td>
              <td className="border px-4 py-2">0</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">P3</td>
              <td className="border px-4 py-2">2</td>
              <td className="border px-4 py-2">40</td>
              <td className="border px-4 py-2">0</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2">P4</td>
              <td className="border px-4 py-2">0</td>
              <td className="border px-4 py-2">50</td>
              <td className="border px-4 py-2">0</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">P5</td>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">20</td>
              <td className="border px-4 py-2">0</td>
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
                setTotalMs((ms) => {
                  setMessages((prev) => {
                    return [...prev, `Ms: ${ms}`];
                  });
                  return ms;
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
