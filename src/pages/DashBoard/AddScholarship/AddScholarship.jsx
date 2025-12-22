import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import {
  GraduationCap,
  University,
  DollarSign,
  FileText,
  Plus,
  X,
  Loader2,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { uploadImage } from "../../../utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddScholarship = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [includes, setIncludes] = useState([""]);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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

  // Handle includes array
  const handleAddInclude = () => {
    setIncludes([...includes, ""]);
  };

  const handleRemoveInclude = (index) => {
    if (includes.length > 1) {
      const newIncludes = includes.filter((_, i) => i !== index);
      setIncludes(newIncludes);
    }
  };

  const handleIncludeChange = (index, value) => {
    const newIncludes = [...includes];
    newIncludes[index] = value;
    setIncludes(newIncludes);
  };

  // Form submit
  const onSubmit = async (data) => {
    setIsLoading(true);

    const filteredIncludes = includes.filter((item) => item.trim() !== "");

    if (filteredIncludes.length === 0) {
      toast.error("Please add at least one facility/benefit");
      setIsLoading(false);
      return;
    }

    const imgFile = data.universityImage[0];
    const universityImageUrl = await uploadImage(imgFile);

    const scholarshipData = {
      scholarshipName: data.scholarshipName,
      universityName: data.universityName,
      universityImage: universityImageUrl,
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
      scholarshipPostDate: new Date().toISOString(),
      postedUserEmail: user?.email,
      applicantNumber: 0,
      ratings: 0,
      aboutUniversity: data.aboutUniversity,
      includes: filteredIncludes,
    };

    try {
      const { data } = await axiosSecure.post(
        "/add-scholarship",
        scholarshipData
      );
      console.log(data);
      if (data.insertedId) {
        toast.success("Scholarship added successfully!");
        reset();
        setIncludes([""]);
      }
    } catch (error) {
      console.error("Error adding scholarship:", error);
      toast.error("Failed to add scholarship. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <GraduationCap className="text-primary" />
          Add New Scholarship
        </h1>
        <p className="text-gray-500 mt-1">
          Fill in the details to add a new scholarship opportunity
        </p>
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
              {/* Row 1: Scholarship Name (Full Width) */}
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

              {/* Row 2: Subject Category | Scholarship Category */}
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

              {/* Row 3: Degree | Application Deadline */}
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
              {/* Row 1: University Name | University Image URL */}
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

              {/* University Image Upload */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">
                    University Image <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className={`file-input file-input-bordered w-full focus:outline-none focus:border-primary ${
                    errors.universityImage ? "file-input-error" : ""
                  }`}
                  {...register("universityImage", {
                    required: "University image is required",
                    validate: {
                      fileType: (files) =>
                        !files[0] ||
                        [
                          "image/jpeg",
                          "image/png",
                          "image/webp",
                          "image/jpg",
                        ].includes(files[0].type) ||
                        "Only JPG, PNG, or WebP images are allowed",
                      fileSize: (files) =>
                        !files[0] ||
                        files[0].size <= 2 * 1024 * 1024 ||
                        "Image size must be less than 2MB",
                    },
                  })}
                />
                {errors.universityImage ? (
                  <label className="label py-1">
                    <span className="label-text-alt text-error">
                      {errors.universityImage.message}
                    </span>
                  </label>
                ) : (
                  <label className="label py-1">
                    <span className="label-text-alt text-gray-400">
                      JPG, PNG, WebP (Max 2MB)
                    </span>
                  </label>
                )}
              </div>

              {/* Row 2: Country | City */}
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

              {/* Row 3: World Rank (Half Width) */}
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
                    min: {
                      value: 1,
                      message: "Rank must be at least 1",
                    },
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

              {/* Row 4: About University (Full Width) */}
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

        {/* Section 3: Fees & Financial Details */}
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
                  defaultValue={0}
                  className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                    errors.tuitionFees ? "input-error" : ""
                  }`}
                  {...register("tuitionFees", {
                    min: {
                      value: 0,
                      message: "Amount cannot be negative",
                    },
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
                  defaultValue={0}
                  className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                    errors.applicationFees ? "input-error" : ""
                  }`}
                  {...register("applicationFees", {
                    min: {
                      value: 0,
                      message: "Amount cannot be negative",
                    },
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
                    min: {
                      value: 0,
                      message: "Amount cannot be negative",
                    },
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

        {/* Section 4: Facilities Included */}
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
                  <span className="badge badge-primary badge-sm">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    placeholder={`e.g., Full tuition fee coverage`}
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
                onClick={() => {
                  reset();
                  setIncludes([""]);
                }}
                className="btn btn-ghost"
                disabled={isLoading}
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="btn btn-primary min-w-[180px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Adding Scholarship...
                  </>
                ) : (
                  <>
                    <Plus className="size-4" />
                    Add Scholarship
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

export default AddScholarship;
