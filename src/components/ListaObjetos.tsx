import React, { useEffect, useState, useContext } from "react";
import { MenuPokedexContext, EPokedexScreen } from "../contexts/MenuPokedexContext";

interface Item {
  name: string;
  url: string;
}

const ITEMS_PER_PAGE = 8;

const ListaObjetos: React.FC = () => {
  const [objetos, setObjetos] = useState<Item[]>([]);
  const [offset, setOffset] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [itemData, setItemData] = useState<any | null>(null);

  const context = useContext(MenuPokedexContext);
  const {
    screen,
    moveSelectionUpRef,
    moveSelectionDownRef,
    fetchSelectedItemInfoRef,
  } = context;

  // Obtener lista de objetos desde la API
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/item?offset=${offset}&limit=${ITEMS_PER_PAGE}`)
      .then((res) => res.json())
      .then((data) => setObjetos(data.results));
  }, [offset]);

  // Registrar funciones de navegación y detalle
  useEffect(() => {
    if (screen !== EPokedexScreen.PACK) return;

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
        if (selectedIndex === objetos.length - 1) {
          setOffset((prev) => prev + ITEMS_PER_PAGE);
          setSelectedIndex(0);
        } else if (selectedIndex < objetos.length - 1) {
          setSelectedIndex((prev) => prev + 1);
        }
      };
    }

    if (fetchSelectedItemInfoRef) {
      fetchSelectedItemInfoRef.current = async () => {
        const selectedItem = objetos[selectedIndex];
        if (!selectedItem) return;

        try {
          const res = await fetch(`https://pokeapi.co/api/v2/item/${selectedItem.name}`);
          const data = await res.json();
          setItemData(data);
        } catch (err) {
          console.error("Error fetching item details:", err);
        }
      };
    }
  }, [screen, selectedIndex, offset, objetos]);

  return (
    <div className="font-pokemon text-xs !m-2 !p-2 border-3 border-double border-black rounded-md h-[calc(100%-1rem)] overflow-hidden">
      {!itemData && (
        <ul className="space-y-1">
          {objetos.map((objeto, index) => {
            const globalIndex = offset + index + 1;
            const isSelected = selectedIndex === index;

            return (
              <li
                key={objeto.name}
                className={`flex justify-between items-center ${
                  isSelected ? "font-bold text-black" : "text-gray-600"
                }`}
              >
                <span>{isSelected ? "▶ " : ""}{objeto.name}</span>
                <span className="text-gray-500">#{globalIndex}</span>
              </li>
            );
          })}
        </ul>
      )}

      {itemData && (
        <div className="text-[10px] text-black space-y-1">
          <div className="text-center font-bold text-sm">
            {itemData.name.toUpperCase()} #{itemData.id}
          </div>
          <div className="flex justify-center">
            <img
              src={itemData.sprites?.default}
              alt={itemData.name}
              className="h-16 object-contain"
            />
          </div>
          <div className="text-[8px] italic pt-1">
            {itemData.effect_entries?.find((e: any) => e.language.name === "en")?.effect || "No description available."}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaObjetos;
