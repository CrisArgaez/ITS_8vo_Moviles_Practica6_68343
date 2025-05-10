import { JSX, ReactNode, useState, useRef } from "react";
import { EPokedexMenuOption, EPokedexScreen, MenuPokedexContext } from "./MenuPokedexContext";

export const MenuPokedexProvider = ({ children }: { children: ReactNode | JSX.Element | JSX.Element[] }) => {
  const [screen, setScreen] = useState(EPokedexScreen.MENU);
  const [menuOption, setMenuOption] = useState(EPokedexMenuOption.POKEDEX);

  // Referencias para funciones dinámicas de selección
  const moveUpRef = useRef<() => void>(() => {});
  const moveDownRef = useRef<() => void>(() => {});

  const setScreenOption = (option: EPokedexScreen) => {
    setScreen(option);
  };

  const setMenuOptionValue = (option: EPokedexMenuOption) => {
    setMenuOption(option);
  };

  return (
    <MenuPokedexContext.Provider
      value={{
        screen,
        setScreen: setScreenOption,
        menuOption,
        setMenuOption: setMenuOptionValue,
        moveSelectionUp: () => moveUpRef.current(),
        moveSelectionDown: () => moveDownRef.current(),
        moveSelectionUpRef: moveUpRef,
        moveSelectionDownRef: moveDownRef,
      }}
    >
      {children}
    </MenuPokedexContext.Provider>
  );
};
