import axios from 'axios';

const serviceURLs = {
  JSON: 'http://81.177.101.143/test.json',
};


export function getURL(service) {
  return serviceURLs[service];
}

export function getGontentType(data) {
  return (typeof data === 'object') ? 'application/json' : 'application/xml';
}

export function replaceUrlPlaceholders(url, parameters) {
  let tmp = url;
  if (typeof parameters !== 'undefined') {
    for (const key in parameters) { // eslint-disable-line
      tmp = tmp.replace(`%${ key }%`, parameters[key]);
    }
  }
  return tmp;
}

export function getData(service, parameters) {
  const url = replaceUrlPlaceholders(getURL(service), parameters);
  const contentType = 'application/json';

  return axios.get(url, {
    headers: {
      Accept: contentType,
    },
  }).then((response) => response.data);
}
