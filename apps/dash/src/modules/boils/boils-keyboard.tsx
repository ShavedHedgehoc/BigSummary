import "./keyboard-index.css";
import "react-simple-keyboard/build/css/index.css";
import Keyboard from "react-simple-keyboard";
import { useBoilsInputStore } from "./store/use-boils-input-store";
import { useShallow } from "zustand/react/shallow";
import React, { useRef } from "react";

export default function BoilsKeyboard() {
  const keyboard = useRef();
  const setValue = useBoilsInputStore(useShallow((state) => state.setValue));

  React.useEffect(() => setValue(""), []);

  return (
    <div className="flex w-full rounded-xl border1 border-slate-600 px-2 py-2 bg-gray-950">
      <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        onChange={(input) => setValue(input)}
        theme={"hg-theme-default myTheme1"}
        layout={{ default: ["1 2 3 4 5 6 7 8 9 0 {bksp}", "A B C D E F J H I J K L"] }}
      />
    </div>
  );
}
