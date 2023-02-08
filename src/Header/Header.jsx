import { Link } from "react-router-dom";
import "./Header.css";

export function Header() {
  return (
    <header>
      <div className="container">
        <img
          src="https://media.giphy.com/media/fnTxHzv7wCEPo18uDg/giphy.gif"
          alt="logo"
          class="logo"
        />

        <nav>
          <ul>
            <li>
              <Link to="Home">Home</Link>
            </li>
            <li>
              <Link to="plants">All Plants</Link>
            </li>
            <li>
              <Link to="plants/new">New Plant</Link>
            </li>
            <li class="login">
              <Link to="login">Login</Link>
            </li>
            <li class="login">
              <Link to="signup">Signup</Link>
            </li>
            <li class="plantid">
              <Link to="plantid">Plant Identification</Link>
            </li>
            <li class="planthealth">
              <Link to="planthealth">Plant Health</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
