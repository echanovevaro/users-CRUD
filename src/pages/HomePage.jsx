import { useQuery } from "@tanstack/react-query"
import { fetchUsers } from "../http"
import { Outlet } from "react-router-dom"
// import Loader from "react-js-loader"
import Errors from "./Errors"
import { Cards } from "../components/Cards"

function HomePage() {
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })
  console.log(data)
  return (
    <>
      <Outlet />

      {isPending && (
        <p>Loading...</p>
        // <div className="loader">
        //   <Loader
        //     type="spinner-circle"
        //     bgColor={"#FFFFFF"}
        //     color={"#242424"}
        //     title={"spinner-circle"}
        //     size={100}
        //   />
        // </div>
      )}
      {isError && <Errors title="An error ocurred" message={error?.message} />}
      {data && <Cards users={data} />}
    </>
  )
}

export default HomePage
