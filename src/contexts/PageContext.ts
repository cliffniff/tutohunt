import { createContext } from "react";

export const PageContext = createContext<(page: string) => void>(
    (page: string) => {}
);

export const PageContextProvider = PageContext.Provider;
export const PageContextConsumer = PageContext.Consumer;

export default PageContext;
