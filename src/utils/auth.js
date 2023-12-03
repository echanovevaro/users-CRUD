import { redirect } from "react-router-dom"

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration")
  return new Date(storedExpirationDate) - new Date()
}

export const getUserToken = () => {
  const token = localStorage.getItem("token")
  if (!token) {
    return null
  }

  const tokenDuration = getTokenDuration()
  if (tokenDuration < 0) {
    return "EXPIRED"
  }
  return token
}

export const tokenLoader = () => {
  return getUserToken()
}

export function checkAuthLoader() {
  // this function will be added in the next lecture
  // make sure it looks like this in the end
  const token = getUserToken()

  if (!token) {
    return redirect("/signup")
  }

  return null // this is missing in the next lecture video and should be added by you
}
