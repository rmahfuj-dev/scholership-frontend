import { Link } from "react-router";

const RecomendedCard = ({ scholarship }) => {
  const {
    _id,
    universityImage,
    scholarshipName,
    applicationDeadline,
    universityName,
    tuitionFees,
  } = scholarship;
  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  return (
    <Link
      to={`/scholarship/${_id}`}
      className="card card-side card-compact bg-base-100 shadow-sm border border-base-200 hover:bg-base-50 transition-colors cursor-pointer p-2 items-center"
    >
      {/* Thumbnail */}
      <figure className="h-14 w-14 shrink-0 rounded-lg overflow-hidden">
        <img
          src={universityImage}
          alt={scholarshipName}
          className="h-full w-full object-cover"
        />
      </figure>

      <div className="card-body py-0 pl-3 pr-0 block w-full">
        {/* Top Row */}
        <div className="flex justify-between w-full mb-1">
          <h3
            className="font-bold text-sm text-base-content line-clamp-1 w-3/4"
            title={scholarshipName}
          >
            {scholarshipName}
          </h3>
          <span className="text-xs font-bold text-green-600">
            {tuitionFees}
          </span>
        </div>

        {/* Bottom Row */}
        <div className="flex justify-between items-center">
          <p className="text-xs text-base-content/50 truncate w-32">
            {universityName}
          </p>

          {/* Deadline or Action */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-red-500 font-medium bg-red-50 px-1.5 rounded">
              {getDaysRemaining(applicationDeadline)} days remaining
            </span>
            {/* Optional: Small arrow icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-base-content/40"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecomendedCard;
