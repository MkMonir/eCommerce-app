import {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from './UserActions';
import { userRequest } from './../../requestMethods';

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());

  try {
    const res = await userRequest.get(`/users`);

    dispatch(getUsersSuccess(res.data.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

// export const createList = async (list, dispatch) => {
//   dispatch(createListStart());

//   try {
//     const res = await axios.post(`http://localhost:8800/api/v1/lists/`, list, {
//       headers: { 'Content-Type': 'application/json' },
//     });

//     dispatch(createListSuccess(res.data.data));
//   } catch (err) {
//     dispatch(createListFailure());
//   }
// };

// export const updateMovie = async (movie, id, dispatch) => {
//   dispatch(updateMovieStart());

//   try {
//     const res = await axios.patch(`http://localhost:8800/api/v1/movies/${id}`, movie, {
//       headers: { 'Content-Type': 'application/json' },
//     });

//     dispatch(updateMovieSuccess(res.data.data));
//   } catch (err) {
//     dispatch(updateMovieFailure());
//   }
// };

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());

  try {
    await userRequest.delete(`/users/${id}`);

    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};
