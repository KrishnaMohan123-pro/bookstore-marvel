const app = require("express")();
const razorPay = require("razorpay");
const bodyParser = require("body-parser");
// const firebase = require("firebase/app");
app.use(bodyParser.urlencoded({ extended: true }));

// const cors = require("cors");

// app.use(cors);
const razorPayInstance = new razorPay({
  key_id: "rzp_test_6t62OWKYnDac78",
  key_secret: "hE3Csmz8s4RJOAfuAVNri1t4",
});

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 500;
  const options = {
    amount: (amount * 100).toString(),
    currency: "INR",
    receipt: Math.random() * 1000,
    payment_capture: payment_capture,
  };
  const response = await razorPayInstance.orders.create(options);
  res.send({
    id: response.id,
    amount: response.amount,
    currency: response.currency,
  });
});

app.listen(4000, () => {
  console.log("Listening to port number 4000");
});
