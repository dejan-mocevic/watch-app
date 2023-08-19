import { WatchStyle } from "./watch-style";

export class Watch {
  id?: number;
  watchType: string = "";
  brand: string = "";
  model: string = "";
  price: string = "";
  watchStyleId?: number;
  watchStyle?: WatchStyle;
}
