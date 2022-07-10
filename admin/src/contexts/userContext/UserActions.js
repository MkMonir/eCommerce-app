// GET USERS
export const getUsersStart = () => ({
  type: 'GET_USERS_START',
});

export const getUsersSuccess = (users) => ({
  type: 'GET_USERS_SUCCESS',
  payload: users,
});

export const getUsersFailure = () => ({
  type: 'GET_USERS_FAILURE',
});

// // // CREATE LIST
// export const createListStart = () => ({
//   type: 'CREATE_LIST_START',
// });

// export const createListSuccess = (list) => ({
//   type: 'CREATE_LIST_SUCCESS',
//   payload: list,
// });

// export const createListFailure = () => ({
//   type: 'CREATE_LIST_FAILURE',
// });

// // UPDATE MOVIE
// export const updateMovieStart = () => ({
//   type: 'UPDATE_MOVIE_START',
// });

// export const updateMovieSuccess = (movie) => ({
//   type: 'UPDATE_MOVIE_SUCCESS',
//   payload: movie,
// });

// export const updateMovieFailure = () => ({
//   type: 'UPDATE_MOVIE_FAILURE',
// });

// DELETE USER
export const deleteUserStart = () => ({
  type: 'DELETE_USER_START',
});

export const deleteUserSuccess = (id) => ({
  type: 'DELETE_USER_SUCCESS',
  payload: id,
});

export const deleteUserFailure = () => ({
  type: 'DELETE_USER_FAILURE',
});
