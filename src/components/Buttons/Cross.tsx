import { useContext } from "react";
import { EPokedexScreen, MenuPokedexContext } from "../../contexts/MenuPokedexContext";

export const Cross = () => {
  const { screen, menuOption, setMenuOption, moveSelectionUp, moveSelectionDown } = useContext(MenuPokedexContext);

  return (
    <div id="cross">
      <div id="leftcross" className="gameboy-button">
        <div id="leftT"></div>
      </div>
      <div
        id="topcross"
        className="gameboy-button"
        onClick={() => {
          if (screen === EPokedexScreen.MENU) {
            const newOption = menuOption - 1 < 1 ? 3 : menuOption - 1
            setMenuOption(newOption)
          } else if (screen === EPokedexScreen.POKEDEX && moveSelectionUp) {
            moveSelectionUp();
          }
        }}
      >
        <div id="upT"></div>
      </div>
      <div id="rightcross" className="gameboy-button">
        <div id="rightT"></div>
      </div>
      <div id="midcross" className="gameboy-button">
        <div id="midCircle"></div>
      </div>
      <div
        id="botcross"
        className="gameboy-button"
        onClick={() => {
          if (screen === EPokedexScreen.MENU) {
            const newOption = menuOption + 1 > 3 ? 1 : menuOption + 1
            setMenuOption(newOption)
          } else if (screen === EPokedexScreen.POKEDEX && moveSelectionDown) {
            moveSelectionDown();
          }
        }}
      >
        <div id="downT"></div>
      </div>
    </div>
  )
}