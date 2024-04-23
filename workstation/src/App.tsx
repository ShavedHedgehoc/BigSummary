import { useEffect, useRef, useState } from "react";

import "./App.css";
import axios, { AxiosResponse } from "axios";

interface IOccupation {
  id: number;
  value: string;
  description: string;
}

interface IEmployee {
  id: number;
  name: string;
  barcode: string;
  occupationId: number;
  occupation: IOccupation;
}

function App() {
  const apiUrl = "/api";

  const $api = axios.create({
    withCredentials: true,
    baseURL: apiUrl,
  });

  async function fetchUser(barcode: string): Promise<AxiosResponse<IEmployee>> {
    return $api.get(`/employees/${barcode}`);
  }

  const [inputField, setInputField] = useState("");
  const [currentUser, setCurrentUser] = useState({} as IEmployee);

  const handleUserInput = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const re = /^[0-9]{13}$/;
    if (e.key === "Enter") {
      if (re.test(inputField)) {
        const response = await fetchUser(inputField);
        if (!response.data) {
          alert("Кто ты?");
        } else {
          setCurrentUser(response.data);
        }
      } else {
        alert("Отсканирована херня");
      }
      clearInput();
    }
  };

  const handleLabelInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      let role = null;
      role = currentUser?.occupation?.value;
      switch (role) {
        case "TECHNOLOGIST":
          alert("Разбор весового листа");
          break;
        case "OPERATOR":
          alert("Разбор ярлыка");
          break;
        default:
          alert("Специальность не определена");
          break;
      }
      setCurrentUser({} as IEmployee);
      clearInput();
    }
  };

  const refInput = useRef<HTMLInputElement | null>(null);

  const focusInput = () => {
    refInput.current?.focus();
  };

  const clearInput = () => {
    setInputField("");
    focusInput();
  };

  useEffect(() => {
    focusInput();
    console.log(currentUser);
  }, []);

  return (
    <div>
      <div>{Object.keys(currentUser).length !== 0 && currentUser?.name}</div>
      <div>{!Object.keys(currentUser).length ? "Отсканируйте свой штрихкод" : "Отсканируйте ярлык"}</div>
      <input
        type="text"
        ref={refInput}
        value={inputField}
        onChange={(e) => setInputField(e.target.value)}
        onKeyDown={!Object.keys(currentUser).length ? (e) => handleUserInput(e) : (e) => handleLabelInput(e)}
      />
    </div>
  );
}

export default App;
