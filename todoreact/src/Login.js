import React, { useState } from "react";
import Axios from "axios";
import { AlertOctagon, Lock } from "react-feather";
import { Link, useHistory } from "react-router-dom";
const Login = () => {
  let history = useHistory();
  const onLoginHandler = () => {
    if (!email) return seterror("Invalid Email");
    if (!password) return seterror("Invalid Password");
    console.log(email, password);
    Axios.post("http://localhost:8080/user/login", {
      email: email,
      password: password,
    })
      .then((res) => {
        if (res.data.error) throw res.data;
        console.log(res.data);
        window.localStorage.setItem("user_id", res.data._id);
        window.localStorage.setItem("token", res.data.token);

        history.push("/todo");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");

  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-xl-4"></div>
          <div className="col-xl-4">
            <div className="card mt-3">
              <div className="card-header">
                <h1>
                  <Lock
                    size="30"
                    class="mr-2"
                    style={{ verticalAlign: "baseline" }}
                  />
                  Login
                </h1>
              </div>
              <div className="card-body">
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
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="text"
                    class={
                      error.includes("Email")
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="exampleInputEmail1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-describedby="emailHelp"
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    class={
                      error.includes("Password")
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    value={password}
                    id="exampleInputPassword1"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <button
                  onClick={onLoginHandler}
                  class="btn btn-primary"
                  exact
                  to="/todo"
                >
                  Submit
                </button>
                <Link
                  className="btn btn-outline-light bg-danger"
                  exact
                  to="/Reg"
                >
                  Registation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
