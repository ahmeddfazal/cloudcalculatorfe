import { Button } from "antd";
import "./styles.css";

const keysSet1 = [
  { value: "math.sin(", name: "sin(", keyName: "sin" },
  { value: "math.cos(", name: "cos(", keyName: "cos" },
  { value: "math.tan(", name: "tan(", keyName: "tan" },
  { value: "math.asin(", name: "sininv(", keyName: "sin-1" },
  { value: "math.acos(", name: "cosinv(", keyName: "cos-1" },
  { value: "math.atan(", name: "taninv(", keyName: "tan-1" },

  { value: "math.factorial(", name: "fact(", keyName: "fact(" },
  { value: "math.log10(", name: "log(", keyName: "log(" },
  { value: "math.log(", name: "ln(", keyName: "ln(" },

  { value: "**", name: "^", keyName: "x^y" },
  { value: "**3", name: "^3", keyName: "x^3" },
  { value: "**2", name: "^2", keyName: "x^2" },
  { value: "math.e**", name: "e^", keyName: "e^x" },
  { value: "10**", name: "10^", keyName: "10^x" },
  { value: "math.sqrt(", name: "sqrt(", keyName: "√x" },
  { value: "%", name: "%", keyName: "%" },
  { value: "math.e", name: "e", keyName: "e" },
  { value: "math.pi", name: "π", keyName: "π" },
];

const keysSet2 = [
  { value: "(", name: "(", keyName: "(" },
  { value: ")", name: ")", keyName: ")" },
  { value: "DEL", name: "DEL", keyName: "DEL" },
  { value: "C", name: "C", keyName: "C" },

  { value: 9, name: 9, keyName: 9 },
  { value: 8, name: 8, keyName: 8 },
  { value: 7, name: 7, keyName: 7 },
  { value: "/", name: "÷", keyName: "÷" },

  { value: 6, name: 6, keyName: 6 },
  { value: 5, name: 5, keyName: 5 },
  { value: 4, name: 4, keyName: 4 },
  { value: "*", name: "×", keyName: "×" },

  { value: 3, name: 3, keyName: 3 },
  { value: 2, name: 2, keyName: 2 },
  { value: 1, name: 1, keyName: 1 },
  { value: "+", name: "+", keyName: "+" },

  { value: ".", name: ".", keyName: "." },
  { value: 0, name: 0, keyName: 0 },
  { value: "=", name: "=", keyName: "=" },
  { value: "-", name: "-", keyName: "-" },
];

export default function CalculatorKeypad(props) {
  const { handleClick, disabled } = props;
  return (
    <>
      <div className="keypad">
        {keysSet1.map((key, index) => (
          <Button
            className="keypad-button"
            key={key.value}
            value={key.value}
            onClick={(e) => handleClick(e, key)}
            disabled={disabled}
          >
            <span className="digit">{key.keyName}</span>
          </Button>
        ))}
      </div>
      <div className="keypad">
        {keysSet2.map((key, index) => (
          <Button
            className="keypad-button"
            key={key.value}
            value={key.value}
            onClick={(e) => handleClick(e, key)}
            disabled={disabled}
          >
            <span className="digit">{key.keyName}</span>
          </Button>
        ))}
      </div>
    </>
  );
}
