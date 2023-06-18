"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [queue, setQueue] = useState([]);
  const [messages, setMessages] = useState([]);

  function createProcess(PID, priority, cpuTime, ioTime) {
    return {
      pid: PID,
      priority: priority,
      cpuTime: cpuTime,
      ioTime: ioTime,
    };
  }

  // Function to execute a process for one time unit
  async function executeProcess(process) {
    // Print the process being executed
    setMessages((prev) => {
      return [
        ...prev,
        `Executing process ${process.pid} with CPU time ${process.cpuTime}`,
      ];
    });

    await new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        setMessages((prev) => {
          return [...prev, `${process.cpuTime - i}`];
        });
        i++;

        if (i >= process.cpuTime) {
          setMessages((prev) => {
            return [...prev, `Process ${process.pid} completed`];
          });

          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });
    setQueue((prev) => {
      return prev.filter((p) => p.pid !== process.pid);
    });
  }

  async function processQueue(queue) {
    for (const process of queue) {
      await executeProcess(process);
    }
  }

  useEffect(() => {
    setQueue(
      [
        createProcess(1, 0, 3, 0),
        createProcess(2, 1, 6, 3),
        createProcess(3, 2, 4, 4),
        createProcess(4, 0, 5, 5),
        createProcess(5, 1, 2, 7),
      ].sort((a, b) => a.priority - b.priority)
    );
  }, []);

  return (
    <main className="">
      <h1 className="text-xl font-bold p-4">
        Fixed Priority Pre-emptive Scheduling
      </h1>
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
      </div>
      <div>
        <button
          className="p-2 bg-blue-500 rounded-md text-white mt-4 mx-16 my-4"
          onClick={() => {
            processQueue(queue);
          }}
        >
          Start
        </button>
        <span className="p-2 bg-blue-500 rounded-md text-white mt-4 mx-16 my-4">
          <Link href={"/timeslice"}>Next</Link>
        </span>

        <div className="py-2 mx-16 my-4">
          {messages.map((message) => (
            <p>{message}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
