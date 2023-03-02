import { Table } from "antd";

import "./styles.css";

const columns = [
  {
    title: "SR",
    dataIndex: "sr",
    key: "sr",
    ellipsis: true,
    width: "5%",
  },
  {
    title: "Time Stamp",
    dataIndex: "timeStamp",
    key: "timeStamp",
    ellipsis: true,
    width: "20%",
  },
  {
    title: "Input",
    dataIndex: "input",
    key: "input",
    ellipsis: true,
    width: "20%",
  },
  {
    title: "Output",
    dataIndex: "output",
    key: "output",
    ellipsis: true,
    width: "10%",
  },
  {
    title: "IP Address",
    dataIndex: "ipAddress",
    key: "ipAddress",
    ellipsis: true,
    width: "10%",
  },
  {
    title: "Blocked",
    dataIndex: "blocked",
    key: "blocked",
    ellipsis: true,
    width: "10%",
  },
];

const LogsTable = ({ logs = [], loading }) => {
  return <Table columns={columns} dataSource={logs} loading={loading} />;
};

export default LogsTable;
