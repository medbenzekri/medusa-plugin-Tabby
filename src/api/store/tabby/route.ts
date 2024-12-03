import type {
  CartService,
  // MedusaRequest,
  // MedusaResponse,
  OrderService,
} from "@medusajs/medusa";

export const POST = async (req, res) => {
  const id = req.body.order.reference_id;

  const cartService: CartService = req.scope.resolve("cartService");
  const orderService: OrderService = req.scope.resolve("orderService");
  try {
    const order = await orderService.retrieveByCartId(id);
    res.status(200);
  } catch (error) {
    try {
      const ca = await cartService.authorizePayment(id);
      const data = await orderService.createFromCart(ca.id);
      res.status(200);
    } catch (err) {
      console.error("Error completing order:", err);
    }
  }
};
