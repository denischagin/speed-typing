import React, { FC, ReactNode, useState } from "react";
import { TextContext } from "../context/textContext";
import { useAppDispatch } from "../hooks/redux";
import { fetchText } from "../store/asyncActions/fetchText";
import { TextTypeEnum } from "../types/TextTypeEnum";

interface TextProviderProps {
  children: ReactNode | ReactNode[];
}

const TextProvider: FC<TextProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  const getNewTextFunction = (textType: TextTypeEnum, textNumber: number) => {
    dispatch(fetchText({ textType, textNumber }));
  };

  const [getNewText, setGetNewText] = useState(
    () => (textType: TextTypeEnum, textNumber: number) =>
      getNewTextFunction(textType, textNumber)
  );

  const contextValue = {
    getNewText,
  };

  console.log(getNewText)

  return (
    <TextContext.Provider
      value={contextValue}
    >
      {children}
    </TextContext.Provider>
  );
};

export default TextProvider;
