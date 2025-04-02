import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { clearCart, ICart } from "../../features/cart/cartSlice";
import { authState, logout } from "../../features/auth/authSlice";

export function logoutUser(dispatch: ThunkDispatch<{
    cart: ICart[];
    auth: authState;
}, undefined, UnknownAction> & Dispatch<UnknownAction>) {
  localStorage.removeItem('userToken')
  localStorage.removeItem('userInfo')

  dispatch(clearCart())
  dispatch(logout())
}