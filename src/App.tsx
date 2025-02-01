import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Registration from "./pages/Auth/Registration";
import Home from "./pages/Home/Home";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/registration",
      element: <Registration />,
    },
    {
      path: "/",
      element: <Home />,
    },
  ]);
  return <RouterProvider router={appRouter} />;
}

export default App;
