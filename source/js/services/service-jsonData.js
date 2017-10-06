import Rx from 'rx';
import { getData } from '../env';

class DataService {
  static instance = null;
  constructor() {
    if (!DataService.instance) {
      DataService.instance = this;
      const data = Rx.Observable.fromPromise(getData('JSON'));
      this.getData = (callback) => {
        data.subscribe(callback);
      };
    }
    return DataService.instance;
  }
}

export const dataService = new DataService();
