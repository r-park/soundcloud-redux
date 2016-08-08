import { browserSagas } from './browser';
import { playerSagas } from './player';
import { searchSagas } from './search';
import { tracklistSagas } from './tracklists';
import { userSagas } from './users';


export default function* sagas() {
  yield [
    ...browserSagas,
    ...playerSagas,
    ...searchSagas,
    ...tracklistSagas,
    ...userSagas
  ];
}
