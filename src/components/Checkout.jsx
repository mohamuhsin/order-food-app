import Modal from "./Modal";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import { useContext } from "react";
import CartContext from "../store/CartContext";

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );

    function handleCloseCheckout() {
        userProgressCtx.hideCheckout();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
    }

    return (
        <Modal
            open={userProgressCtx.progress === "checkout"}
            onClose={handleCloseCheckout}
        >
            <form onSubmit={handleSubmit}>
                <h2>Your Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id="full-name" />
                <Input label="E-Mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />

                <div className="control-row">
                    <Input label="postal-code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                <p className="modal-actions">
                    <Button type="button" textOnly onClick={handleCloseCheckout}>
                        Close
                    </Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    );
}
