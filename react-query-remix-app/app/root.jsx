import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useDehydratedState } from "use-dehydrated-state";

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const dehydratedState = useDehydratedState();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydratedState}>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </Hydrate>
        </QueryClientProvider>
      </body>
    </html>
  );
}
