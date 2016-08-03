import { playerSagas } from './player';
import { searchSagas } from './search';
import { tracklistSagas } from './tracklists';


export default function* sagas() {
  yield [
    ...playerSagas,
    ...searchSagas,
    ...tracklistSagas
  ];
}
