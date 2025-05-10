import { createContext, MutableRefObject } from "react";

export enum EPokedexMenuOption {
  POKEDEX = 1,
  PACK = 2,
  EXIT = 3
}

export enum EPokedexScreen {
  MENU,
  POKEDEX = 1,
  PACK = 2,
  EXIT = 3
}

export type TMenuPokedexContext = {
  screen: EPokedexScreen;
  menuOption: EPokedexMenuOption;
  setScreen: (option: EPokedexScreen) => void;
  setMenuOption: (option: EPokedexMenuOption) => void;

  // Movimiento de selección en lista de pokemones (referencias dinámicas)
  moveSelectionUp?: () => void;
  moveSelectionDown?: () => void;
  moveSelectionUpRef?: MutableRefObject<() => void>;
  moveSelectionDownRef?: MutableRefObject<() => void>;

  // Mostrar información detallada del Pokémon seleccionado
  fetchSelectedPokemonInfo?: () => void;
  fetchSelectedPokemonInfoRef?: MutableRefObject<() => void>;
};

export const MenuPokedexContext = createContext<TMenuPokedexContext>({
  screen: EPokedexScreen.MENU,
  menuOption: EPokedexMenuOption.POKEDEX,
  setScreen: () => {},
  setMenuOption: () => {},
  moveSelectionUp: () => {},
  moveSelectionDown: () => {},
  fetchSelectedPokemonInfo: () => {},
});
