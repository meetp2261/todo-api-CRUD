import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Anchor, Clipboard, PlusCircle, Edit2, X } from "react-feather";
const Todo = () => {
  const [resDetail, setResDetail] = useState([]);

  const onSubmitDetails = () => {
    if (!details) return seterror("empty field");
    Axios.post("http://localhost:8080/todo/create", {
      details: details,
      user_id: window.localStorage.getItem("user_id"),
    }).then((res) => {
      console.log(res.data.data);
      window.location.reload();
    });
  };
  const [details, setDetails] = useState("");
  const [error, seterror] = useState("");
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [valueTobeEdit, setValueTobeChange] = useState("");
  const [valueTobeDelete, setValueTobeDelete] = useState("");
  const [detailsId, setDetailsId] = useState("");
  const [checkBoxValue, setCheckBoxValue] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [tokenId, setTokenId] = useState();
  const [deleteModel, setDeleteModel] = useState();
  const [checkModel, setCheckModel] = useState();
  const [checkId, setCheckId] = useState();

  const doneEditing = () => {
    if (!valueTobeEdit) return;
    Axios.post("http://localhost:8080/todo/edit", {
      id: detailsId,
      details: valueTobeEdit,
    })
      .then((res) => {
        console.log(res.data.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const doneCheckBox = () => {
    Axios.post("http://localhost:8080/todo/complete", {
      is_active: checkBoxValue,
      id: checkId,
    })
      .then((res) => {
        console.log(res.data.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (window.localStorage.getItem("user_id"))
      Axios.post("http://localhost:8080/todo/getall", {
        user_id: window.localStorage.getItem("user_id"),
      }).then((res) => {
        console.log(res.data.data);
        setResDetail(res.data.data);
        if (res) setLoading(true);
      });
  }, []);

  const doneDeleted = () => {
    console.log(deleteId);
    Axios.post("http://localhost:8080/todo/delete", {
      id: deleteId,
    })
      .then((res) => {
        console.log(res.data.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const tokenDeleted = () => {
    console.log(tokenId);
    Axios.post("http://localhost:8080/user/logout", {
      id: tokenId,
    })
      .then((res) => {
        console.log(res.data.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const deleteUser = async (user_id) => {
  //   await Axios.delete("http://localhost:8080/todo/getall/${user_id}");
  // };

  return loading ? (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-xl-4"></div>
          <div className="col-xl-4">
            <div className="card mt-3">
              <div className="card-header">
                {" "}
                <h1>
                  <Clipboard
                    size="30"
                    className="mr-2"
                    style={{ verticalAlign: "baseline" }}
                  />
                  Things You Do
                  <Anchor
                    size="30"
                    className="mr-4"
                    style={{ verticalAlign: "baseline" }}
                  />
                </h1>
              </div>
              <div className="card-body">
                <div className="col-xl-12">
                  <input
                    type="text"
                    className="pl-2 border w-100"
                    style={{ height: "40px", outline: "none" }}
                    placeholder="What To Do"
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>
                <div className="col-xl-12">
                  {" "}
                  <button
                    onClick={onSubmitDetails}
                    className="btn btn-outline bg-primary mt-4 text-white"
                  >
                    <PlusCircle
                      size="18"
                      className="mr-2"
                      style={{ verticalAlign: "sub" }}
                    />
                    Add
                  </button>
                </div>
              </div>
            </div>
            {/* {resDetail ? (
              <div className="alert alert-info">{resDetail.details}</div>
            ) : null} */}
            {resDetail.length > 0
              ? resDetail.map((el, index) => (
                  <div className="card mt-2" key={index}>
                    <div className="card-body">
                      <div className="container">
                        <div className="row">
                          <div className="col-sm-2 d-flex align-items-center">
                            <input
                              type="checkbox"
                              // value={checkBoxValue}
                              // onChange={(e) => setCheckBoxValue(!checkBoxValue)}
                              onClick={(e) => {
                                setCheckId(el.id);
                                setCheckModel(true);
                              }}
                            ></input>
                          </div>
                          <div className="col-sm-6 d-flex align-items-center">
                            {el.details}
                          </div>
                          <div className="col-sm-4">
                            <div
                              className="btn btn-sm btn-warning"
                              onClick={(e) => {
                                setDetailsId(el._id);
                                setEditModal(true);
                              }}
                            >
                              <Edit2
                                size="18"
                                style={{ verticalAlign: "sub" }}
                              />
                            </div>
                            <div
                              className="btn btn-sm btn-danger ml-2"
                              onClick={(e) => {
                                setDeleteId(el._id);
                                setDeleteModel(true);
                              }}
                            >
                              <X size="18" style={{ verticalAlign: "sub" }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div
          className={editModal ? "modal display-modal" : "modal"}
          tabindex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={(e) => setEditModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={valueTobeEdit}
                  onChange={(e) => setValueTobeChange(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={doneEditing}>
                  Save changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={(e) => setEditModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={deleteModel ? "modal display-modal" : "modal"}
        tabindex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Are You Sure ?</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={(e) => setDeleteModel(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-footer">
              <button className="btn btn-primary" onClick={doneDeleted}>
                Sure
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={(e) => setDeleteModel(false)}
              >
                Cancle
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={checkModel ? "modal display-modal" : "modal"}
        tabindex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{details} is complited ?</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={(e) => setCheckModel(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-footer">
              <button className="btn btn-primary" onClick={doneCheckBox}>
                Sure
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={(e) => setCheckModel(false)}
              >
                Cancle
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={(e) => {
          Axios.post(
            "http://localhost:8080/user/logout",
            {},
            {
              headers: {
                "SESSION-TOKEN": window.localStorage.getItem("token"),
              },
            }
          )
            .then((res) => {})
            .catch((err) => {
              console.log(err);
            });
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("user_id");
        }}
        className="btn btn-outline bg-primary mt-4 ml-5 mb-4"
        exact
      >
        Log Out
      </button>
    </>
  ) : (
    <h1>LOADING..</h1>
  );
};

export default Todo;
