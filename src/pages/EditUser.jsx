import { useMutation, useQuery } from "@tanstack/react-query"
import classes from "../components/Details.module.css"
import { fetchUser, queryClient, updateUser } from "../http"
import { useParams, useNavigate } from "react-router-dom"
import Modal from "../components/Modal"
import UserForm from "../components/UserForm"
import Errors from "./Errors"

function EditUser() {
  const navigate = useNavigate()
  const { userId } = useParams()

  const { data } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUser(userId),
  })

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ key: ["users"] })
      return navigate("../")
    },
  })

  function handleSubmit(formData) {
    mutate({ userId: userId, user: formData })
  }

  function handleClose() {
    console.log("error", error)
    navigate("../")
  }

  return (
    <Modal onClose={handleClose}>
      {isPending && <p>Updating user...</p>}
      {isError && <Errors title="An error ocurred" message={error?.message} />}

      {data && (
        <>
          <UserForm inputData={data} onSubmit={handleSubmit}>
            {isPending ? (
              <p>Creating event...</p>
            ) : (
              <div className={classes.btn}>
                <button type="submit" className={classes.btnEdit}>
                  Update
                </button>
                <button className={classes.btnCancel} onClick={handleClose}>
                  Cancel
                </button>
              </div>
            )}
          </UserForm>
        </>
      )}
    </Modal>
  )
}

export default EditUser
