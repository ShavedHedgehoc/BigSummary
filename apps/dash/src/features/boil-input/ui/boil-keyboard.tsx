import '../styles/keyboard-index.css';
import 'react-simple-keyboard/build/css/index.css';
import Keyboard, { SimpleKeyboard } from 'react-simple-keyboard';
import { useShallow } from 'zustand/react/shallow';
import React, { useRef } from 'react';
import { useBoilInputStore } from '@/entities/boil';

export function BoilKeyboard() {
  const keyboard = useRef<SimpleKeyboard | null>(null);
  const setValue = useBoilInputStore(useShallow((state) => state.setValue));

  React.useEffect(() => setValue(''), [setValue]);

  return (
    <div className="flex w-full rounded-xl border1 border-slate-600 px-2 py-2 bg-gray-950">
      <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        onChange={(input) => setValue(input)}
        theme={'hg-theme-default myTheme1'}
        layout={{ default: ['1 2 3 4 5 6 7 8 9 0 {bksp}', 'A B C D E F J H I J K L'] }}
      />
    </div>
  );
}
