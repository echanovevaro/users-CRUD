import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import RootLayout from "./pages/Root"
import Errors from "./pages/Errors"

import { queryClient } from "./http"
import NewUser from "./pages/NewUser"
import DetailUser from "./pages/DetailUser"
import EditUser from "./pages/EditUser"
import HomePage from "./pages/HomePage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Errors />,
    children: [
      { index: true, element: <Navigate to="/users" replace /> },
      // {
      //   path: "/login",
      //   element: <LoginPage />,
      // },
      {
        path: "users",
        element: <HomePage />,
        children: [{ path: "new", element: <NewUser /> }],
      },
      {
        path: "users/:userId",
        element: <DetailUser />,
        children: [{ path: "edit", element: <EditUser /> }],
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
