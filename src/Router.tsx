import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Trello from "./routes/Trello";
import Motion from "./routes/Motion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: ":stationName",
        element: <Detail />,
      },
      { path: "trello", element: <Trello /> },
      { path: "motion", element: <Motion /> },
    ],
  },
]);

export default router;
