import React, { useState, useEffect, useContext } from "react";
import { Link } from "@reach/router";
import NewItemForm from "../../shared/components/NewItemForm";
import { villainContext } from "../villain-context";
import { useObserver } from "mobx-react-lite";
import { toJS } from "mobx";

export default function Villains() {
  const villainStore = useContext(villainContext);

  const [isShowNewItemForm, setisShowNewItemForm] = useState(false);

  // villains 불러오기
  // const villains = villainStore.villains;

  const showNewItemForm = () => {
    setisShowNewItemForm(!isShowNewItemForm);
  };

  const onChange = ({ currentTarget: input }) => {
    const newVillain = villainStore.villain;
    const { name, value } = input;
    newVillain[name] = value;
    villainStore.setVillain(newVillain);
    console.log("villains-change:", toJS(villainStore.villain));
  };

  const onSubmit = e => {
    e.preventDefault();
    // submit 하기
    villainStore.postVillain();

    console.log("villains-submit", villainStore.villains, villainStore.villain);
    setisShowNewItemForm(!isShowNewItemForm);
  };

  const removeItem = (id, name) => {
    console.log("id::", id);
    const isConfirmed = window.confirm(`Delete ${name}?`);
    if (!isConfirmed) return;

    villainStore.deleteVillain(id);

    console.log("villains-remove ::", toJS(villainStore.villains));
  };

  return useObserver(() => (
    <>
      <NewItemForm
        isShowNewItemForm={isShowNewItemForm}
        handleOnChange={onChange}
        handleOnSubmit={onSubmit}
        handleShowNewItemForm={showNewItemForm}
      />
      <div
        stlye={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        {!villainStore.villains ? (
          <div
            className="spinner-border"
            style={{ width: "9rem", height: "9rem", color: "purple" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          villainStore.villains.map(item => (
            <div key={item.id} className="card mt-3" stlye={{ width: "auto" }}>
              <div className="card-header">
                <h3 className="card-title">
                  {item.firstName} {item.lastName}
                </h3>
                <h5 className="card-subtitle mb-2 text-muted">{item.house}</h5>
                <p className="card-text">{item.knownAs}</p>
              </div>
              <section className="card-body">
                <div className="row">
                  <Link
                    to={`/edit-villain/${item.id}`}
                    className="btn btn-primary cark-link col text-center"
                  >
                    <span className="fas fa-edit mr-2" />
                    Edit
                  </Link>
                  <button
                    onClick={() => removeItem(item.id, item.firstName)}
                    className="btn btn-outline-danger card-link col text-center"
                  >
                    <span className="fas fa-eraser mr-2" />
                    Delete
                  </button>
                </div>
              </section>
            </div>
          ))
        )}
      </div>
    </>
  ));
}
