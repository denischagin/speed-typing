import { createContext, useContext } from "react";
import { TextTypeEnum } from "../types/TextTypeEnum";


interface ITextContext {
  getNewText: (textType: TextTypeEnum, textNumber: number) => void;
}


export const TextContext = createContext<ITextContext>({
  getNewText: () => {}
});
export const useText = () => useContext(TextContext)