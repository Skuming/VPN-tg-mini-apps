import React from "react";
import { InfoContextProps } from "../src/interfaces/interfaces";

export const InfoContext = React.createContext<InfoContextProps>({
  info: undefined,
  setInfo: () => {},
});
