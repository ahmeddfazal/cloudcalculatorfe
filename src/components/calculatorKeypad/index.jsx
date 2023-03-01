import { Button } from "antd";
import "./styles.css";

const keysData = [
  [1, 2, 3, "+", "/"],
  [4, 5, 6, "-", "*"],
  [7, 8, 9, ".", "C"],
  [0, "="],
];

export default function CalculatorKeypad(props) {
  const { handleClick } = props;
  return (
    <div className="keypad">
      {keysData.flat().map((value, index) => (
        <Button
          className="keypad-button"
          key={value}
          value={value}
          onClick={(e) => handleClick(e, value)}
        >
          <span className="digit">{value}</span>
        </Button>
      ))}
    </div>
  );
}
