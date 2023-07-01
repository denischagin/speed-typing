export const validateText = (text: string) => {
  return text.replace(/\\n/g, " ").replace(/—/g, "-").replace(/–/g, "-").replace(/\s+/g, " ");
}
