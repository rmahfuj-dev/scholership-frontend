import { Link } from "react-router";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaArrowRight,
  FaUniversity,
  FaUsers,
  FaStar,
} from "react-icons/fa";

const ScholarshipCard = ({ scholarship }) => {
  const {
    _id,
    scholarshipName,
    universityImage,
    universityCountry,
    universityName,
    scholarshipCategory,
    degree,
    tuitionFees,
    applicationDeadline,
    ratings,
    applicantNumber,
  } = scholarship;

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = getDaysRemaining(applicationDeadline);

  const getDeadlineBadgeClass = () => {
    if (daysRemaining <= 0) return "badge-error";
    if (daysRemaining <= 7) return "badge-error";
    if (daysRemaining <= 30) return "badge-warning";
    return "badge-success";
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
      {/* Card Image */}
      <figure className="relative h-52 overflow-hidden">
        <img
          src={universityImage}
          alt={universityName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          <span
            className={`badge ${
              scholarshipCategory === "Full Fund"
                ? "badge-primary"
                : "badge-secondary"
            } ml-auto`}
          >
            {scholarshipCategory}
          </span>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between text-white">
            <span className="text-2xl font-bold flex items-center">
              <FaDollarSign className="text-success" />
              {/* {formatCurrency(amount)} */}
              {tuitionFees}
            </span>
            <span className={`badge ${getDeadlineBadgeClass()}`}>
              {daysRemaining > 0 ? `${daysRemaining} days left` : "Expired"}
              {/* {applicationDeadline} */}
            </span>
          </div>
        </div>
      </figure>

      {/* Card Body */}
      <div className="card-body p-5">
        {/* University Row */}
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="bg-primary/10 flex items-center justify-center text-primary rounded-full w-10 h-10">
              <FaUniversity size={18} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{universityName}</p>
            <p className="text-xs text-gray-400">{universityCountry}</p>
          </div>
          <span className="badge badge-ghost badge-sm">{degree}</span>
        </div>

        {/* Title */}
        <h3 className="card-title text-lg mt-2 line-clamp-2 min-h-14">
          {scholarshipName}
        </h3>

        {/* Info Row */}
        <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="text-primary" />
            {new Date(applicationDeadline).toLocaleDateString()}
            <span></span>
          </div>
          <div className="flex items-center gap-1">
            <FaUsers className="text-info" />
            {applicantNumber}
            <span></span>
          </div>
          {
            <div className="flex items-center gap-1">
              <FaStar className="text-warning" />
              <span>{ratings}</span>
            </div>
          }
        </div>

        {/* Action Button */}
        <div className="card-actions mt-4">
          <Link
            to={`/scholarship/${_id}`}
            className="btn btn-primary btn-block rounded-xl"
          >
            View Details
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
