import http from "../shared/http-service";
import { BaseUrl } from "../api-config";

export function getHeroes() {
  console.log("db::getHeroes");
  return http.get(BaseUrl.heroes);
}

export function getHeroById(id) {
  console.log("db::getHeroById");
  return http.get(`${BaseUrl.heroes}${id}`);
}

export function postHero(hero) {
  console.log("db::postHero");
  return http.post(BaseUrl.heroes, hero);
}

export function putHero(hero) {
  console.log("db::putHero");
  return http.put(`${BaseUrl.heroes}${hero.id}`, hero);
}

export function deleteHero(id) {
  return http.delete(`${BaseUrl.heroes}${id}`);
}
