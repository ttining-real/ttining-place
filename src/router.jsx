import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/layout/RootLayout";
import {
  About,
  Career,
  Experience,
  Home,
  Projects,
  Skills,
  Test,
} from "@/pages";

export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/skills",
        element: <Skills />,
      },
      {
        path: "/experience",
        element: <Experience />,
      },
      {
        path: "/career",
        element: <Career />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/test",
        element: <Test />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;
