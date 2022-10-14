import React from "react";
import { render } from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { link } from "./graphql/link";
import App from "./App";

import "./index.css";

const policyForProcessorType = { // OK
  typePolicies: {
    ProcessorType: {
      merge: true
    },
  },
}
const policyForPriceInfoType = { // not OK, as the parent object is non-normalized
  typePolicies: {
    PriceInfoType: {
      merge: true
    },
  },
}
const policyForCoreType = { // not OK
  typePolicies: {
    CoreType: {
      merge: true
    },
  },
}

const client = new ApolloClient({
  cache: new InMemoryCache(policyForCoreType),
  link
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
