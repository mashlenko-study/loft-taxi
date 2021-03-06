import { takeEvery, call, put } from "redux-saga/effects";
import { getAddressList } from "../api";
import { GETADDRESSES, storeAddresses } from "../actions";

export function* addressesSaga() {
  const message = yield call(getAddressList);
  if (message.addresses) {
    yield put(storeAddresses(message));
  } else {
    console.log(message);
  }
}

export function* addressListSaga() {
  yield takeEvery(GETADDRESSES, addressesSaga);
}
