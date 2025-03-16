import { createBrowserRouter } from "react-router";
import App from "../../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    // children: [
    //   {
    //     path: "shows/:showId",
    //     Component: Show,
    //     loader: ({ request, params }) =>
    //       fetch(`/api/show/${params.id}.json`, {
    //         signal: request.signal,
    //       }),
    //   },
    // ],
  },
]);