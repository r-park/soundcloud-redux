import { all } from 'redux-saga/effects'

import { browserSagas } from './browser';
import { playerSagas } from './player';
import { searchSagas } from './search';
import { tracklistSagas } from './tracklists';
import { userSagas } from './users';


export default function* sagas() {
  yield all([
    ...browserSagas,
    ...playerSagas,
    ...searchSagas,
    ...tracklistSagas,
    ...userSagas
  ]);
}
