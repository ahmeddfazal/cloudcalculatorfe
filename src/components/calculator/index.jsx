import { useEffect, useState } from "react";
import CalculatorKeypad from "../calculatorKeypad";
import OutputBar from "../outputBar";
import { Card } from "antd";

import "./styles.css";
import LogsTable from "../logsTable";

const CalculatorApp = () => {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(60);
  const [requestBlocked, setRequestBlocked] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let interval;
    if (requestBlocked) {
      interval = setInterval(() => {
        const timeDiff = time - 1;
        if (timeDiff < 0) {
          setCount(0);
          setRequestBlocked(false);
        } else {
          setTime(time - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [requestBlocked]);

  const handleClick = async (e, v) => {
    if (v === "C") {
      setValue("");
    } else if (v === "=") {
      const { ip: ipAddress } = await fetch(
        "https://api.ipify.org/?format=json"
      ).then((response) => response.json());

      const response = await fetch("http://13.234.34.122:5000", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ipAddress, input: value }),
      });

      const { blocked, output } = await response.json();

      setLogs((logs) => [
        { timeStamp: Date.now(), input: value, output: output, ipAddress },
        ...logs,
      ]);
      setRequestBlocked(blocked);
    } else {
      setValue(`${value.toString() + v}`);
    }
  };
  return (
    <div className="calculator-app-cont">
      <Card title="Cloud Hosted Calculator" className="calculator">
        <div>
          <OutputBar value={value} />
          <CalculatorKeypad handleClick={handleClick} />
          <h3>Total Requests: {count}</h3>
          <h3>
            Status:{" "}
            {requestBlocked ? (
              <span
                style={{ color: "red" }}
              >{`Request Blocked For ${time} seconds`}</span>
            ) : (
              <span style={{ color: "green" }}>{`${
                5 - count
              } Requests Left`}</span>
            )}
          </h3>
        </div>
      </Card>
      <Card title="User Action Logs" className="calculator logs-table-cont">
        <LogsTable logs={logs} />
      </Card>
    </div>
  );
};

export default CalculatorApp;
