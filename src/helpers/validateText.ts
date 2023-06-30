export const validateText = (text: string) => {
  // Удаляем строки равные "\n" или "—"
  text = text.replace(/\n/g, "").replace(/—/g, "");

  // Заменяем множественные пробелы между словами на одиночные пробелы
  text = text.replace(/\s+/g, " ");
  return text
};
