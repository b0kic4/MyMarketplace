// api/create-checkout-session.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// TODO: Implement sharing functionality for products cart...
// FIXME: Load time for data fetching reloading and etc...

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { cart, totalPrice } = await req.json();
    // const cartProducts = cart.products.map((product: any) => {
    //   return product;
    // });
    const products = cart.products.map(
      (cartProduct: any) => cartProduct.product
    );

    // Now 'products' is an array of prodinteruct objects
    console.log("products: ", products);

    // Iterate through 'products' and perform the Stripe API operations
    const stripeProducts = await Promise.all(
      products.map(async (product: any) => {
        const stripeProduct = await stripe.products.create({
          name: product.title,
          description: product.description,
          images: product.images.imageUrl,
        });

        const stripePrice = await stripe.prices.create({
          product: stripeProduct.id,
          unit_amount: (product.price as number) * 100,
          currency: "usd",
        });

        return {
          product: stripeProduct,
          price: stripePrice.id,
        };
      })
    );

    // 'stripeProducts' is an array containing the Stripe product and price information
    console.log("stripeProducts: ", stripeProducts);

    // Create lineItems using 'stripeProducts'
    const lineItems = cart.products.map((cartProduct: any, index: number) => ({
      price: stripeProducts[index].price,
      quantity: cartProduct.quantity,
    }));

    console.log("lineItems: ", lineItems);

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      // success_url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      success_url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/products/cart`,
      cancel_url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/cancel`,
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
