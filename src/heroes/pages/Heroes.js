import React, { useContext, useState, useEffect } from "react";
import { heroContext } from "../hero-context";
import NewItemForm from "../../shared/components/NewItemForm";
import { Link } from "@reach/router";
import { toJS } from "mobx";
import { useObserver } from "mobx-react-lite";

export default function Heroes() {
  const heroStore = useContext(heroContext);
  const [isShowNewItemForm, setIsShowNewItemForm] = useState(false);
  useEffect(() => {
    heroStore.getHeroes();
  }, [heroStore]);

  const onChange = e => {
    const { name, value } = e.target;
    const newHero = heroStore.hero;
    newHero[name] = value;
    heroStore.setHero(newHero);
  };
  const onSubmit = e => {
    heroStore.postHero();
    showNewItemForm(false);
  };
  const showNewItemForm = () => {
    setIsShowNewItemForm(!isShowNewItemForm);
  };
  const removeItem = (id, name) => {
    console.log(window.confirm(`Delete ${name}?`));
    heroStore.deleteHero(id);
    console.log("heros-remove ::", toJS(heroStore.heroes));
  };

  return useObserver(() => (
    <>
      <NewItemForm
        isShowNewItemForm={isShowNewItemForm}
        handleOnChange={onChange}
        handleOnSubmit={onSubmit}
        handleShowNewItemForm={showNewItemForm}
      />
      {!heroStore.heroes ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <div
            className="spinner-border"
            style={{ width: "9rem", height: "9rem", color: "purple" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        heroStore.heroes.map(item => (
          <div key={item.id} className="card mt-3" style={{ width: "auto" }}>
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
                  to={`/edit-hero/${item.id}`}
                  className="btn btn-primary card-link col text-center"
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
    </>
  ));
}
