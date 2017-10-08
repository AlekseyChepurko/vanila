import Rx from 'rxjs';
import { getData } from '../env';

class DataService {
  obs = null;
  get data() {
    if (!this.obs) this.obs = Rx.Observable.fromPromise(getData('JSON'));
    return this.obs;
  }
}

export const dataService = new DataService();
