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

  useEffect(() => {
    let interval;
    if (count === 20) {
      setRequestBlocked(true);
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
  }, [count, value, time]);

  const handleClick = async (e, v) => {
    if (v === "C") {
      setValue("");
    } else if (v === "=") {
      const { ip: ipAddress } = await fetch(
        "https://api.ipify.org/?format=json"
      ).then((response) => response.json());

      const response = await fetch("http://127.0.0.1:5000", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ipAddress, input: value }),
      });

      const { blocked } = await response.json();

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
                20 - count
              } Requests Left`}</span>
            )}
          </h3>
        </div>
        <div>
          <strong>Request Blocked!</strong>
        </div>
      </Card>
      <Card title="User Action Logs" className="calculator logs-table-cont">
        <LogsTable />
      </Card>
    </div>
  );
};

export default CalculatorApp;
