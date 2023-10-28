import React, { createContext, useState } from "react";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "./App.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import AppRouter from "./AppRouter";
import { Layout } from "./layouts";

interface ContextProps {
  showSpinner: boolean;
  setShowSpinner: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = createContext<ContextProps | undefined>(undefined);
const client = new ApolloClient({
  uri: "https://localhost:7141/graphql/",
  cache: new InMemoryCache(),
});

export default function App() {
  const [showSpinner, setShowSpinner] = useState(false);
  return (
    <ApolloProvider client={client}>
      <PrimeReactProvider>
        <Context.Provider value={{ showSpinner, setShowSpinner }}>
          <Layout>
            <AppRouter />
          </Layout>
        </Context.Provider>
      </PrimeReactProvider>
    </ApolloProvider>
  );
}
