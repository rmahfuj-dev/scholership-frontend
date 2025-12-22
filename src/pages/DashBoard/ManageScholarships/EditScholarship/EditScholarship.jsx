import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import {
  GraduationCap,
  University,
  DollarSign,
  CheckCircle,
  Plus,
  X,
  Loader2,
  ArrowLeft,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import Loading from "../../../../assets/animations/Loading.json";

const EditScholarship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [includes, setIncludes] = useState([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Fetch scholarship data
  const { data: scholarship, isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/scholarship/${id}`);
      return data;
    },
  });

  // Options
  const subjectCategories = [
    "Agriculture",
    "Engineering",
    "Doctor",
    "Architecture",
    "Business",
    "Computer Science",
    "Law",
    "Arts",
    "Science",
    "Mathematics",
  ];

  const scholarshipCategories = ["Full fund", "Partial fund", "Self fund"];
  const degreeOptions = ["Diploma", "Bachelors", "Masters", "PhD"];

  const countries = [
    "USA",
    "UK",
    "Canada",
    "Germany",
    "Australia",
    "Japan",
    "France",
    "Netherlands",
    "Sweden",
    "Switzerland",
    "South Korea",
    "China",
    "Singapore",
    "New Zealand",
    "Italy",
  ];

  // Set form values when data is loaded
  useEffect(() => {
    if (scholarship) {
      setValue("scholarshipName", scholarship.scholarshipName);
      setValue("subjectCategory", scholarship.subjectCategory);
      setValue("scholarshipCategory", scholarship.scholarshipCategory);
      setValue("degree", scholarship.degree);
      setValue(
        "applicationDeadline",
        //2026-02-28T23:59:59.000Z after split -> 2026-02-28
        scholarship.applicationDeadline?.split("T")[0]
      );
      setValue("universityName", scholarship.universityName);
      setValue("universityImage", scholarship.universityImage);
      setValue("universityCountry", scholarship.universityCountry);
      setValue("universityCity", scholarship.universityCity);
      setValue("universityWorldRank", scholarship.universityWorldRank);
      setValue("aboutUniversity", scholarship.aboutUniversity);
      setValue("tuitionFees", scholarship.tuitionFees);
      setValue("applicationFees", scholarship.applicationFees);
      setValue("serviceCharge", scholarship.serviceCharge);

      if (scholarship.includes?.length > 0) {
        setIncludes(scholarship.includes);
      }
    }
  }, [scholarship, setValue]);

  // Handle includes array
  const handleAddInclude = () => {
    setIncludes([...includes, ""]);
  };

  const handleRemoveInclude = (index) => {
    if (includes.length > 1) {
      setIncludes(includes.filter((_, i) => i !== index));
    }
  };

  const handleIncludeChange = (index, value) => {
    const newIncludes = [...includes];
    newIncludes[index] = value;
    setIncludes(newIncludes);
  };

  // Form submit
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const filteredIncludes = includes.filter((item) => item.trim() !== "");

    if (filteredIncludes.length === 0) {
      toast.error("Please add at least one facility/benefit");
      setIsSubmitting(false);
      return;
    }

    const updatedData = {
      scholarshipName: data.scholarshipName,
      universityName: data.universityName,
      universityImage: data.universityImage,
      universityCountry: data.universityCountry,
      universityCity: data.universityCity,
      universityWorldRank: parseInt(data.universityWorldRank),
      subjectCategory: data.subjectCategory,
      scholarshipCategory: data.scholarshipCategory,
      degree: data.degree,
      tuitionFees: parseInt(data.tuitionFees) || 0,
      applicationFees: parseInt(data.applicationFees) || 0,
      serviceCharge: parseInt(data.serviceCharge) || 0,
      applicationDeadline: new Date(data.applicationDeadline).toISOString(),
      aboutUniversity: data.aboutUniversity,
      includes: filteredIncludes,
    };

    try {
      const { data } = await axiosSecure.patch(
        `/scholarship/${id}`,
        updatedData
      );
      if (data.modifiedCount) {
        toast.success("Scholarship updated successfully!");
        navigate("/dashboard/manage-scholarships");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update scholarship");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-130px)]">
        <Lottie animationData={Loading} loop className="w-40" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-circle"
        >
          <ArrowLeft className="size-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <GraduationCap className="text-primary" />
            Edit Scholarship
          </h1>
          <p className="text-gray-500 mt-1">Update scholarship information</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section 1: Scholarship Information */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title text-lg border-b pb-2 mb-4">
              <GraduationCap className="size-5 text-primary" />
              Scholarship Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Scholarship Name */}
              <div className="form-control md:col-span-2">
                <label className="label py-1">
                  <span className="label-text font-medium">
                    Scholarship Name <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Harvard MBA Future Leaders"
                  className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                    errors.scholarshipName ? "input-error" : ""
                  }`}
                  {...register("scholarshipName", {
                    required: "Scholarship name is required",
                  })}
                />
                {errors.scholarshipName && (
                  <label className="label py-1">
                    <span className="label-text-alt text-error">
                      {errors.scholarshipName.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Subject Category */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">
                    Subject Category <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full focus:outline-none focus:border-primary ${
                    errors.subjectCategory ? "select-error" : ""
                  }`}
                  {...register("subjectCategory", {
                    required: "Subject category is required",
                  })}
                >
                  <option value="">Select Subject</option>
                  {subjectCategories.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
                {errors.subjectCategory && (
                  <label className="label py-1">
                    <span className="label-text-alt text-error">
                      {errors.subjectCategory.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Scholarship Category */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">
                    Scholarship Category <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full focus:outline-none focus:border-primary ${
                    errors.scholarshipCategory ? "select-error" : ""
                  }`}
                  {...register("scholarshipCategory", {
                    required: "Scholarship category is required",
                  })}
                >
                  <option value="">Select Category</option>
                  {scholarshipCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.scholarshipCategory && (
                  <label className="label py-1">
                    <span className="label-text-alt text-error">
                      {errors.scholarshipCategory.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Degree */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">
                    Degree <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full focus:outline-none focus:border-primary ${
                    errors.degree ? "select-error" : ""
                  }`}
                  {...register("degree", {
                    required: "Degree is required",
                  })}
                >
                  <option value="">Select Degree</option>
                  {degreeOptions.map((degree) => (
                    <option key={degree} value={degree}>
                      {degree}
                    </option>
                  ))}
                </select>
                {errors.degree && (
                  <label className="label py-1">
                    <span className="label-text-alt text-error">
                      {errors.degree.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Application Deadline */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">
                    Application Deadline <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="date"
                  className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                    errors.applicationDeadline ? "input-error" : ""
                  }`}
                  {...register("applicationDeadline", {
                    required: "Application deadline is required",
                  })}
                />
                {errors.applicationDeadline && (
                  <label className="label py-1">
                    <span className="label-text-alt text-error">
                      {errors.applicationDeadline.message}
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: University Information */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title text-lg border-b pb-2 mb-4">
              <University className="size-5 text-primary" />
              University Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* University Name */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">
                    University Name <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Harvard University"
                  className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                    errors.universityName ? "input-error" : ""
                  }`}
                  {...register("universityName", {
                    required: "University name is required",
                  })}
                />
                {errors.universityName && (
                  <label className="label py-1">
                    <span className="label-text-alt text-error">
                      {errors.universityName.message}
                    </span>
                  </label>
                )}
              </div>

              {/* University Image URL */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">
                    University Image URL <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/university.jpg"
                  className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                    errors.universityImage ? "input-error" : ""
                  }`}
                  {...register("universityImage", {
                    required: "University image URL is required",
                    pattern: {
                      value: /^https?:\/\/.+/i,
                      message: "Please enter a valid URL",
                    },
                  })}
                />
                {errors.universityImage && (
                  <label className="label py-1">
                    <span className="label-text-alt text-error">
                      {errors.universityImage.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Country */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">
                    Country <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full focus:outline-none focus:border-primary ${
                    errors.universityCountry ? "select-error" : ""
                  }`}
                  {...register("universityCountry", {
                    required: "Country is required",
                  })}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.universityCountry && (
                  <label className="label py-1">
                    <span className="label-text-alt text-error">
                      {errors.universityCountry.message}
                    </span>
                  </label>
                )}
              </div>

              {/* City */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">
                    City <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Cambridge"
                  className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                    errors.universityCity ? "input-error" : ""
                  }`}
                  {...register("universityCity", {
                    required: "City is required",
                  })}
                />
                {errors.universityCity && (
                  <label className="label py-1">
                    <span className="label-text-alt text-error">
                      {errors.universityCity.message}
                    </span>
                  </label>
                )}
              </div>

              {/* World Rank */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">
                    World Rank <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="e.g., 4"
                  min="1"
                  className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                    errors.universityWorldRank ? "input-error" : ""
                  }`}
                  {...register("universityWorldRank", {
                    required: "World rank is required",
                    min: { value: 1, message: "Rank must be at least 1" },
                  })}
                />
                {errors.universityWorldRank && (
                  <label className="label py-1">
                    <span className="label-text-alt text-error">
                      {errors.universityWorldRank.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Empty div for alignment */}
              <div className="hidden md:block"></div>

              {/* About University */}
              <div className="form-control md:col-span-2">
                <label className="label py-1">
                  <span className="label-text font-medium">
                    About University <span className="text-error">*</span>
                  </span>
                </label>
                <textarea
                  placeholder="Write a short description about the university..."
                  rows={4}
                  className={`textarea textarea-bordered w-full focus:outline-none focus:border-primary ${
                    errors.aboutUniversity ? "textarea-error" : ""
                  }`}
                  {...register("aboutUniversity", {
                    required: "About university is required",
                    minLength: {
                      value: 50,
                      message: "Description must be at least 50 characters",
                    },
                  })}
                />
                {errors.aboutUniversity && (
                  <label className="label py-1">
                    <span className="label-text-alt text-error">
                      {errors.aboutUniversity.message}
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Fees */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title text-lg border-b pb-2 mb-4">
              <DollarSign className="size-5 text-primary" />
              Fees & Financial Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
              {/* Tuition Fees */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">
                    Tuition Fees ($)
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="0 for free"
                  min="0"
                  className="input input-bordered w-full focus:outline-none focus:border-primary"
                  {...register("tuitionFees", {
                    min: { value: 0, message: "Cannot be negative" },
                  })}
                />
                <label className="label py-1">
                  <span className="label-text-alt text-gray-400">
                    Enter 0 if free
                  </span>
                </label>
              </div>

              {/* Application Fees */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">
                    Application Fees ($)
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="0 for free"
                  min="0"
                  className="input input-bordered w-full focus:outline-none focus:border-primary"
                  {...register("applicationFees", {
                    min: { value: 0, message: "Cannot be negative" },
                  })}
                />
                <label className="label py-1">
                  <span className="label-text-alt text-gray-400">
                    Enter 0 if free
                  </span>
                </label>
              </div>

              {/* Service Charge */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">
                    Service Charge ($) <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="e.g., 50"
                  min="0"
                  className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                    errors.serviceCharge ? "input-error" : ""
                  }`}
                  {...register("serviceCharge", {
                    required: "Service charge is required",
                    min: { value: 0, message: "Cannot be negative" },
                  })}
                />
                {errors.serviceCharge ? (
                  <label className="label py-1">
                    <span className="label-text-alt text-error">
                      {errors.serviceCharge.message}
                    </span>
                  </label>
                ) : (
                  <label className="label py-1">
                    <span className="label-text-alt text-gray-400">
                      Platform fee
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Facilities */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title text-lg border-b pb-2 mb-4">
              <CheckCircle className="size-5 text-primary" />
              Facilities Included
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              Add the benefits and facilities included in this scholarship
            </p>

            <div className="space-y-3">
              {includes.map((item, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <span className="badge badge-primary badge-sm w-6 h-6 flex items-center justify-center">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    placeholder="e.g., Full tuition fee coverage"
                    value={item}
                    onChange={(e) => handleIncludeChange(index, e.target.value)}
                    className="input input-bordered w-full focus:outline-none focus:border-primary"
                  />
                  {includes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveInclude(index)}
                      className="btn btn-ghost btn-square btn-sm text-error hover:bg-error hover:text-error-content"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddInclude}
              className="btn btn-outline btn-primary btn-sm gap-2 mt-4 w-fit"
            >
              <Plus className="size-4" />
              Add More Facility
            </button>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-ghost"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary min-w-[180px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditScholarship;
