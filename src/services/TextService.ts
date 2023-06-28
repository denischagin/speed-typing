import { IText } from "../types/IText";
import { TextTypeEnum } from "../types/TextTypeEnum";

const URL = "https://fish-text.ru/get";

export class TextService {
  static async getText(type: TextTypeEnum, number: number): Promise<any> {
    const params = [
      `type=${type}`,
      `number=${number}`,
      `format=json`,
      `lang=ru`,
    ].join("&");

    const response = await fetch([URL, params].join("?"));
    return response.json();
  }
}
