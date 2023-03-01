import { Table } from "antd";

import "./styles.css";

const columns = [
  {
    title: "Time Stamp",
    dataIndex: "timeStamp",
    key: "timeStamp",
    ellipsis: true,
  },
  {
    title: "Input",
    dataIndex: "input",
    key: "input",
    ellipsis: true,
  },
  {
    title: "Output",
    dataIndex: "output",
    key: "output",
    ellipsis: true,
  },
  {
    title: "IP Address",
    dataIndex: "ipAddress",
    key: "ipAddress",
    ellipsis: true,
  },
];

const LogsTable = ({ logs = [] }) => {
  return <Table columns={columns} dataSource={logs} />;
};

export default LogsTable;
