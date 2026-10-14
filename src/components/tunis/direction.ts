import { createContext, useContext } from "react";

/** +1 = navigating forward in the nav order (slide in from right),
 *  -1 = navigating backward (slide in from left). */
export const NavDirectionContext = createContext(1);
export const useNavDirection = () => useContext(NavDirectionContext);
