// api/stripe-webhook.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(req: NextRequest) {
  try {
    // Retrieve the raw body and signature from the incoming request
    const rawBody = await req.text();
    const signature = req.headers.get("Stripe-Signature") || "";

    // Verify the signature
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Handle the specific event type
    switch (event.type) {
      case "checkout.session.completed":
        // Handle successful checkout session completion
        console.log("event: ", event);
        const session = event.data.object;
        console.log("Checkout Session Completed:", session);

        // Extract relevant information from the session
        console.log("wh session: ", session);
        const { payment_status, payment_intent } = session;

        console.log("payment status: ", payment_status);
        console.log("intent: ", payment_intent);

        if (payment_status === "paid") {
          // If payment is successful, make a request to your backend API to store data
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_NESTJS_URL}/payments/store-payment-info`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ session: session }),
            }
          );

          const responseData = await response.json();
          console.log("Data stored in database:", responseData);
        }

        break;

      // Add more cases for other events you want to handle
      default:
        console.log("Unhandled event type:", event.type);
    }

    // Respond with a success status
    return NextResponse.json({
      status: 200,
      body: "Webhook received successfully",
    });
  } catch (error) {
    console.error("Error handling webhook:", error);
    // Respond with an error status
    return NextResponse.json({
      status: 500,
      body: "Internal Server Error",
    });
  }
}
