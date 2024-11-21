import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layout/RootLayout";
import { Error, Portfolio, Test, Projects, Resume } from "@/pages";

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
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "resume",
        element: <Resume />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;
