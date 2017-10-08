import { Observable } from 'rxjs';
import { itemsService } from '../services/service-items';

const renderElement = (element) => {
  const res = document.createElement('li');
  res.setAttribute('class', 'item-wrap');

  const id = document.createElement('span');
  id.innerText = element.id;

  const image = document.createElement('img');
  image.setAttribute('src', element.imageUrl);
  image.setAttribute('class', 'item__image');

  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('class', 'item__delete-button');
  deleteButton.innerText = 'delete';
  const removeButtonStream = new Observable.fromEvent(deleteButton, 'click');
  removeButtonStream.subscribe(() => {
    itemsService.removeActiveItem(element.id);
    res.remove();
  });

  res.setAttribute('key', element.id);
  res.appendChild(id);
  res.appendChild(image);
  res.appendChild(deleteButton);

  return res;
};

export default function renderElements(elements, dist) {
  elements.forEach(element => {
    if (!dist.querySelector(`[key="${ element.id }"]`)) {
      dist.insertBefore(renderElement(element), dist.firstChild);
    }
  });
}

