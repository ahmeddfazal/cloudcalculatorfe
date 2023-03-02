import { useEffect, useState } from "react";
import CalculatorKeypad from "../calculatorKeypad";
import OutputBar from "../outputBar";
import { Card } from "antd";

import "./styles.css";
import LogsTable from "../logsTable";
import { fetchAllLogs, fetchIpAddress } from "../../services/services";

const CalculatorApp = () => {
  const [state, setState] = useState({
    name: "",
    keyLogs: [],
    output: "",
    time: 60,
    requestBlocked: false,
    logs: [],
    ipAddress: "",
    loading: false,
  });

  const { time, requestBlocked, logs, ipAddress, loading, output, keyLogs } =
    state;

  useEffect(() => {
    let interval;
    if (requestBlocked) {
      interval = setInterval(() => {
        const timeDiff = time - 1;
        if (timeDiff < 0) {
          setState((st) => ({
            ...st,
            requestBlocked: false,
            time: 60,
          }));
        } else {
          setState((st) => ({ ...st, time: st.time - 1 }));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [requestBlocked, time]);

  useEffect(() => {
    (async () => {
      try {
        setState((st) => ({ ...st, loading: true }));
        const ipAddress = await fetchIpAddress();

        const logs = await fetchAllLogs(ipAddress);

        setState((st) => ({
          ...st,
          ipAddress,
          logs,
          loading: false,
        }));
      } catch (error) {
        console.error("Error: ", error);
      }
    })();
  }, []);

  const getValueForBE = () => {
    return keyLogs?.map((keyLog) => keyLog.value)?.join("") ?? "";
  };

  const displayValue = keyLogs?.map((keyLog) => keyLog.name)?.join("") ?? "";

  const handleClick = async (_, key) => {
    const { value: val } = key;

    if (val === "C") {
      setState((st) => ({ ...st, output: "", keyLogs: [] }));
    } else if (val === "DEL") {
      setState((st) => ({
        ...st,
        keyLogs: st.keyLogs.slice(0, -1),
      }));
    } else if (val === "=") {
      try {
        setState((st) => ({ ...st, loading: true, output: "" }));
        const response = await fetch("http://13.234.34.122:3000", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ipAddress, input: getValueForBE() }),
        });

        const { blocked, output } = await response.json();

        const logs = await fetchAllLogs(ipAddress);

        setState((st) => ({
          ...st,
          requestBlocked: blocked,
          logs,
          output,
        }));
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setState((st) => ({
          ...st,
          loading: false,
        }));
      }
    } else {
      setState((st) => ({
        ...st,
        keyLogs: [...st.keyLogs, key],
      }));
    }
  };

  return (
    <div className="calculator-app-cont">
      <Card title="Cloud Hosted Calculator" className="calculator">
        <div>
          <OutputBar value={output} label="Output" />
          <OutputBar value={displayValue} label="Input" />
          <CalculatorKeypad
            handleClick={handleClick}
            disabled={requestBlocked}
          />
          <h3>
            Status:{" "}
            {requestBlocked ? (
              <span
                style={{ color: "red" }}
              >{`Request Blocked For ${time} seconds`}</span>
            ) : (
              <span style={{ color: "green" }}>Open</span>
            )}
          </h3>
        </div>
      </Card>
      <Card title="User Action Logs" className="calculator logs-table-cont">
        <LogsTable logs={logs} loading={loading} />
      </Card>
    </div>
  );
};

export default CalculatorApp;
