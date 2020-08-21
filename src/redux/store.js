import {createStore} from 'redux';

// const [profile, setProfile] = useState("prawito");

// setProfile("Hudoro")

const initialState = {
  loading: false,
  name: 'Prawito Hudoro',
  address: 'Cisauk',
};

const reducer = (state = initialState, action) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.value,
    };
  }
  if (action.type === 'SET_NAME') {
    return {
      ...state,
      name: 'Azzamy',
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;
