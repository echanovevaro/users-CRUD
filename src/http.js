import { QueryClient } from "@tanstack/react-query"
export const queryClient = new QueryClient()

export const fetchUsers = async () => {
  const response = await fetch("http://localhost:3004/users")
  const data = await response.json()

  console.log(data)
  return data.sort((a, b) => b.id - a.id)
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

export const deleteUser = async (userId) => {
  const response = await fetch("http://localhost:3004/users/" + userId, {
    method: "DELETE",
  })

  return response.json()
}

export const updateUser = async ({ user, userId }) => {
  console.log("user, userId", user, userId)
  const response = await fetch("http://localhost:3004/users/" + userId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })

  return response.json()
}
