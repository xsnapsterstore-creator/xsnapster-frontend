import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { verifyOTP } from "@/components/API/api";

const OTPVerify = () => {
  const [otp, setOtp] = useState("");
  const [noOtp, SetNoOtp] = useState(false);
  const router = useRouter();
  const { email } = router.query;

  const OTPVerfication = async (e) => {
    e.preventDefault();
    if (!otp) {
      SetNoOtp(true);
    } else {
      const res = await verifyOTP(email, otp);
      if(res.status === 200){
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("token_type", res.data.token_type);
        localStorage.setItem("userID", res.data.user.id);
        localStorage.setItem("userEmail", res.data.user.email);
        // window.location.replace("/");
        console.log(res);
      }
      SetNoOtp(false);
    }
  };
  return (
    <div className="">
      <div className="m-3 min-h-screen flex flex-col justify-center">
        <div>
          <h1 className="text-center text-[25px]">OTP Verification</h1>
        </div>

        <div className="bg-gray-200 h-[150px] rounded-2xl  m-5 p-5 flex justify-center items-center">
          <div className="flex flex-col gap-3 justify-center items-center">
            {noOtp && (
              <span className="text-red-600 text-[12px]">Please enter OTP</span>
            )}
            <input
              className="p-2 rounded-lg border"
              onChange={(e) => setOtp(e.target.value)}
              type="number"
              placeholder="Enter OTP"
            />
            <Button
              variant="contained"
              onClick={OTPVerfication}
              type="submit"
              sx={{ width: "70%", fontSize: "15px" }}
            >
              Verify OTP
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;
