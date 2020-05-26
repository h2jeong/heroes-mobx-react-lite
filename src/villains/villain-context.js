import React, { createContext } from "react";
import { useLocalStore } from "mobx-react-lite";
import { toJS } from "mobx";
import {
  getVillains,
  getVillainById,
  postVillain,
  putVillain,
  deleteVillain
} from "./villain-service";

export const VillainProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    villains: [
      // {
      //   id: "839FFA6F-9768-9287-5D92-DBBBA456EC60",
      //   firstName: "Odette",
      //   lastName: "Carroll",
      //   house: "Kiribati",
      //   knownAs: "Vitae Odio Sagittis Inc."
      // },
      // {
      //   id: "A3D523C0-F181-B49D-7F88-E8D72DD2EEC0",
      //   firstName: "Justin",
      //   lastName: "Lynch",
      //   house: "Georgia",
      //   knownAs: "Risus Quis Associates"
      // },
      // {
      //   id: "36708E15-84F9-DAAA-AB5B-F404AFFD3FCC",
      //   firstName: "Dana",
      //   lastName: "Branch",
      //   house: "Cocos (Keeling) Islands",
      //   knownAs: "Porttitor Eros Industries"
      // }
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
    async getVillains() {
      store.villains = (await getVillains()).data;
    },
    async getVillainById(id) {
      const { data } = await getVillainById(id);
      // store.villain = store.villains.filter(villain => villain.id === id)[0];
      store.villain = data;
      console.log("getId::", toJS(store.villain));
    },
    async postVillain() {
      console.log("preVillain::", toJS(store.villain));
      store.villain.id = `${store.newId++}_new`;
      const { data } = await postVillain(store.villain);
      store.villains.unshift(data);
      // console.log("newVillain::", toJS(store.villains));
      // store.initVillain();
    },
    async putVillain() {
      const { data } = await putVillain(store.villain);
      store.villains.map(villain =>
        villain.id === store.villain.id ? data : villain
      );
      // store.initVillain();
      // console.log("updatedVillan::", toJS(store.villains));
    },
    async deleteVillain(id) {
      await deleteVillain(id);
      store.villains = store.villains.filter(villain => villain.id !== id);
      console.log("delete::", id, store.villains.id);
      // store.initVillain();
    },
    setVillain(villain) {
      store.villain = villain;
    },
    // initVillain() {
    //   store.villain = {
    //     id: "",
    //     firstName: "",
    //     lastName: "",
    //     house: "",
    //     knownAs: ""
    //   };
    // },
    get totalVillains() {
      return store.villains.length;
    }
  }));
  return (
    <villainContext.Provider value={store}>{children}</villainContext.Provider>
  );
};

export const villainContext = createContext();
