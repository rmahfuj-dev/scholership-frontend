import { useNavigate, useSearchParams } from "react-router";
import Container from "../../components/Container/Container";
import { FaXmark } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const PaymentFail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  return (
    <Container
      className={"h-[calc(100vh-80px)] flex items-center justify-center"}
    >
      <div className="card bg-base-100 w-96 shadow-sm rounded-xl overflow-hidden">
        <div className="bg-red-100 p-8 flex flex-col justify-center items-center border border-red-100">
          <div className="p-4 bg-red-100 rounded-full ring-4 ring-red-50 mb-4">
            <RxCross2 className="w-16 h-16" />
          </div>
          <h2 className="text-2xl font-semibold text-red-600">
            Payment Failed!
          </h2>
          <p className="text-base text-red-400 tracking-wide">
            Transaction Cancelled
          </p>
        </div>
        <div className="card-body text-center">
          <h3 className="text-gray-800 font-semibold text-lg">
            Something went wrong with your payment.
          </h3>
          <h3 className="mt-1 text-xl font-bold text-primary">
            {searchParams?.get("scholarshipName") || "Selected Scholarship"}
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed">
            Don't worry! Your application data has been <strong>saved</strong>{" "}
            in your dashboard. You can try paying again using a different
            payment method.
          </p>
          <div className="card-actions justify-center mt-2">
            <button
              onClick={() => navigate("/dashboard/my-application")}
              className="btn btn-primary rounded-xl w-full"
            >
              Go to my applications
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PaymentFail;
