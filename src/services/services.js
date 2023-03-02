export const fetchIpAddress = async () => {
  try {
    const { ip: ipAddress } = await fetch(
      "https://api.ipify.org/?format=json"
    ).then((response) => response.json());

    return ipAddress;
  } catch (error) {
    console.error("Error:", error);
    return "";
  }
};

const convertArrToObj = (logs = []) =>
  logs.map((arr) => ({
    sr: arr[0],
    ipAddress: arr[1],
    input: arr[2],
    output: arr[3],
    timeStamp: arr[4],
    blocked: arr[5],
  }));

export const fetchAllLogs = async (ipAddress) => {
  try {
    const logs = await fetch(`http://13.234.34.122:3000/${ipAddress}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());

    return convertArrToObj(logs);
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
