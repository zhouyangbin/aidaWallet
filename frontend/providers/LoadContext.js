import React, { createContext, useState, useRef } from "react";

const LoadingContext = createContext({
  show: () => {},
  hide: () => {},
  showMenu: () => {},
  hideMenu: () => {},
});
export default LoadingContext;
