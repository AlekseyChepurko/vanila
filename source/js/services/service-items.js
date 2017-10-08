import { Subject, Observable } from 'rxjs';
import logger from '../lib/ActionLogger';

const ADD_ITEM = 'ADD_ITEM';
const ADD_ITEMS = 'ADD_ITEMS';
const GET_NEXT_ACTIVE_ITEM = 'GET_NEXT_ACTIVE_ITEM';
const REMOVE_ACTIVE_ITEM = 'REMOVE_ACTIVE_ITEM';

const removeItemFromArray = (array, id) => {
  const itemIndex = array.findIndex(item => item.id === id);
  if (itemIndex > -1) {
    array.splice(itemIndex, 1);
    return [...array];
  }
  return array;
};

class ItemsService {
  constructor() {
    this.items = [];
    this.activeItems = [];
    this.activeOffset = 0;
    this.itemsObs = new Observable((producer) => {
      this.producer = producer;
    }).share();

    this.activeItemsObs = new Observable((producer) => {
      this.activeProducer = producer;
    }).share();

    this.actionSubj = new Subject();
    this.actionSubj.subscribe((action) => {
      this.reducer(action);
    });
    return this;
  }
  get data() {
    return {
      items: this.itemsObs,
      activeItems: this.activeItemsObs,
    };
  }
  addItem = (item) => {
    this.actionSubj.next({
      type: ADD_ITEM,
      payload: item,
    });
  };
  getNextActiveItems = (count = 4) => {
    this.actionSubj.next({
      type: GET_NEXT_ACTIVE_ITEM,
      payload: count,
    });
  };
  addItems = (item) => {
    this.actionSubj.next({
      type: ADD_ITEMS,
      payload: item,
    });
  };
  removeActiveItem = (id) => {
    this.actionSubj.next({
      type: REMOVE_ACTIVE_ITEM,
      payload: id,
    });
  };

  reducer = (action) => {
    if (process.env.NODE_ENV !== 'production') logger(action);
    switch (action.type) {
      case ADD_ITEM: {
        this.items = [action.payload, ...this.items];
        this.producer.next(this.items);
        break;
      }
      case ADD_ITEMS: {
        this.items = [...action.payload, ...this.items];
        this.producer.next(this.items);
        break;
      }
      case GET_NEXT_ACTIVE_ITEM: {
        const oldItems = this.activeItems;
        for (let i = 0; i < action.payload; i++) {
          if (this.items[this.activeOffset]) {
            this.activeItems = [this.items[this.activeOffset], ...this.activeItems];
            this.activeOffset++;
          }
        }
        if (oldItems !== this.activeItems) this.activeProducer.next(this.activeItems);
        break;
      }
      case REMOVE_ACTIVE_ITEM: {
        const deleteResult = removeItemFromArray(this.activeItems, action.payload);
        if (deleteResult !== this.activeItems) this.activeProducer.next(deleteResult);
        break;
      }
      default: break;
    }
  };
}

export const itemsService = new ItemsService();
