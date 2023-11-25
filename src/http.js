import { QueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
export const queryClient = new QueryClient()

export const fetchUsers = async () => {
  const response = await fetch("http://localhost:3004/users")
  const data = await response.json()

  console.log(data)
  return data
}

export const fetchUser = async (userId) => {
  const response = await fetch("http://localhost:3004/users/" + userId)
  const data = await response.json()

  console.log(data)
  return data
}
export const createUser = async (user) => {
  const response = await fetch("http://localhost:3004/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })

  return response.json()
}
