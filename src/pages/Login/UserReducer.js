/**
 * Created by hai on 20/07/2017.
 */
export function userReducer(state={}, action) {

    let login = (user) => {
        if (user && user.data && user.data.facebook && user.data.facebook.id) {
            state = user.data.facebook;
        } else if (user && user.data && user.data.google && user.data.google.id) {
            state = user.data.google;
        } else {
            state = user.data.local;
        }
    };

    let logout = () => {
        state = {};
    };

    switch (action.type) {
        case 'LOGIN':
            login(action.res);
            break;
        case 'LOGOUT':
            logout(action.res);
            break;
    }
    return state;
}
