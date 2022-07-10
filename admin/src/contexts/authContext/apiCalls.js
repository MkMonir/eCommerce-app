import { toast } from 'react-toastify';
import { publicRequest } from './../../requestMethods';
import { loginStart, loginSuccess, loginFailure } from './AuthActions';

export const login = async (user, dispatch) => {
  dispatch(loginStart());

  try {
    const res = await publicRequest.post(`/auth/login`, user, {
      headers: { 'Content-Type': 'application/json' },
    });

    res.data.data.user.isAdmin && dispatch(loginSuccess(res.data));
    toast.success('Successfully logged in😎');
  } catch (err) {
    dispatch(loginFailure());
    toast.error('Incorrect email or password or you are not a admin');
  }
};
