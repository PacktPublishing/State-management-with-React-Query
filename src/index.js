import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CountProvider from "./CountContext/CountContext";
import GlobalProvider from "./GlobalContext/GlobalContext";
import myCounter from "./Mobx/Counter";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Use if your bundler doesn't support package exports
// const ReactQueryDevtoolsProduction = React.lazy(() =>
//   import('@tanstack/react-query-devtools/build/lib/index.prod.js').then(
//     (d) => ({
//       default: d.ReactQueryDevtools,
//     }),
//   ),
// )

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/production").then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

const CombinedProviders = () => {
  const [showDevtools, setShowDevtools] = React.useState(false);

  React.useEffect(() => {
    window.toggleDevtools = () =>
      setShowDevtools((previousState) => !previousState);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <CountProvider>
          <GlobalProvider>
            <App counter={myCounter} />
          </GlobalProvider>
        </CountProvider>
      </Provider>
      {showDevtools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
    </QueryClientProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<CombinedProviders />);
