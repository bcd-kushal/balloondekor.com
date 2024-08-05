import { CartDetailsType } from "@/components/ui/transaction/static/types";
import { setLocalStorage } from "@/lib/localStorage";
import { LOCALSTORAGE_CART_KEY } from "./getCartDetails";

export default function setCartDetails(
  updatedCartData: CartDetailsType[]
) {
  // check user logged in
  const isUserLoggedIn: boolean = false;

  if (isUserLoggedIn) {
    // fetch api to save cart data
  } else {
    // save in localStorage
    setLocalStorage(
      LOCALSTORAGE_CART_KEY,
      updatedCartData
    );
  }
}
