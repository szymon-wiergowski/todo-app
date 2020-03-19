// ACTION NAMES
const FETCH = "TODO/FETCH";
const FETCH_SUCCES = "TODO/FETCH_SUCCES";
const FETCH_ERROR = "TODO/FETCH_ERROR";
const ADD = "TODO/ADD";
const TOGGLE_DONE = "TODO/TOGGLE_DONE";
const REMOVE = "TODO/REMOVE";

const BASE_URL = "https://rest-api-jfdz12-sw.firebaseio.com";

// INITIAL STATE
const initialState = {
  todo: [],
  task: "",
  loading: false,
  error: null,
  adding: false,
  dateOfCreateTask: "",
  done: false
};

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH:
      return { ...state, loading: true, error: null };
    case FETCH_SUCCES:
      return { ...state, loading: false, adding: false, todo: action.payload };
    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ADD:
      return {
        ...state,
        task: action.payload,
        done: false,
        dateOfCreateTask: Date.now()
      };
    case TOGGLE_DONE:
      return state.map(todo =>
        todo.id === action.payload
          ? {
              ...todo,
              done: !todo.done
            }
          : todo
      );
    case REMOVE:
      return state.filter(todo => !action.payload.includes(todo.id));
    default:
      return state;
  }
}

// ACTION CREATOR
export const getTodo = () => dispatch => {
  dispatch({ type: FETCH });
  fetch(`${BASE_URL}/todo.json`)
    .then(res => res.json())
    .then(data => {
      const keys = Object.keys(data);
      const formattedData = keys.map(key => {
        return {
          id: key,
          ...data[key]
        };
      })
      dispatch(
        formattedData.sort(function(a, b) {
          return b.dateOfCreateTask - a.dateOfCreateTask;
        })
      );
    })
    .catch(error => {
      dispatch({
        type: FETCH_ERROR,
        payload: "Something went wrong, please try again"
      });
    });
};
