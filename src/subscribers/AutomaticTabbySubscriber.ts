import { OrderService } from "@medusajs/medusa";

class TabbyOrderSubscriber {
  protected readonly orderService_: OrderService;

  constructor({ orderService, eventBusService }) {
    this.orderService_ = orderService;

    eventBusService.subscribe("order.placed", this.handleAutomaticCapture);
  }

  handleAutomaticCapture = async (data) => {
    const order = await this.orderService_.retrieveWithTotals(data.id);

    if (order.payments[0].provider_id == "Tabby") {
      await this.orderService_.capturePayment(order.id);
    }
  };
}

export default TabbyOrderSubscriber;
