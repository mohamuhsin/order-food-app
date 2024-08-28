import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import { useContext } from "react";

import CartContext from "../store/CartContext";

export default function Header() {
    const cartCtx = useContext(CartContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="a restaurant" />
                <h1>React Food</h1>
            </div>
            <nav>
                <Button textOnly>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    );
}
