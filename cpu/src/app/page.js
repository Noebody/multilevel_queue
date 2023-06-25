"use client";

import { useEffect, useState } from "react";

const page = () => {
  const [queue, setQueue] = useState([]);
  const [Ms, setMs] = useState(0);
  const [currentQueueID, setCurrentQueueID] = useState(0);
  function createProcess(PID, priority, cpuTime, ioTime) {
    return {
      pid: PID,
      priority: priority,
      cpuTime: cpuTime,
      ioTime: ioTime,
    };
  }

  useEffect(() => {
    setQueue([
      createProcess(1, 0, 30, 0),
      createProcess(2, 1, 60, 0),
      createProcess(3, 2, 40, 0),
      createProcess(4, 0, 50, 0),
      createProcess(5, 1, 20, 0),
    ]);
  }, []);

  const executeProcess = (process) => {
    if (process.cpuTime - 10 <= 0) {
      setQueue((prev) => {
        return prev.filter((p) => p.pid !== process.pid);
      });
    }

    const startOperation = () => {
      while (queue.length > 0) {
        //Filter the queue based on priority
        const currentQueue = queue.filter(
          (process) => process.priority == currentQueueID
        );
      }
    };

    return (
      <div>
        <button>Start</button>
      </div>
    );
  };
};
export default page;
