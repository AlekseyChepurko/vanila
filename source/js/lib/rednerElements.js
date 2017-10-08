import { Observable } from 'rxjs';
import { itemsService } from '../services/service-items';

const renderElement = (element) => {
  const res = document.createElement('li');
  res.style = `background-image: url(${ element.imageUrl })`;
  res.setAttribute('class', 'item-wrap');

  const name = document.createElement('p');
  name.setAttribute('class', 'item__name');
  name.innerText = element.name;

  const text = document.createElement('p');
  text.setAttribute('class', 'item__text');
  text.innerText = element.text;

  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('class', 'item__delete-button');
  deleteButton.innerText = 'delete';
  const removeButtonStream = new Observable.fromEvent(deleteButton, 'click');
  removeButtonStream.subscribe(() => {
    itemsService.removeActiveItem(element.id);
    res.remove();
  });

  const hoverInfo = document.createElement('div');
  hoverInfo.setAttribute('class', 'item__hover-info');
  hoverInfo.appendChild(text);
  hoverInfo.appendChild(deleteButton);

  res.setAttribute('key', element.id);
  res.appendChild(name);
  res.appendChild(hoverInfo);

  return res;
};

export default function renderElements(elements, dist) {
  elements.forEach(element => {
    if (!dist.querySelector(`[key="${ element.id }"]`)) {
      dist.insertBefore(renderElement(element), dist.firstChild);
    }
  });
}

