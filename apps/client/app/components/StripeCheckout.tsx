// StripeCheckout.tsx
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Cart } from "../products/cart-products-interface";
interface Props {
  cart: Cart | undefined;
  totalPrice: string;
}
const StripeCheckout: React.FC<Props> = ({ cart, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleCheckout = async () => {
    try {
      // Make API call to your server to initiate a Stripe Checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          totalPrice,
        }),
      });
      if (response.ok) {
        // Redirect to Stripe Checkout
        const responseBody = await response.json();
        const sessionId = JSON.parse(responseBody.body).id;

        const result = await stripe!.redirectToCheckout({
          sessionId: sessionId,
        });

        if (result.error) {
          // Handle error
          console.error(result.error.message);
        }
      } else {
        // Handle server response error
        console.error("Failed to create checkout session");
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Error during checkout:", error);
    }
  };

  return (
    <Button
      className="w-full"
      size="lg"
      variant="outline"
      onClick={handleCheckout}
    >
      Proceed to Checkout
    </Button>
  );
};

export default StripeCheckout;
