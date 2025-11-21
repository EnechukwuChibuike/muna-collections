"use client";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  reference: string;
  amount: number;
  status: string;
  orderProgress: string;
  paymentMethod: string;
  items: OrderItem[];
  createdAt: string;
};

export default function OrderList({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <p className="text-gray-600 text-center mt-10">You have no orders yet.</p>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 bg-white shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Order #{order.reference}</h2>
            <span className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Amount */}
          <p className="text-sm">
            <span className="font-medium">Amount:</span> ₦
            {order.amount.toLocaleString()}
          </p>

          {/* Payment status */}
          <p className="text-sm">
            <span className="font-medium">Payment:</span>{" "}
            <span
              className={
                order.status === "PAID"
                  ? "text-green-600"
                  : order.status === "FAILED"
                  ? "text-red-600"
                  : "text-gray-700"
              }
            >
              {order.status}
            </span>
          </p>

          {/* Delivery status */}
          <p className="text-sm">
            <span className="font-medium">Order Progress:</span>{" "}
            {order.orderProgress}
          </p>

          {/* Payment method */}
          <p className="text-sm">
            <span className="font-medium">Payment Method:</span>{" "}
            {order.paymentMethod}
          </p>

          {/* Items */}
          <details className="mt-3">
            <summary className="cursor-pointer text-sm text-amber-700">
              View Items
            </summary>
            <div className="mt-2 bg-gray-50 p-3 rounded text-sm space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="border-b pb-2">
                  <p className="font-medium">{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Price: ₦{item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}
