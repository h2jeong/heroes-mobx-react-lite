import React, { useContext, useEffect, useState } from "react";
import { heroContext } from "../hero-context";
import { toJS } from "mobx";
import { useObserver } from "mobx-react-lite";

export default function EditHero(params) {
  const heroStore = useContext(heroContext);
  useEffect(() => {
    heroStore.getHeroById(params.id);
  }, []);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    const updatedHero = heroStore.hero;
    updatedHero[name] = value;
    heroStore.setHero(updatedHero);
    console.log(toJS(heroStore.hero));
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log("submit");
    heroStore.putHero();
    setIsSuccess(!isSuccess);
  };
  const handleBackButton = () => {
    console.log("back");
    window.history.back();
  };

  return useObserver(() => (
    <>
      <h2>Edit Hero</h2>
      {/* {!heroStore.isLoading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
          role="status"
        >
          <span cl="sr-only">Loading...</span>
        </div>
      ) : ( */}
      <div className="card my-3" style={{ width: "auto" }}>
        <form className="card-header" onSubmit={handleSubmit}>
          <section className="d-flex flex-row">
            <div className="mt-3 mr-3 input-width">
              <label htmlFor="firstName">First Name</label>
              <input
                name="firstName"
                value={heroStore.hero.firstName}
                type="text"
                id="firstName"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-3 mr-3 input-width">
              <label htmlFor="lastName">Last Name</label>
              <input
                name="lastName"
                value={heroStore.hero.lastName}
                type="text"
                id="lastName"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
          </section>
          <label htmlFor="firstName">House</label>
          <input
            name="house"
            value={heroStore.hero.house}
            type="text"
            id="house"
            className="form-control"
            onChange={handleInputChange}
          />
          <label htmlFor="firstName">Known As</label>
          <input
            name="knownAs"
            value={heroStore.hero.knownAs}
            type="text"
            id="knownAs"
            className="form-control"
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-info mt-3">
            Update
          </button>
          <button
            type="button"
            onClick={handleBackButton}
            className="btn btn-outline-info mt-3 ml-3"
          >
            Back
          </button>
        </form>
      </div>
      {/* ) */}
      {isSuccess && (
        <div className="alert alert-success col-md-e" role="alert">
          This hero has been updated!
        </div>
      )}
    </>
  ));
}
