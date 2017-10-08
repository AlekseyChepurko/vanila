import { Observable } from 'rxjs';
import { dataService, itemsService } from './services';
import renderElements from './lib/rednerElements';
import '../styles/main.css';

const root = document.querySelector('#root');
dataService.data
  .subscribe(items => {
    root.innerHTML = '';
    itemsService.addItems(items);
  });

itemsService.data.items
  .subscribe(() => {
    itemsService.getNextActiveItems();
  });

itemsService.data.activeItems
  .subscribe(items => {
    renderElements(items, root);
  });

const button = document.querySelector('#add_button');
const loadObs = Observable.fromEvent(button, 'click');
loadObs
  .debounceTime(200)
  .subscribe(() => {
    itemsService.getNextActiveItems();
  });

