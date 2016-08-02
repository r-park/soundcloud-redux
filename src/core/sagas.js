import { tracklistSagas } from './tracklists';


export default function* sagas() {
  yield [
    ...tracklistSagas
  ];
}
