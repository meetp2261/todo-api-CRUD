import React, { useState } from "react";
import Axios from "axios";
import { AlertOctagon, Lock } from "react-feather";
import { Link } from "react-router-dom";

const Reg = () => {
  const onSubmitHandler = () => {
    if (!name) return seterror("empty field");
    if (!email) return seterror("empty email field");
    if (!password) return seterror("empty password field");
    console.log(email, password);
    Axios.post("http://localhost:8080/user/register", {
      name: name,
      email: email,
      password: password,
    })
      .then((req) => {
        if (req.data.error) throw req.data;
        console.log(req.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, seterror] = useState("");

  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-xl-4"></div>
          <div className="col-xl-4">
            <div className="card mt-3">
              <div className="card-header"></div>
              <h1>Registation</h1>
              <div class="form-group">
                {error ? (
                  <div className="alert alert-danger">
                    <AlertOctagon
                      size="15"
                      className="mr-3"
                      style={{ verticalAlign: "middle" }}
                    />
                    {error}
                  </div>
                ) : null}
              </div>
              <input
                value={name}
                id="exampleInputName"
                type="text"
                class={
                  error.includes("name")
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              ></input>

              <br />
              <input
                value={email}
                type="text"
                class={
                  error.includes("email")
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
              <br />
              <input
                value={password}
                type="password"
                class={
                  error.includes("password")
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <br />
              <button
                onClick={onSubmitHandler}
                className="btn btn-outline-light bg-danger"
              >
                Submit
              </button>
              <Link className="btn btn-outline-light bg-primary" exact to="/">
                login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Reg;
