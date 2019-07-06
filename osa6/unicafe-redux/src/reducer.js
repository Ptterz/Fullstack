const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
    all: 0
}

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GOOD':
            return {
                ...state,
                good: state.good + 1,
                all: state.all + 1
            }
        case 'OK':
            return {
                ...state,
                ok: state.ok + 1,
                all: state.all + 1
            }
        case 'BAD':
            return {
                ...state,
                bad: state.bad + 1,
                all: state.all + 1
            }
        case 'ZERO':
            return state = initialState
        default:
            return state
    }
}

export default counterReducer