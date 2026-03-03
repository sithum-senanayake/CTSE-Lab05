const express = require("express");
const app = express();
app.use(express.json());

const PORT = 8083;

let payments = [
  { id: 1, orderId: 1, amount: 29.99, method: "CARD", status: "SUCCESS" },
  { id: 2, orderId: 2, amount: 999.99, method: "PAYPAL", status: "SUCCESS" },
  { id: 3, orderId: 3, amount: 179.97, method: "CARD", status: "FAILED" }
];
let idCounter = 4;

app.get("/payments", (req, res) => {
  res.json(payments);
});

app.post("/payments/process", (req, res) => {
  const payment = {
    id: idCounter++,
    orderId: req.body.orderId,
    amount: req.body.amount,
    method: req.body.method,
    status: "SUCCESS"
  };
  payments.push(payment);
  res.status(201).json(payment);
});

app.get("/payments/:id", (req, res) => {
  const payment = payments.find(p => p.id == req.params.id);
  if (!payment) return res.status(404).json({ message: "Payment not found" });
  res.json(payment);
});

app.listen(PORT, () => {
  console.log(`Payment Service running on port ${PORT}`);
});