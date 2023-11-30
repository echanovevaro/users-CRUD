import Modal from "../components/Modal"
import { useMutation } from "@tanstack/react-query"
import { createUser, queryClient } from "../http"
import { useNavigate } from "react-router-dom"
import UserForm from "../components/UserForm"
import classes from "../components/Details.module.css"
import Errors from "./Errors"
function NewUser() {
  const navigate = useNavigate()

  const { mutate, isPending, isError, error } = useMutation({
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
      {isError && <Errors title="An Error ocurred" message={error?.message} />}
      <UserForm onSubmit={handleSubmit}>
        <button className={classes.btnCreate}>Create</button>
      </UserForm>
    </Modal>
  )
}

export default NewUser
