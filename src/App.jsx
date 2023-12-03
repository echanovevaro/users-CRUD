import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import RootLayout from "./pages/Root"
import Errors from "./pages/Errors"

import { queryClient } from "./http"
import NewUser from "./pages/NewUser"
import DetailUser from "./pages/DetailUser"
import EditUser from "./pages/EditUser"
import HomePage from "./pages/HomePage"
import AuthPage, { loginAction, signupAction } from "./pages/AuthPage"
import { checkAuthLoader } from "./utils/auth"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/users" replace /> },
      {
        path: "/login",
        element: <AuthPage />,
        action: loginAction,
      },
      {
        path: "/signup",
        element: <AuthPage />,
        action: signupAction,
      },
      {
        path: "users",
        element: <HomePage />,
        children: [{ path: "new", element: <NewUser /> }],
      },
      {
        path: "users/:userId",
        element: <DetailUser />,
        children: [{ path: "edit", element: <EditUser /> }],
        loader: checkAuthLoader,
      },
    ],
  },
])
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
