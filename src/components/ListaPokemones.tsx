import React, { useEffect, useState, useContext } from "react";
import { MenuPokedexContext, EPokedexScreen } from "../contexts/MenuPokedexContext";

interface PokemonListItem {
  name: string;
  url: string;
}

const ITEMS_PER_PAGE = 8;

const ListaPokemones: React.FC = () => {
  const [pokemones, setPokemones] = useState<PokemonListItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const context = useContext(MenuPokedexContext);
  const { screen, moveSelectionUpRef, moveSelectionDownRef } = context;

  // Obtener bloque de pokemones
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${ITEMS_PER_PAGE}`)
      .then((res) => res.json())
      .then((data) => setPokemones(data.results));
  }, [offset]);

  // Registrar funciones de navegación
  useEffect(() => {
    if (screen !== EPokedexScreen.POKEDEX) return;

    if (moveSelectionUpRef) {
      moveSelectionUpRef.current = () => {
        if (selectedIndex === 0 && offset > 0) {
          setOffset((prev) => prev - ITEMS_PER_PAGE);
          setSelectedIndex(ITEMS_PER_PAGE - 1);
        } else if (selectedIndex > 0) {
          setSelectedIndex((prev) => prev - 1);
        }
      };
    }

    if (moveSelectionDownRef) {
      moveSelectionDownRef.current = () => {
        if (selectedIndex === pokemones.length - 1) {
          setOffset((prev) => prev + ITEMS_PER_PAGE);
          setSelectedIndex(0);
        } else if (selectedIndex < pokemones.length - 1) {
          setSelectedIndex((prev) => prev + 1);
        }
      };
    }
  }, [screen, selectedIndex, offset, pokemones.length, moveSelectionUpRef, moveSelectionDownRef]);

  return (
    <div className="font-pokemon text-xs !m-2 !p-2 border-3 border-double border-black rounded-md h-[calc(100%-1rem)]">
      <ul className="space-y-1">
        {pokemones.map((pokemon, index) => {
          const globalIndex = offset + index + 1;
          const isSelected = selectedIndex === index;

          return (
            <li
              key={pokemon.name}
              className={`flex justify-between items-center ${
                isSelected ? "font-bold text-black" : "text-gray-600"
              }`}
            >
              <span>{isSelected ? "▶ " : ""}{pokemon.name}</span>
              <span className="text-gray-500">#{globalIndex}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListaPokemones;
