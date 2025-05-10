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

  // Referencia para mostrar información detallada del Pokémon
  const fetchInfoRef = useRef<() => void>(() => {});

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
        fetchSelectedPokemonInfo: () => fetchInfoRef.current(),
        fetchSelectedPokemonInfoRef: fetchInfoRef,
      }}
    >
      {children}
    </MenuPokedexContext.Provider>
  );
};
