import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import Container from "../../components/Container/Container";
import {
  FaUniversity,
  FaMapMarkerAlt,
  FaGlobe,
  FaCalendarAlt,
  FaDollarSign,
  FaGraduationCap,
  FaStar,
  FaUsers,
  FaClock,
  FaBookmark,
  FaArrowLeft,
  FaTrophy,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdFeedback } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import ReviewModal from "./ReviewModal";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner/Spinner";
import RecomendedCard from "../../components/RecomendedCard/RecomendedCard";

const ScholarshipDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [recomended, setRecomended] = useState([]);
  const navigate = useNavigate();
  const {
    data: scholarship,
    isLoading: scholarshipLoading,
    refetch: scholarshipRefetch,
  } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/scholarship/${id}`);
      setRecomended(data.recomended);
      return data.details;
    },
  });

  const {
    _id,
    scholarshipName,
    universityName,
    universityImage,
    universityCountry,
    universityCity,
    universityWorldRank,
    subjectCategory,
    scholarshipCategory,
    degree,
    tuitionFees,
    applicationFees,
    serviceCharge,
    applicationDeadline,
    scholarshipPostDate,
    postedUserEmail,
    applicantNumber,
    ratings,
    includes,
    aboutUniversity,
  } = scholarship || {};

  const {
    data: reviews = [],
    isLoading: reviewLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews/${id}`);
      return data;
    },
  });

  const [isBookmarked, setIsBookmarked] = useState(false);

  const {
    data: wishlistStatus = { isSaved: false, id: null },
    refetch: refetchWishlist,
  } = useQuery({
    queryKey: ["wishlist-status", id, user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/wishlists/check/${id}?email=${user?.email}`
      );
      return data;
    },
    enabled: !!user?.email && !!id,
  });

  useEffect(() => {
    setIsBookmarked(wishlistStatus.isSaved);
  }, [wishlistStatus]);

  const queryClient = useQueryClient();
  const { mutate: deleteMutation } = useMutation({
    mutationFn: async (wishlistId) => {
      const { data } = await axiosSecure.delete(`/wishlists/${wishlistId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlists"]);
      refetchWishlist();
      setIsBookmarked(false);
      toast.success("Removed from wishlist");
    },
    onError: () => {
      toast.error("Failed to remove scholarship");
    },
  });

  const handleSaveScholaship = async () => {
    setSaveLoading(true);

    try {
      if (isBookmarked) {
        // Remove
        if (wishlistStatus?.id) {
          deleteMutation(wishlistStatus.id);
        } else {
          console.error("Wishlist ID missing");
        }
      } else {
        // Add
        const wishlistData = {
          scholarshipId: _id,
          userEmail: user?.email,
        };
        const { data } = await axiosSecure.post("/wishlists", wishlistData);
        if (data?.insertedId) {
          refetchWishlist();
          setIsBookmarked(true);
          toast.success("Added to wishlist");
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setSaveLoading(false);
    }
  };

  if (scholarshipLoading || reviewLoading) {
    return <Spinner />;
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate days remaining
  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(applicationDeadline);

  // Total cost
  const totalCost = tuitionFees + applicationFees + serviceCharge;

  // handle apply
  const handleApply = () => {
    navigate(`/scholarship/${id}/apply`);
  };

  // handle review submit
  const handleReviewSubmit = async (reviewData) => {
    try {
      const { data } = await axiosSecure.post("/reviews", reviewData);
      if (data?.upsertedCount) {
        toast.success("Review added");
      }
      if (data?.modifiedCount) {
        toast.success("Review updated");
      }
      refetch();
      scholarshipRefetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to submit review. Please try again.",
      });
    }
  };

  return (
    <div className="bg-base-200 min-h-screen pb-16">
      {/* Hero Section */}
      <div
        className="hero h-72 md:h-96"
        style={{
          backgroundImage: `url(${universityImage})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div>
            <div className="flex justify-center gap-2 mb-4">
              <span className="badge badge-primary badge-lg">
                {scholarshipCategory}
              </span>
              <span className="badge badge-secondary badge-lg">{degree}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {scholarshipName}
            </h1>
            <p className="text-lg flex items-center justify-center gap-2">
              <FaUniversity />
              {universityName}
            </p>
          </div>
        </div>
      </div>

      <Container>
        {/* Back Button */}
        <div className="mt-6">
          <Link to="/scholarships" className="btn btn-ghost gap-2">
            <FaArrowLeft />
            Back to Scholarships
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Left Content - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="stats stats-vertical md:stats-horizontal shadow w-full bg-base-100">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <FaTrophy className="text-3xl" />
                </div>
                <div className="stat-title">World Rank</div>
                <div className="stat-value text-primary">
                  #{universityWorldRank}
                </div>
                <div className="stat-desc">QS Ranking</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <FaUsers className="text-3xl" />
                </div>
                <div className="stat-title">Applicants</div>
                <div className="stat-value text-secondary">
                  {applicantNumber}
                </div>
                <div className="stat-desc">Applied so far</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-warning">
                  <FaStar className="text-3xl" />
                </div>
                <div className="stat-title">Rating</div>
                <div className="stat-value text-warning">{ratings}</div>
                <div className="stat-desc">Out of 5</div>
              </div>
            </div>

            {/* Scholarship Details Card */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  <FaInfoCircle className="text-primary" />
                  Scholarship Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Subject Category */}
                  <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
                    <div className="avatar placeholder">
                      <div className="bg-primary flex items-center justify-center text-primary-content rounded-full w-12">
                        <FaGraduationCap size={20} color="#fff" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Subject Category</p>
                      <p className="font-semibold">{subjectCategory}</p>
                    </div>
                  </div>

                  {/* Degree */}
                  <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
                    <div className="avatar placeholder">
                      <div className="bg-secondary flex items-center justify-center text-secondary-content rounded-full w-12">
                        <FaGraduationCap size={20} color="#fff" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Degree Level</p>
                      <p className="font-semibold">{degree}</p>
                    </div>
                  </div>

                  {/* Scholarship Type */}
                  <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
                    <div className="avatar placeholder">
                      <div className="bg-success flex items-center justify-center text-success-content rounded-full w-12">
                        <FaDollarSign size={20} color="#fff" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Scholarship Type</p>
                      <p className="font-semibold">{scholarshipCategory}</p>
                    </div>
                  </div>

                  {/* Posted Date */}
                  <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
                    <div className="avatar placeholder">
                      <div className="bg-info flex items-center justify-center text-info-content rounded-full w-12">
                        <FaCalendarAlt size={20} color="#fff" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Posted On</p>
                      <p className="font-semibold">
                        {formatDate(scholarshipPostDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* University Details Card */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  <FaUniversity className="text-primary" />
                  University Information
                </h2>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* University Image */}
                  <div className="md:w-1/3">
                    <img
                      src={universityImage}
                      alt={universityName}
                      className="rounded-xl w-full h-48 object-cover"
                    />
                  </div>

                  {/* University Info */}
                  <div className="md:w-2/3 space-y-4">
                    <h3 className="text-xl font-bold">{universityName}</h3>

                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-error" />
                        <span>
                          {universityCity}, {universityCountry}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <FaTrophy className="text-warning" />
                        <span>World Rank: #{universityWorldRank}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <FaGlobe className="text-info" />
                        <span>{universityCountry}</span>
                      </div>
                    </div>

                    <p className="text-gray-500">{aboutUniversity}</p>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Contact:</span>
                      <a
                        href={`mailto:${postedUserEmail}`}
                        className="link link-primary"
                      >
                        {postedUserEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  <FaCheckCircle className="text-success" />
                  What's Included
                </h2>

                <ul className="space-y-3">
                  {includes?.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <FaCheckCircle className="text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Apply Card */}
          <div className="space-y-6">
            {/* Apply Card */}
            <div className="card bg-base-100 shadow-xl sticky top-4 z-10">
              <div className="card-body">
                {/* Deadline Alert */}
                <div
                  className={`alert ${
                    daysRemaining <= 7
                      ? "alert-error"
                      : daysRemaining <= 30
                      ? "alert-warning"
                      : "alert-success"
                  } mb-4`}
                >
                  <FaClock />
                  <div>
                    <p className="font-bold">
                      {daysRemaining > 0
                        ? `${daysRemaining} days remaining`
                        : "Deadline passed"}
                    </p>
                    <p className="text-sm">
                      Deadline: {formatDate(applicationDeadline)}
                    </p>
                  </div>
                </div>

                {/* Fees Breakdown */}
                <h3 className="font-bold text-lg mb-3">Fees Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tuition Fees</span>
                    <span className="font-medium">
                      {tuitionFees === 0 ? "Free" : `$${tuitionFees}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Application Fees</span>
                    <span className="font-medium">
                      {applicationFees === 0 ? "Free" : `$${applicationFees}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Service Charge</span>
                    <span className="font-medium">${serviceCharge}</span>
                  </div>
                  <div className="divider my-2"></div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${totalCost}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 my-4">
                  <div className="rating rating-md">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input
                        key={star}
                        type="radio"
                        className="mask mask-star-2 bg-warning"
                        checked={star === Math.round(ratings)}
                        readOnly
                      />
                    ))}
                  </div>
                  <span className="font-bold">{ratings}</span>
                  <span className="text-gray-500">
                    ({applicantNumber} applicants)
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mt-4">
                  <button
                    onClick={handleApply}
                    className="btn btn-primary btn-block btn-lg"
                  >
                    Apply now
                  </button>

                  <div className="flex gap-2">
                    <button
                      className={`btn btn-outline flex-1 ${
                        isBookmarked ? "btn-secondary" : ""
                      }`}
                      onClick={handleSaveScholaship}
                    >
                      <FaBookmark />
                      {saveLoading
                        ? "Saving..."
                        : isBookmarked
                        ? "Saved"
                        : "Save"}
                    </button>

                    {/* Updated Review Button */}
                    <button
                      className="btn btn-outline flex-1"
                      onClick={() => setIsReviewModalOpen(true)}
                    >
                      <MdFeedback size={18} />
                      Review
                    </button>
                  </div>

                  {/* Modal - Add at the end of the component, before closing tag */}
                  <ReviewModal
                    isOpen={isReviewModalOpen}
                    onClose={() => setIsReviewModalOpen(false)}
                    scholarshipName={scholarshipName}
                    universityName={universityName}
                    scholarshipId={_id}
                    onSubmit={handleReviewSubmit}
                  />
                </div>

                {/* Quick Info */}
                <div className="mt-4 pt-4 border-t space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <FaUsers className="text-gray-400" />
                    <span>{applicantNumber} students already applied</span>
                  </div>
                  {applicationFees === 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <FaCheckCircle className="text-success" />
                      <span>"No application fees required"</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="font-bold text-lg">Need Help?</h3>
                <p className="text-gray-500 text-sm">
                  Contact the university directly for more information about
                  this
                </p>
                <a
                  href={`mailto:${postedUserEmail}`}
                  className="btn btn-outline btn-primary btn-block mt-3"
                >
                  Contact University
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Recomend For You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {recomended?.map((scholarship) => (
              <RecomendedCard key={scholarship._id} scholarship={scholarship} />
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews?.length === 0 ? (
              <div className="col-span-full card bg-base-100 shadow-xl">
                <div className="card-body items-center text-center py-16">
                  <MdFeedback className="text-7xl text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-500">
                    No Reviews Yet
                  </h3>
                  <p className="text-gray-400 max-w-sm">
                    Be the first to share your experience with this scholarship!
                  </p>
                  <button
                    className="btn btn-primary mt-6"
                    onClick={() => setIsReviewModalOpen(true)}
                  >
                    <MdFeedback className="mr-1" />
                    Write a Review
                  </button>
                </div>
              </div>
            ) : (
              reviews?.map((review, index) => (
                <div key={index} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-12 rounded-full">
                          <img
                            src={review?.avatar || "/profile.png"}
                            alt={review?.name}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold capitalize">{review?.name}</h4>
                        <p className="text-sm text-gray-500">
                          {formatDate(
                            review?.updatedAt
                              ? review?.updatedAt
                              : review?.createdAt
                          )}
                        </p>
                      </div>
                      <div className="rating rating-sm">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <input
                            key={star}
                            type="radio"
                            className="mask mask-star-2 bg-warning"
                            checked={star === review?.rating}
                            readOnly
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mt-3">{review?.comment}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ScholarshipDetails;
