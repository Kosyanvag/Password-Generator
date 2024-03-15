import { IoCopy, IoRefreshOutline } from "react-icons/io5";
import { useState } from "react";
import "./App.style.scss";
import "./components/Rand";
const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(5);
  const [useLetters, setUseLetters] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useUpperCase, setUpperCase] = useState(true);
  const [useLowerCase, setLowerCase] = useState(true);

  function generatePassword() {
    let password = "";
    switch (true) {
      case useLetters && !useUpperCase && !useLowerCase:
        password += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        break;
      case useLetters && useUpperCase && !useLowerCase:
        password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        break;
      case useLetters && !useUpperCase && useLowerCase:
        password += "abcdefghijklmnopqrstuvwxyz";
        break;
      case useLetters && useUpperCase && useLowerCase:
        password += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        break;
    }
    if (useNumbers) password += "0123456789";
    if (password === "") {
      setPassword("Please select options");
      return;
    }
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * password.length);
      newPassword += password[randomIndex];
    }
    setPassword(newPassword);
  }

  function copy() {
    const tempElement = document.createElement("textarea");
    tempElement.value = password;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand("copy");
    document.body.removeChild(tempElement);
  }
  return (
    <div className="box">
      <div className="result" onClick={copy}>
        <p className="gen_password">{password}</p>
        <div className="btn">
          <IoCopy className="copy_btn" />
          <IoRefreshOutline className="gen_btn" onClick={generatePassword} />
        </div>
      </div>
      <div className="custom">
        <div className="custom_left">
          <h2>Customize your password</h2>
          <hr />
          <p>Password Length</p>
          <div className="password_input">
            <p>{length}</p>
            <input
              type="range"
              min={1}
              max={50}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="custom_right">
          <div className="uNumber">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
            />
            <p>Use numbers: </p>
          </div>
          <div className="uLetter">
            <input
              type="checkbox"
              checked={useLetters}
              onChange={(e) => setUseLetters(e.target.checked)}
            />
            <p>Use letters: </p>
          </div>
          <div className="uLower">
            <input
              type="checkbox"
              checked={useLowerCase}
              onChange={(e) => setLowerCase(e.target.checked)}
            />
            <p>LowerCase</p>
          </div>
          <div className="uUpper">
            <input
              type="checkbox"
              checked={useUpperCase}
              onChange={(e) => setUpperCase(e.target.checked)}
            />
            <p>UpperCase</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
