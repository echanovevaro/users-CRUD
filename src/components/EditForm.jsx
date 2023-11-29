import { useMutation, useQuery } from "@tanstack/react-query"
import classes from "./Details.module.css"
import { fetchUser, queryClient, updateUser } from "../http"
import { useParams, useNavigate, Link } from "react-router-dom"
import UserForm from "./UserForm"
import Modal from "./Modal"

function EditForm() {
  const navigate = useNavigate()
  const { userId } = useParams()

  const { data } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUser(userId),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ key: ["users"] })
      return navigate("../")
    },
  })

  function handleSubmit(formData) {
    console.log(formData)
    mutate({ userId: userId, user: formData })
  }

  function handleClose() {
    navigate("../")
  }

  return (
    <Modal onClose={handleClose}>
      {isPending && <p>Creating event...</p>}
      {data && (
        <>
          <UserForm inputData={data} onSubmit={handleSubmit}>
            <Link
              to="../"
              className={classes.btnDelete}
              style={{ marginRight: ".5rem" }}
            >
              Cancel
            </Link>
            <button type="submit" className={classes.btnEdit}>
              Update
            </button>
          </UserForm>
        </>
      )}
    </Modal>
  )
}

export default EditForm
