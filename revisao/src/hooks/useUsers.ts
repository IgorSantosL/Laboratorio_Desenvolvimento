import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import {
  addUser as addUserAction,
  removeUser as removeUserAction,
  type User,
} from '../features/users/userSlice';

export function useUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const getUsers = useSelector((state: RootState) => state.users.users);

  const addUser = (user: User) => {
    dispatch(addUserAction(user));
  };

  const removeUser = (id: number) => {
    dispatch(removeUserAction(id));
  };

  return {
    getUsers,
    addUser,
    removeUser,
  };
}