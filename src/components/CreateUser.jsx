import { useMutation } from "@tanstack/react-query"
import classes from "./Details.module.css"
import { createUser, queryClient } from "../http"
import { useNavigate } from "react-router-dom"
import UserForm from "./UserForm"
import Modal from "./Modal"

function CreateUser() {
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ key: ["users"] })
      return navigate("../")
    },
  })

  function handleSubmit(formData) {
    mutate(formData)
  }

  function handleClose() {
    navigate("../")
  }

  return (
    <Modal onClose={handleClose}>
      {isPending && <p>Creating event...</p>}
      <UserForm onSubmit={handleSubmit}>
        <button className={classes.btnCreate}>Create</button>
      </UserForm>
    </Modal>
  )
}

export default CreateUser
