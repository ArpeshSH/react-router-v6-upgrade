import React from "react";
import styles from "app/components/Welcome/Welcome.module.less";
import Workflow from "public/assets/images/workflow.png";
import RoutePaths from "../RoutePaths";
import { useHistory } from "react-router-dom";

function Welcome() {
  const history = useHistory();
  const goToPage2 = () => {
    history.push(RoutePaths.page2);
  }
  return (
    <section>
      <header className={styles["text-center"]}>
        <h1>Welcome to Sendinblue React BoilerPlate</h1>
      </header>
      <article style={{ display: "flex" }}>
        <section>
          <h3> Features Supported </h3>
          <ul>
            <li>
              Create components, containers, routes, selectors and their tests{" "}
            </li>
            <li>
              Use template strings, object destructuring, arrow functions, JSX
              syntax and more.
            </li>
            <li>CSS Modules</li>
            <li>Lazy load</li>
            <li>Webpack analyser builder</li>
          </ul>
        </section>
        <img src={Workflow} alt="" width="50%" height="90%" />
      </article>
      <button onClick={goToPage2}>Go to Page2</button>
    </section>
  );
}

export default Welcome;
