import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Container/Container";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const [applicationData, setApplicationData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    // const scholarshipId = searchParams.get("scholarshipId");

    if (sessionId) {
      axiosSecure.patch("/payment/success", { sessionId }).then(({ data }) => {
        if (data.success) {
          setApplicationData(data?.data);
        }
      });
    }
  }, [searchParams, axiosSecure]);

  return (
    <Container
      className={"h-[calc(100vh-80px)] flex items-center justify-center"}
    >
      <div className="card w-96 bg-base-100  shadow-sm">
        <div className="card-body">
          <div className="bg-success flex items-center justify-center p-4 rounded-full mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div className="text-center py-5 ">
            <h2 className="text-3xl font-extrabold text-gray-800">
              Payment Successful!
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Your application has been submitted securely.
            </p>
            {/* university name & category of scholarship */}
            <div className="mt-8 flex flex-col items-center">
              <h3 className="text-xl font-bold text-primary">
                {applicationData?.universityName}
              </h3>
              <span className="badge badge-outline badge-primary mt-2">
                {applicationData?.scholarshipCategory} Scholarship
              </span>
            </div>

            <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 relative">
              <div className="space-y-3 text-sm">
                {/* Transaction ID  */}
                <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                  <span className="text-gray-500">Transaction ID</span>
                  <span
                    className="font-mono text-gray-700 font-medium truncate w-32 text-right"
                    title={applicationData?.transactionId}
                  >
                    {applicationData?.transactionId}
                  </span>
                </div>
                {/* application date  */}
                <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                  <span className="text-gray-500">Date</span>
                  <span className="text-gray-700 font-medium">
                    {new Date(
                      applicationData?.applicationDate
                    ).toLocaleDateString()}
                  </span>
                </div>
                {/* total  */}
                <div className="flex justify-between items-center pt-1">
                  <span className="text-gray-500 font-semibold">
                    Total Paid
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    $
                    {applicationData?.applicationFees +
                      applicationData?.seviceCharge ||
                      applicationData?.amountPaid}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full justify-center card-actions">
            {/* Action Buttons */}
            <div className="space-y-3 w-full">
              <button
                onClick={() => navigate("/dashboard/my-application")}
                className="btn btn-primary w-full shadow-lg shadow-blue-500/30 rounded-xl"
              >
                Go to My Applications
              </button>

              <button
                onClick={() => navigate("/")}
                className="btn border border-gray-200 w-full text-gray-500 hover:bg-gray-100 rounded-xl"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PaymentSuccess;
