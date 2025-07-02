import React, { useEffect, useState } from "react";
import axios from "axios";
import * as myConst from "../../../../myConstants";
import { useStudentContext } from "../../../../contexts/StudentContext";

import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";

function PaymentButton({ fee }) {
  const [feeData, setFeeData] = useState();
  const [payableAmount, setPayableAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { student, setStudent } = useStudentContext();

  useEffect(() => {
    setPayableAmount(Number(fee.amount) - Number(fee.totalAmountPaid));
  });

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function checkoutHandler(ev) {
    ev.preventDefault();

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razropay failed to load!!");
      return;
    }

    const {
      data: { key },
    } = await axios.get("/api/getkey");

    try {
      setLoading(true);
      const response = await axios.post("/api/checkout", {
        payableAmount,
      });
      setFeeData(response.data.fee);
      console.log("Fee Data", feeData);

      const options = {
        key: "rzp_test_i3xNVjNQutiV0I", // Enter the Key ID generated from the Dashboard
        amount: response.data.fee.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Nadiad APC",
        description: "Test Transaction",
        image:
          "https://raw.githubusercontent.com/DhavalDudheliya/Hostel_Management_Frontend/main/src/assets/logo.png",
        order_id: response.data.fee.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: `${myConst.BACKEND_URL}/api/paymentverification?feeId=${fee._id}`,
        prefill: {
          email: student.email,
          contact: student.mobileNumber,
        },
        notes: {
          address: "Razorpay Corporate Office",
          studentId: student._id,
        },
        theme: {
          color: "#2b2d42",
        },
      };
      console.log("Order Amount : ", options.amount);
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setLoading(false);
    } catch (error) {
      console.error("Error during checkout: ", error);
    }
  }

  return (
    <div className="justify-center">
      <Button
        size="sm"
        variant="blue_btn"
        onClick={checkoutHandler}
        className="flex flex-col h-10 gap-y-0.5"
      >
        {loading ? (
          <>
            <Loader width={"w-8"} />
          </>
        ) : (
          <>
            <span>Pay</span>
            <span>₹{payableAmount}</span>
          </>
        )}
      </Button>
    </div>
  );
}

export default PaymentButton;
