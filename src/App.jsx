import { Header } from "./Header/Header";
import { Content } from "./Content";
import { Footer } from "./Footer/Footer";
import { Scheduler } from "./Home/Scheduler";
import { Home } from "./Home/Home";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <div>
          <BrowserRouter>
            <Header />
            <Content />
          </BrowserRouter>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
