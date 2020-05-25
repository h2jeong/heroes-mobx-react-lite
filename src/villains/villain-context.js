import React, { createContext } from "react";
import { useLocalStore } from "mobx-react-lite";
import { toJS } from "mobx";
export const VillainProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    villains: [
      {
        id: "839FFA6F-9768-9287-5D92-DBBBA456EC60",
        firstName: "Odette",
        lastName: "Carroll",
        house: "Kiribati",
        knownAs: "Vitae Odio Sagittis Inc."
      },
      {
        id: "A3D523C0-F181-B49D-7F88-E8D72DD2EEC0",
        firstName: "Justin",
        lastName: "Lynch",
        house: "Georgia",
        knownAs: "Risus Quis Associates"
      },
      {
        id: "36708E15-84F9-DAAA-AB5B-F404AFFD3FCC",
        firstName: "Dana",
        lastName: "Branch",
        house: "Cocos (Keeling) Islands",
        knownAs: "Porttitor Eros Industries"
      }
    ],
    villain: {
      id: "",
      firstName: "",
      lastName: "",
      house: "",
      knownAs: ""
    },
    isLoading: false,
    error: "",
    newId: Date.now(),
    // 아이디로 불러오기, 새로 넣기, 수정하기, 삭제하기

    getVillainById(id) {
      store.villain = store.villains.filter(villain => villain.id === id)[0];
      console.log("getId::", toJS(store.villain));
    },
    postVillain() {
      console.log("preVillain::", toJS(store.villain));
      store.villain.id = `${store.newId++}_new`;
      store.villains.unshift(store.villain);
      console.log("newVillain::", toJS(store.villains));
      store.initVillain();
    },
    putVillain() {
      store.villains.map(villain =>
        villain.id === store.villain.id ? store.villain : villain
      );
      // store.initVillain();
      console.log("updatedVillan::", toJS(store.villains));
    },
    deleteVillain(id) {
      store.villains = store.villains.filter(villain => villain.id !== id);
      console.log("delete::", id, store.villains.id);
      store.initVillain();
    },
    setVillain(villain) {
      store.villain = villain;
    },
    initVillain() {
      store.villain = {
        id: "",
        firstName: "",
        lastName: "",
        house: "",
        knownAs: ""
      };
    },
    get totalVillains() {
      return store.villains.length;
    },
    get allVillains() {
      return store.villains;
    }
  }));
  return (
    <villainContext.Provider value={store}>{children}</villainContext.Provider>
  );
};

export const villainContext = createContext();
