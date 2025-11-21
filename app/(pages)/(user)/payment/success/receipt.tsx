"use client";

import { Page, Text, Document, StyleSheet, View } from "@react-pdf/renderer";
import type { Order } from "@prisma/client";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

interface Props {
  order: Order;
  items: OrderItem[];
  address: string;
  user: { name?: string };
}

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
  section: { marginBottom: 10 },
  header: { fontSize: 18, marginBottom: 10, fontWeight: "bold" },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bold: { fontWeight: "bold" },
});

export default function Receipt({ order, items, address, user }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Muna Collectionz Receipt</Text>
        <Text style={styles.section}>
          Payment Successful! Thank you, {user.name?.split(" ")[0]}.
        </Text>

        <View style={styles.section}>
          <Text style={styles.bold}>Order Reference: {order.reference}</Text>
          <Text>Date: {new Date(order.createdAt).toLocaleString()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>Items:</Text>
          {items.map((item, idx) => (
            <View key={idx} style={styles.row}>
              <Text>
                {item.name} x{item.quantity}
              </Text>
              <Text>₦{(item.price * item.quantity).toLocaleString()}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>Shipping Address:</Text>
          <Text>{address}</Text>
        </View>

        <View style={[styles.section, styles.row]}>
          <Text style={styles.bold}>Total</Text>
          <Text style={styles.bold}>₦{order.amount.toLocaleString()}</Text>
        </View>
      </Page>
    </Document>
  );
}
