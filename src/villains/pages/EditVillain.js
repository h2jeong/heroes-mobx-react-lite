import React, { useState, useEffect, useContext } from "react";
import { useObserver } from "mobx-react-lite";
import { villainContext } from "../villain-context";
import { toJS } from "mobx";

export default function EditVillain(params) {
  const villainStore = useContext(villainContext);
  useEffect(() => {
    villainStore.getVillainById(params.id);
  }, []);
  const [isSuccess, setisSuccess] = useState(false);

  const handleInputChange = ({ currentTarget: input }) => {
    const updatedVillain = villainStore.villain;
    const { name, value } = input;
    updatedVillain[name] = value;
    villainStore.setVillain(updatedVillain);
    console.log("editVillain-change ::", toJS(villainStore.villain));
  };

  const handleSubmit = e => {
    e.preventDefault();
    villainStore.putVillain();
    console.log("editVillain-submit ::", toJS(villainStore.villains));
    setisSuccess(!isSuccess);
  };

  const handleBackButton = () => {
    window.history.back();
  };

  return useObserver(() => (
    <>
      <h2>Edit Villain</h2>
      <div className="card my-3" style={{ width: "auto" }}>
        <form className="card-header" onSubmit={handleSubmit}>
          <section className="d-flex flex-row">
            <div className="mt-3 mr-3 input-width">
              <label htmlFor="firstName">First Name</label>
              <input
                name="firstName"
                value={villainStore.villain.firstName}
                id="firstName"
                type="text"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mt-3 mr-3 input-width">
              <label htmlFor="lastName">Last Name</label>
              <input
                name="lastName"
                value={villainStore.villain.lastName}
                id="lastName"
                type="text"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
          </section>
          <label htmlFor="house" className="mt-3">
            House
          </label>
          <input
            name="house"
            value={villainStore.villain.house}
            id="house"
            type="text"
            onChange={handleInputChange}
            className="form-control"
          />
          <label htmlFor="knownAs" className="mt-3">
            Known as
          </label>
          <input
            name="knownAs"
            value={villainStore.villain.knownAs}
            id="knownAs"
            type="text"
            onChange={handleInputChange}
            className="form-control"
          />
          <button
            type="submit"
            disabled={isSuccess}
            className="btn btn-info mt-3"
          >
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
      {isSuccess && (
        <div className="alert alert-success col-md-3" role="alert">
          This villain has been updated!
        </div>
      )}
    </>
  ));
}
