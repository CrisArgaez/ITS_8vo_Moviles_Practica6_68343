import { JSX, ReactNode, useState, useRef } from "react";
import { EPokedexMenuOption, EPokedexScreen, MenuPokedexContext } from "./MenuPokedexContext";

export const MenuPokedexProvider = ({
  children,
}: {
  children: ReactNode | JSX.Element | JSX.Element[];
}) => {
  const [screen, setScreen] = useState(EPokedexScreen.MENU);
  const [menuOption, setMenuOption] = useState(EPokedexMenuOption.POKEDEX);

  // Referencias para funciones dinámicas de navegación
  const moveUpRef = useRef<() => void>(() => {});
  const moveDownRef = useRef<() => void>(() => {});

  // Referencias para mostrar información detallada
  const fetchPokemonInfoRef = useRef<() => void>(() => {});
  const fetchItemInfoRef = useRef<() => void>(() => {});

  return (
    <MenuPokedexContext.Provider
      value={{
        screen,
        setScreen,
        menuOption,
        setMenuOption,
        moveSelectionUp: () => moveUpRef.current(),
        moveSelectionDown: () => moveDownRef.current(),
        moveSelectionUpRef: moveUpRef,
        moveSelectionDownRef: moveDownRef,
        fetchSelectedPokemonInfo: () => fetchPokemonInfoRef.current(),
        fetchSelectedPokemonInfoRef: fetchPokemonInfoRef,
        fetchSelectedItemInfo: () => fetchItemInfoRef.current(),
        fetchSelectedItemInfoRef: fetchItemInfoRef,
      }}
    >
      {children}
    </MenuPokedexContext.Provider>
  );
};
