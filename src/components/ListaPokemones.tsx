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

  const [pokemonData, setPokemonData] = useState<any | null>(null);
  const [description, setDescription] = useState<string>("");

  const context = useContext(MenuPokedexContext);
  const {
    screen,
    moveSelectionUpRef,
    moveSelectionDownRef,
    fetchSelectedPokemonInfoRef,
  } = context;

  // Obtener lista de Pokémon por bloque
  useEffect(() => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${ITEMS_PER_PAGE}`
    )
      .then((res) => res.json())
      .then((data) => setPokemones(data.results));
  }, [offset]);

  // Navegación con cruceta
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

    if (fetchSelectedPokemonInfoRef) {
      fetchSelectedPokemonInfoRef.current = async () => {
        const globalIndex = offset + selectedIndex + 1;

        try {
          const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${globalIndex}`);
          const data1 = await res1.json();

          const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${globalIndex}`);
          const data2 = await res2.json();

          const entry = data2.flavor_text_entries.find(
            (e: any) => e.language.name === "en"
          );

          setPokemonData(data1);
          setDescription(entry?.flavor_text || "No description available.");
        } catch (err) {
          console.error("Error fetching Pokémon details:", err);
        }
      };
    }
  }, [screen, selectedIndex, offset, pokemones.length]);

  return (
    <div className="font-pokemon text-xs !m-2 !p-2 border-3 border-double border-black rounded-md h-[calc(100%-1rem)] overflow-hidden">
      {!pokemonData && (
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
                <span>
                  {isSelected ? "▶ " : ""}
                  {pokemon.name}
                </span>
                <span className="text-gray-500">#{globalIndex}</span>
              </li>
            );
          })}
        </ul>
      )}

      {pokemonData && (
        <div className="text-[10px] text-black space-y-1 w-full">
            <div className="text-center font-bold text-sm">
            {pokemonData.name.toUpperCase()} #{pokemonData.id}
            </div>

            <div className="flex justify-center">
            <img
                src={pokemonData.sprites.other['official-artwork'].front_default}
                alt={pokemonData.name}
                className="h-14 object-contain"
            />
            </div>

            <div className="text-[7px] break-words whitespace-pre-wrap">
            <div>
                <strong>Type:</strong>{" "}
                {pokemonData.types.map((t: any) => t.type.name).join(", ")}
            </div>
            <div>
                <strong>Abilities:</strong>{" "}
                {pokemonData.abilities.map((a: any) => a.ability.name).join(", ")}
            </div>
            </div>
            <div className="text-[8px] italic pt-1">{description}</div>
        </div>
        )}
    </div>
  );
};

export default ListaPokemones;
