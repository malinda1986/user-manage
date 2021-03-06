import { event } from '../core/events';
import { removeToken } from "./session";

import { LOGOUT_USER } from '../core/events/common';

const userSignOut = () => {
    removeToken();
    event.dispatch(LOGOUT_USER);
}

export const handleError = (code: number) => {
    switch (code) {
        case 401:
            userSignOut()
            break;
        case 403:
            userSignOut()
            break;

        default:
            break;
    }
}