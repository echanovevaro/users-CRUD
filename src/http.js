import { QueryClient } from "@tanstack/react-query"
export const queryClient = new QueryClient()

export const fetchUsers = async () => {
  const response = await fetch("http://localhost:3004/users")
  const data = await response.json()
  if (!response.ok) {
    const error = new Error("An error has occurred while fetching the users")
    error.status = response.status

    throw error
  }

  return data.sort((a, b) => b.id - a.id)
}

export const fetchUser = async (userId) => {
  const response = await fetch("http://localhost:3004/users/" + userId)
  const data = await response.json()
  if (!response.ok) {
    const error = new Error("An error has occurred while fetching the user")
    error.status = response.status

    throw error
  }

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
  if (!response.ok) {
    const error = new Error("An error has occurred while creating the user", {
      status: response.status,
    })

    // error.message = await response.json()

    throw error
  }

  return response.json()
}

export const deleteUser = async (userId) => {
  const response = await fetch("http://localhost:3004/users/" + userId, {
    method: "DELETE",
  })

  if (!response.ok) {
    const error = new Error("An error has occurred while deleting the user")
    error.status = response.status

    throw error
  }

  return await response.json()
}

export const updateUser = async ({ user, userId }) => {
  const response = await fetch("http://localhost:3004/users/" + userId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  if (!response.ok) {
    const error = new Error("An error has occurred while update the user")
    error.status = response.status
    error.message = await response.json()

    throw error
  }

  return response.json()
}
