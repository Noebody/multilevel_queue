"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
      createProcess(1, 0, 20, 0),
      createProcess(2, 1, 36, 0),
      createProcess(3, 2, 12, 0),
      createProcess(4, 0, 40, 0),
      createProcess(5, 1, 24, 0),
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

    // console.log("process", process);

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
            `P${process.pid} out`,
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
            `P${process.pid} out`,
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
            `P${process.pid} out`,
          ];
        });
      }
    }

    if (process.priority == 0) {
      setMessages((prev) => {
        return [...prev, `P${process.pid}`];
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
        return [...prev, `P${process.pid}`];
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
        return [...prev, `P${process.pid}`];
      });
      process.cpuTime -= 4;
      time = time + 4;
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

        //looping through the queues to find the next process to execute based on priority
        if (prevQueue === "lowPrioQueue") {
          if (prev.highPrioQueue.length !== 0) {
            return "highPrioQueue";
          }
          if (prev.midPrioQueue.length !== 0) {
            return "midPrioQueue";
          }
          return "lowPrioQueue";
        }
        if (prevQueue === "midPrioQueue") {
          if (prev.lowPrioQueue.length !== 0) {
            return "lowPrioQueue";
          }
          if (prev.highPrioQueue.length !== 0) {
            return "highPrioQueue";
          }
          return "midPrioQueue";
        }
        if (prevQueue === "highPrioQueue") {
          if (prev.midPrioQueue.length !== 0) {
            return "midPrioQueue";
          }
          if (prev.lowPrioQueue.length !== 0) {
            return "lowPrioQueue";
          }
          return "highPrioQueue";
        }
      });
      if (
        prev.highPrioQueue.length == 0 &&
        prev.midPrioQueue.length == 0 &&
        prev.lowPrioQueue.length == 0
      ) {
        // setMessages((prev) => {
        //   return [...prev, `All processes out`];
        // });

        setIntervalId((prev) => {
          console.log(prev);
          clearInterval(prev);
          return null;
        });
      }
      return prev;
    });
  }

  function getAllMsMessages() {
    return messages.filter((message) => message.includes("Ms:"));
  }

  return (
    <div className="w-auto">
      <h1 className="text-center text-5xl font-bold p-4">
        Multilevel Queue Scheduling Example
      </h1>
      <div>
        <div className="px-64 flex items-center justify-center flex-col">
          <table className="table-auto my-4 w-full">
            <thead>
              <tr className="text-lg">
                <th className="px-4 py-2">Process</th>
                <th className="px-4 py-2">Priority</th>
                <th className="px-4 py-2">Burst Time</th>
                <th className="px-4 py-2">Arrival Time</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-md text-center">
                <td className="border px-4 py-2">P1</td>
                <td className="border px-4 py-2">0</td>
                <td className="border px-4 py-2">20</td>
                <td className="border px-4 py-2">0</td>
              </tr>
              <tr className="bg-gray-100 text-center">
                <td className="border px-4 py-2">P2</td>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">36</td>
                <td className="border px-4 py-2">0</td>
              </tr>
              <tr className="text-md text-center">
                <td className="border px-4 py-2">P3</td>
                <td className="border px-4 py-2">2</td>
                <td className="border px-4 py-2">12</td>
                <td className="border px-4 py-2">0</td>
              </tr>
              <tr className="bg-gray-100 text-center">
                <td className="border px-4 py-2">P4</td>
                <td className="border px-4 py-2">0</td>
                <td className="border px-4 py-2">40</td>
                <td className="border px-4 py-2">0</td>
              </tr>
              <tr className="text-md text-center">
                <td className="border px-4 py-2">P5</td>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">24</td>
                <td className="border px-4 py-2">0</td>
              </tr>
            </tbody>
          </table>

          <button
            className="px-4 py-2 bg-blue-500 rounded-md text-white text-lg my-4 drop-shadow-xl"
            onClick={() => {
              if (!intervalId) {
                const interval = setInterval(() => {
                  // setSecondsLine((prev) => {
                  //   return [...prev, <div>{prev.length + 1}</div>];
                  // });
                  setTotalMs((ms) => {
                    setMessages((prev) => {
                      return [...prev, `Ms: ${ms}`];
                    });
                    return ms;
                  });

                  processQueueBySlicing();
                }, 500);
                setIntervalId(interval);
              } else {
                clearInterval(intervalId);
                setIntervalId(null);
              }
            }}
          >
            {intervalId ? "Stop" : "Start"}
          </button>

          <div className="m-6">
            <div className="flex w-full">High priority queue = 10m, FCFS</div>
          <div className="flex w-full">Mid priority queue = 6ms, FCFS</div>
          <div className="flex w-full">Low priority queue = 4ms, FCFS</div>

        </div>
      </div>

        {/* add a number of  */}

        <div className="flex w-max items-center mt-10 ml-10">
          {messages.map((message, index, array) => {
            if (message.includes("Ms:")) {
              const prevMessage = array
                .slice(0, index)
                .reverse()
                .find((message) => message.includes("Ms:"));
              const value = array[index - 1];

              let width = message.split(" ")[1];
              // setTimeout(() => {
              // document
              //   .getElementById(message)
              //   ?.scrollIntoView({ behavior: "smooth", block: "end" });
              // }, 300);
              // if (prevMessage) {
              if (prevMessage) {
                width = message.split(" ")[1] - prevMessage.split(" ")[1];
              }

              return (
                <>
                  <motion.span
                    id={message}
                    className="bg-gray-300 h-1 relative flex justify-center"
                    initial={{
                      width: `0rem`,
                    }}
                    animate={{
                      width: `${width / 1.25}rem`,
                      transition: {
                        duration: 0.5,
                      },
                    }}
                  >
                    {value && (
                      <div className=" absolute flex items-center flex-col">
                        <motion.div
                          className="w-[0.1rem] h-24 bg-gray-200"
                          initial={{
                            height: `0rem`,
                          }}
                          animate={{
                            height: `6rem`,
                            transition: {
                              duration: 0.3,
                            },
                          }}
                        />
                        <motion.div
                          className="w-10 h-10 flex items-center justify-center text-center"
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                            transition: {
                              delay: 0.3,
                              duration: 0.2,
                            },
                          }}
                        >
                          {value}
                        </motion.div>
                      </div>
                    )}
                  </motion.span>
                  <motion.span
                    className="w-2 h-2 bg-gray-500 rounded-full relative justify-center flex"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                      },
                    }}
                  >
                    <div className="absolute bottom-5 text-lg font-semibold">
                      {message.split(" ")[1]}
                    </div>
                  </motion.span>
                </>
              );
              // }
            }
          })}
        </div>

        {/* {messages.map((message, index) => {
          return (
            <div key={index} className="py-2 mx-16 my-4">
              {message}
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default page;
