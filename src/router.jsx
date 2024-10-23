import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layout/RootLayout";
import { Error, Portfolio } from "@/pages";

export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Portfolio />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;
