// api/create-checkout-session.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { cart, totalPrice } = await req.json();
    console.log("cart: ", cart);
    console.log("totalPrice: ", totalPrice);
    // Your logic to calculate the line items for the Checkout Session
    const lineItems = cart.products.map((product: any) => ({
      price: product.product.stripePriceId,
      quantity: product.quantity,
    }));

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
    });

    return NextResponse.json({
      status: 200,
      body: JSON.stringify({ id: session.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({
      status: 500,
      body: "Internal Server Error",
    });
  }
}
