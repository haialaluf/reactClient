/**
 * Created by hai on 20/07/2017.
 */
export function wizardReducer(state=[], action) {

    const addWizard = (wizard) => {
        state = state.concat([wizard]);
    };

    const getAllWizards = (wizard) => {
        state = wizard;
    };

    const setWizard = (wizard) => {
        let existed = false;
        let newState = state.map(oldWizard => {
            if (oldWizard._id === wizard._id) {
                existed = true;
                return wizard;
            } else {
                return oldWizard
            }
        });
        state = existed ? newState : newState.concat([wizard])
    };

    switch (action.type) {
        case 'CREATE_WIZARD':
            addWizard(action.wizard);
            break;
        case 'GET_WIZARD_BY_ID':
            setWizard(action.wizard);
            break;
        case 'GET_ALL_WIZARDS':
            getAllWizards(action.wizards);
            break;
        default:
    }
    return state;
}