/* eslint-disable react/prop-types */

import classes from "./Details.module.css"
import { useMutation } from "@tanstack/react-query"
import { deleteUser, queryClient } from "../http"
import { useNavigate, useParams } from "react-router-dom"
import Modal from "./Modal"
import Errors from "../pages/Errors"
export const DeleteModal = ({ onClose }) => {
  const navigate = useNavigate()
  const { userId } = useParams()
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (userId) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ key: ["users"] })
      navigate("../")
    },
  })

  const handleDelete = () => {
    mutate(userId)
  }

  return (
    <Modal onClose={onClose}>
      {isPending && <p>Deleting user...</p>}
      {!isPending && !isError && (
        <>
          <h2>Are you sure?</h2>
          <p>Delete user cannot be undone </p>
          <div className={classes.modalActions}>
            <button className={classes.btnCancel} onClick={onClose}>
              Cancel
            </button>
            <button className={classes.btnDelete} onClick={handleDelete}>
              Delete
            </button>
          </div>
        </>
      )}
      {isError && (
        <Errors title="Failed to delete event" message={error?.message} />
      )}
    </Modal>
  )
}
