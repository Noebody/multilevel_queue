"use client";

import { useEffect, useState } from "react";

const page = () => {
  const [queue, setQueue] = useState([]);

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

  const startProcess = (process) => {};

  return (
    <div>
      <button>Start</button>
    </div>
  );
};

export default page;
