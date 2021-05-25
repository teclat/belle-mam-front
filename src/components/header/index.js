import React, { Component } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header(props) {
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  };

  const getPath = () => {
    if (user.role === "parent") {
      return "/parents/home";
    } else if (user.role === "admin") {
      return "/admin/products";
    } else if (user.role === "guest") {
      return "/guest/personal";
    }
  };

  return (
    <header
      id="header"
      className={
        "container-fluid d-flex justify-content-between align-items-center " +
        (props.purple ? "purple" : "")
      }
    >
      <Link to="/home">
        <img
          className="header-logo"
          src={require("../../assets/images/" +
            (props.purple ? "cha-bebe-logo.png" : "logo-white.png"))}
          alt=""
        />
      </Link>
      <input type="checkbox" className="nav-menu-toggle" id="nav-menu-toggle" />
      <label htmlFor="nav-menu-toggle" className="nav-menu-toggle-label">
        <span></span>
      </label>
      <ul className="d-flex align-items-start">
        <li>
          <Link to="/why">
            <p>PORQUE A BELLE MAN</p>
          </Link>
        </li>
        <li>
          <Link to="home#how-it-works">
            <p>COMO FUNCIONA</p>
          </Link>
        </li>
        <li>
          <Link to="/partners">
            <p>PARCEIROS</p>
          </Link>
        </li>
        <li>
          <p>NOSSAS LISTAS</p>
        </li>
      </ul>
      <div className="header-btn-container">
        <div>
          {user ? (
            <Link to={() => getPath()}>
              <button
                className={
                  "header-menu-btn-secondary " + (props.purple ? "purple" : "")
                }
              >
                DASHBOARD
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button
                className={
                  "header-menu-btn-secondary " + (props.purple ? "purple" : "")
                }
              >
                ENTRAR
              </button>
            </Link>
          )}
        </div>
        <div>
          <a
            className="header-menu-btn-primary"
            href="https://bellemam.com.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LOJA BELLE MAN{" "}
            <img src={require("../../assets/images/enter.png")} alt="" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;

// export default class Header extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: null,
//     };
//   }

//   componentDidMount = async () => {
//     let user = await JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       this.setState({ user });
//     }
//   };

//   getPath = () => {
//     if (this.state.user.role === "parent") {
//       return "/parents/home";
//     } else if (this.state.user.role === "admin") {
//       return "/admin/products";
//     } else if (this.state.user.role === "guest") {
//       return "/guest/personal";
//     }
//   };

//   render() {
//     return (
//       <header
//         id="header"
//         className={
//           "container-fluid d-flex justify-content-between align-items-center " +
//           (this.props.purple ? "purple" : "")
//         }
//       >
//         <Link to="/home">
//           <img
//             className="header-logo"
//             src={require("../../assets/images/" +
//               (this.props.purple ? "cha-bebe-logo.png" : "logo-white.png"))}
//             alt=""
//           />
//         </Link>
//         <input
//           type="checkbox"
//           className="nav-menu-toggle"
//           id="nav-menu-toggle"
//         />
//         <label htmlFor="nav-menu-toggle" className="nav-menu-toggle-label">
//           <span></span>
//         </label>
//         <ul className="d-flex align-items-start">
//           <li>
//             <Link to="/why">
//               <p>PORQUE A BELLE MAN</p>
//             </Link>
//           </li>
//           <li>
//             <Link to="home#how-it-works">
//               <p>COMO FUNCIONA</p>
//             </Link>
//           </li>
//           <li>
//             <Link to="/partners">
//               <p>PARCEIROS</p>
//             </Link>
//           </li>
//           <li>
//             <p>NOSSAS LISTAS</p>
//           </li>
//         </ul>
//         <div className="header-btn-container">
//           <div>
//             {this.state.user ? (
//               <Link to={() => this.getPath()}>
//                 <button
//                   class={
//                     "header-menu-btn-secondary " +
//                     (this.props.purple ? "purple" : "")
//                   }
//                 >
//                   DASHBOARD
//                 </button>
//               </Link>
//             ) : (
//               <Link to="/login">
//                 <button
//                   className={
//                     "header-menu-btn-secondary " +
//                     (this.props.purple ? "purple" : "")
//                   }
//                 >
//                   ENTRAR
//                 </button>
//               </Link>
//             )}
//           </div>
//           <div>
//             <a
//               className="header-menu-btn-primary"
//               href="https://bellemam.com.br/"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               LOJA BELLE MAN{" "}
//               <img src={require("../../assets/images/enter.png")} alt="" />
//             </a>
//           </div>
//         </div>
//       </header>
//     );
//   }
// }
