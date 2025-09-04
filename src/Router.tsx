import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home";
import Detail from "./routes/Detail"; // 👈 Detail 컴포넌트 import 추가

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
        path: ":stationName", // 👈 상세 페이지 경로 추가
        element: <Detail />,
      },
    ],
  },
]);

export default router;
