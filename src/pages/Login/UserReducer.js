/**
 * Created by hai on 20/07/2017.
 */
export function userReducer(state={}, action) {

    let login = (user) => {
        state = user && user.data;
    };

    let logout = () => {
        state = {};
    };

    let register = (user) => {
        state = user && user.data;
    };

    let whoAmI = (user) => {
        state = user && user.data;
    };

    switch (action.type) {
        case 'LOGIN':
            login(action.res);
            break;
        case 'REGISTER':
            register(action.res);
            break;
        case 'LOGOUT':
            logout(action.res);
            break;
        case 'WHO_AM_I':
            whoAmI(action.res);
            break;
        default:
    }
    return state;
}
