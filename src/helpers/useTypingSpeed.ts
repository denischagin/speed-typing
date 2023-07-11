export const useTypingSpeed = (timer: number, text: string) => {
  const minutes = timer / 6000;

  const countLetters = text.length;
  const countWords = text.split(" ").length;

  let printSpeedLetterPerMinute = 0;
  let printSpeedWordsPerMinute = 0;

  printSpeedLetterPerMinute = Math.floor(countLetters / minutes);
  printSpeedWordsPerMinute = Math.floor(countWords / minutes);

  return { printSpeedLetterPerMinute, printSpeedWordsPerMinute };
};
