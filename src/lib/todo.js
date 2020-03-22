import PouchyStore from "pouchy-store";
import config from "./config.js";

export default class TodoLib extends PouchyStore {
  get name() {
    return this._name;
  }

  setName(name) {
    this._name = name;
  }

  get urlRemote() {
    return config.couchDBUrl;
  }

  get optionsRemote() {
    return {
      auth: config.couchDBAuth
    };
  }

  sortData(data) {
    data.sort((one, two) => {
      const oneTs = one.createdAt;
      const twoTs = two.createdAt;
      if (oneTs > twoTs) return -1;
      if (oneTs < twoTs) return 1;
      return 0;
    });
  }

  filterDataById(id, data) {
    return data.filter(data => data._id === id);
  }
}
