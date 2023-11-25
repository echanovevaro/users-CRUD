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
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/users/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New User
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
