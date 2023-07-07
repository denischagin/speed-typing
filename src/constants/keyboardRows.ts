import { IKey } from "../types/IKey";

const row1: IKey[] = [
  { id: "key-ё", key: "ё"},
  { id: "key-1", key: "1"},
  { id: "key-2", key: "2"},
  { id: "key-3", key: "3"},
  { id: "key-4", key: "4"},
  { id: "key-5", key: "5"},
  { id: "key-6", key: "6"},
  { id: "key-7", key: "7"},
  { id: "key-8", key: "8"},
  { id: "key-9", key: "9"},
  { id: "key-0", key: "0"},
  { id: "key-minus", key: "-"},
  { id: "key-equal", key: "="},
  { id: "key-backspace", key: "Backspace"},
];

const row2: IKey[] = [
  { id: "key-tab", key: "Tab"},
  { id: "key-й", key: "й"},
  { id: "key-ц", key: "ц"},
  { id: "key-у", key: "у"},
  { id: "key-к", key: "к"},
  { id: "key-е", key: "е"},
  { id: "key-н", key: "н"},
  { id: "key-г", key: "г"},
  { id: "key-ш", key: "ш"},
  { id: "key-щ", key: "щ"},
  { id: "key-з", key: "з"},
  { id: "key-х", key: "х"},
  { id: "key-ъ", key: "ъ"},
  { id: "key-backslash", key: "\\"},
];

const row3: IKey[] = [
  { id: "key-caps", key: "Caps"},
  { id: "key-ф", key: "ф"},
  { id: "key-ы", key: "ы"},
  { id: "key-в", key: "в"},
  { id: "key-а", key: "а"},
  { id: "key-п", key: "п"},
  { id: "key-р", key: "р"},
  { id: "key-о", key: "о"},
  { id: "key-л", key: "л"},
  { id: "key-д", key: "д"},
  { id: "key-ж", key: "ж"},
  { id: "key-э", key: "э"},
  { id: "key-enter", key: "Enter"},
];

const row4: IKey[] = [
  { id: "key-shift-left", key: "Shift"},
  { id: "key-я", key: "я"},
  { id: "key-ч", key: "ч"},
  { id: "key-с", key: "с"},
  { id: "key-м", key: "м"},
  { id: "key-и", key: "и"},
  { id: "key-т", key: "т"},
  { id: "key-ь", key: "ь"},
  { id: "key-б", key: "б"},
  { id: "key-ю", key: "ю"},
  { id: "key-dot", key: "."},
  { id: "key-shift-right", key: "Shift"},
];

const row5: IKey[] = [
  { id: "key-ctrl-left", key: "Ctrl"},
  { id: "key-win-left", key: "Win"},
  { id: "key-alt-left", key: "Alt"},
  { id: "key-space", key: "Space"},
  { id: "key-alt-right", key: "Alt"},
  { id: "key-win-right", key: "Win"},
  { id: "key-ctrl-right", key: "Ctrl"},
];

export const keyboardRows = [row1, row2, row3, row4, row5];
