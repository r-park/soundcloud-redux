import { searchSagas } from './search';
import { tracklistSagas } from './tracklists';


export default function* sagas() {
  yield [
    ...searchSagas,
    ...tracklistSagas
  ];
}
