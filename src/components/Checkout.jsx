import Modal from "./Modal";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData,
    } = useHttp("http://localhost:3000/orders", requestConfig);

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleCloseCheckout}>
                Close
            </Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending Order Data...</span>;
    }

    if (data && !error) {
        return (
            <Modal
                open={userProgressCtx.progress === "checkout"}
                onClose={handleCloseCheckout}
            >
                <h2>Success!</h2>
                <p>Your Order was submitted successfully</p>
                <p>
                    We will get back to you with more details via email within few mins
                </p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        );
    }

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );

    function handleCloseCheckout() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCart();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData,
                },
            })
        );
    }

    return (
        <Modal
            open={userProgressCtx.progress === "checkout"}
            onClose={handleCloseCheckout}
        >
            <form onSubmit={handleSubmit}>
                <h2>Your Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="E-Mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />

                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                {error && <Error title="Failed to submit order" message={error} />}

                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    );
}
