import React from "react";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

interface ProvidersProps {
  readonly children: JSX.Element;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
            {children}
    </ApplicationProvider>
  );
};
