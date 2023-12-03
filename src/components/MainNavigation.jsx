import { NavLink } from "react-router-dom"

import classes from "./MainNavigation.module.css"

function MainNavigation() {
  return (
    <header className={classes.header}>
      <NavLink
        to="/users"
        className={({ isActive }) => (isActive ? classes.active : undefined)}
        end
      >
        Home
      </NavLink>
      <nav>
        <ul>
          <li className={classes.list}>
            <NavLink
              to="/users/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New User
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Sign up
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
