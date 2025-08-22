import {
  CREATE_POST_FAILUER,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_ALL_POST_FAILUER,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_USERS_POST_SUCCESS,
  LIKE_POST_FAILUER,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  SAVE_POST_SUCCESS,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
} from "./post.actionType";

const initialState = {
  post: null,
  loading: false,
  error: null,
  posts: [],
  like: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
    case GET_ALL_POST_REQUEST:
    case LIKE_POST_REQUEST:
    case DELETE_POST_REQUEST:
      return { ...state, error: null, loading: true };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        posts: [action.payload, ...state.posts],
        loading: true,
        error: null,
      };
    case GET_ALL_POST_SUCCESS:
    case GET_USERS_POST_SUCCESS:
      return { ...state, posts: action.payload, loading: true, error: null };
    case LIKE_POST_SUCCESS:
    case SAVE_POST_SUCCESS:
      return {
        ...state,
        like: action.payload,
        posts: state.posts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: true,
        error: null,
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        loading: false,
        error: null,
      };

    case CREATE_POST_FAILUER:
    case GET_ALL_POST_FAILUER:
    case LIKE_POST_FAILUER:
    case DELETE_POST_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
