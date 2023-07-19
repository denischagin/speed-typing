import { useState } from "react";
import { IHistoryStatistic } from "../types/IHistoryStatistic";

export interface IHistoryStatisticWithIndex extends IHistoryStatistic {
  index: number;
}

interface IReturnedValue {
  countAttempts: number; // Количество попыток
  totalMistakes: number; // Общее количество ошибок
  averagePrintSpeedLetterPerMinute: number; // Средняя скорость печати (в знаках в минуту)
  averagePrintSpeedWordsPerMinute: number; // Средняя скорость печати (в словах в минуту)
  highestPrintSpeedLetterPerMinute: number; // Самый высокий результат по скорости печати (в знаках в минуту)
  highestPrintSpeedWordsPerMinute: number; // Самый высокий результат по скорости печати (в словах в минуту)
  lowestPrintSpeedLetterPerMinute: number; // Самый низкий результат по скорости печати (в знаках в минуту)
  lowestPrintSpeedWordsPerMinute: number; // Самый низкий результат по скорости печати (в словах в минуту)
  accuracy: number; // Аккуратность печати
  historyWithIndex: IHistoryStatisticWithIndex[]; // каждая попытка пронумерована с помощью индекса
}

const checkIsFinite = (number: number) => {
  return isFinite(number) ? number : 0;
};

export const useCalcFullStats = (
  history: IHistoryStatistic[]
): IReturnedValue => {
  let totalMistakes = history.reduce((acc, value) => {
    return acc + value.mistakes;
  }, 0);

  let totalTextSymbolCount = history.reduce((acc, value) => {
    return acc + value.text.length;
  }, 0);

  let countAttempts = history.length;

  let totalPrintSpeedLetterPerMinute = history.reduce((acc, value) => {
    return acc + value.printSpeedLetterPerMinute;
  }, 0);

  let totalPrintSpeedWordsPerMinute = history.reduce((acc, value) => {
    return acc + value.printSpeedWordsPerMinute;
  }, 0);

  let averagePrintSpeedLetterPerMinute = checkIsFinite(
    Math.round(totalPrintSpeedLetterPerMinute / countAttempts)
  );

  let averagePrintSpeedWordsPerMinute = checkIsFinite(
    Math.round(totalPrintSpeedWordsPerMinute / countAttempts)
  );

  let highestPrintSpeedLetterPerMinute = checkIsFinite(
    Math.max(...history.map((attempt) => attempt.printSpeedLetterPerMinute))
  );

  let highestPrintSpeedWordsPerMinute = checkIsFinite(
    Math.max(...history.map((attempt) => attempt.printSpeedWordsPerMinute))
  );

  let lowestPrintSpeedLetterPerMinute = checkIsFinite(
    Math.min(...history.map((attempt) => attempt.printSpeedLetterPerMinute))
  );

  let lowestPrintSpeedWordsPerMinute = checkIsFinite(
    Math.min(...history.map((attempt) => attempt.printSpeedWordsPerMinute))
  );

  let accuracy =
    ((totalTextSymbolCount - totalMistakes) / totalTextSymbolCount) * 100;

  const historyWithIndex = history.map((attempt, index) => ({
    ...attempt,
    index,
  }));

  return {
    countAttempts,
    totalMistakes,
    averagePrintSpeedLetterPerMinute,
    averagePrintSpeedWordsPerMinute,
    highestPrintSpeedLetterPerMinute,
    highestPrintSpeedWordsPerMinute,
    lowestPrintSpeedLetterPerMinute,
    lowestPrintSpeedWordsPerMinute,
    accuracy,
    historyWithIndex,
  };
};
