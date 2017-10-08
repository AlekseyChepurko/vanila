/* eslint-disable no-console */
export default function logger(action) {
  console.group('Action type:', action.type);
  console.log('Payload: ', action.payload);
  console.groupEnd('asd');
}
/* eslint-enable no-console */
