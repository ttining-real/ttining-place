import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/layout/RootLayout";
import { Test } from "@/pages";

export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/",
        element: <Test />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;
