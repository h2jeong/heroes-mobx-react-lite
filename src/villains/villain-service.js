import http from "../shared/http-service";
import { BaseUrl } from "../api-config";

export function getVillains() {
  return http.get(BaseUrl.villains);
}

export function getVillainById(id) {
  return http.get(`${BaseUrl.villains}${id}`);
}

export function postVillain(villain) {
  return http.post(BaseUrl.villains, villain);
}

export function putVillain(villain) {
  return http.put(`${BaseUrl.villains}${villain.id}`, villain);
}

export function deleteVillain(id) {
  return http.delete(`${BaseUrl.villains}${id}`);
}
