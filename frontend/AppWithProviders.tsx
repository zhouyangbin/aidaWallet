import { ScrollView } from "native-base";
import React from "react";
import App from "./App";
import { Providers } from "./Providers";
export default props => {
  return (
    <Providers>
      <App />
    </Providers>
  );
};
