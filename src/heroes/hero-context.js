import React, { createContext } from "react";
import { useLocalStore } from "mobx-react-lite";
import { toJS } from "mobx";
import {
  getHeroes,
  getHeroById,
  postHero,
  putHero,
  deleteHero
} from "./hero-service";

export const HeroProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    heroes: [
      //   {
      //     id: "2DCD45A5-C0E6-C93C-4CEC-D3788EE5E0BA",
      //     firstName: "Ali",
      //     lastName: "Chase",
      //     house: "Bahrain",
      //     knownAs: "Nonummy Associates"
      //   },
      //   {
      //     id: "D6B10776-C048-4F70-8836-369E96334C12",
      //     firstName: "Amity",
      //     lastName: "Moreno",
      //     house: "Swaziland",
      //     knownAs: "Justo LLC"
      //   },
      //   {
      //     id: "839FFA6F-9768-9287-5D92-DBBBA456EC60",
      //     firstName: "Odette",
      //     lastName: "Carroll",
      //     house: "Kiribati",
      //     knownAs: "Vitae Odio Sagittis Inc."
      //   }
    ],
    hero: {
      id: "",
      firstName: "",
      lastName: "",
      house: "",
      knownAs: ""
    },
    isLoading: false,
    error: "",
    newId: Date.now(),
    setHero(hero) {
      store.hero = hero;
    },
    async getHeroById(id) {
      // store.hero = store.heroes.filter(hero => hero.id === id)[0];
      const { data } = await getHeroById(id);
      store.hero = data;
    },
    async postHero() {
      store.hero.id = store.newId++ + "";
      const { data } = await postHero(store.hero);
      console.log("post::", data);
      store.heroes.unshift(data);
      // store.initHero();
    },
    async putHero() {
      const { data } = await putHero(store.hero);
      console.log("put::", data);
      store.heroes.map(hero => (hero.id === data.id ? data : hero));
      // store.initHero();
    },
    async deleteHero(id) {
      await deleteHero(id);
      store.heroes = store.heroes.filter(hero => hero.id !== id);
      // store.initHero();
    },
    // initHero() {
    //   store.hero = {
    //     id: "",
    //     firstName: "",
    //     lastName: "",
    //     house: "",
    //     knownAs: ""
    //   };
    // },
    async getHeroes() {
      console.log("ff:: getHeroes");
      store.heroes = (await getHeroes()).data;
    },
    get totalHeroes() {
      return store.heroes.length;
    }
  }));
  return <heroContext.Provider value={store}>{children}</heroContext.Provider>;
};

export const heroContext = createContext();
