import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layout/RootLayout";
import { Error, Home, Resume, Projects, Skills } from "@/pages";

export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "resume",
        element: <Resume />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "skills",
        element: <Skills />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;
