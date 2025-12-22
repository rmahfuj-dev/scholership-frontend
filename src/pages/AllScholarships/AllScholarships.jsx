import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Container from "../../components/Container/Container";
import ScholarshipCard from "../shared/ScholarshipCard/ScholarshipCard ";
import Filters from "./Filters/Filters";
import { useState } from "react";
import Search from "./Search";
import { Circle } from "lucide-react";
import ScholarshipCardSkeleton from "../shared/ScholarshipCard/ScholarshipCardSkeleton";

const AllScholarships = () => {
  const [schCat, setSchCat] = useState("");
  const [subCat, setSubCat] = useState("");
  const [loc, setLoc] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const axiosInstance = useAxios();
  const { data: scholarships, isLoading } = useQuery({
    queryKey: ["scholarships", schCat, subCat, loc, search, sort],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/scholarships?schCat=${schCat}&subCat=${subCat}&loc=${loc}&sort=${sort}&search=${search}`
      );
      return data.scholarships;
    },
  });

  const handleReset = () => {
    setSearch("");
    setSchCat("");
    setSubCat("");
    setLoc("");
    setSort("");
  };

  const hasActiveFilter = search || schCat || subCat || loc || sort;

  return (
    <Container className={"py-20"}>
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="badge badge-primary badge-outline mb-4 px-4 py-3 font-semibold">
          🎓 Your Future Awaits
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-base-content">
          All <span className="text-primary">Scholarships</span>
        </h1>
        <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
          Browse through hundreds of scholarship opportunities from top
          universities worldwide. Find the perfect match for your academic
          journey.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="card bg-base-100 shadow-lg border border-base-200 mb-10">
        <div className="card-body p-4 md:p-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Search Input */}
            <div className="w-full lg:w-auto flex-1 max-w-lg">
              <Search setSearch={setSearch} />
            </div>

            {/* Filters & Reset */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto justify-end">
              <Filters
                setSchCat={setSchCat}
                setSubCat={setSubCat}
                setLoc={setLoc}
                setSort={setSort}
              />

              {hasActiveFilter && (
                <button
                  onClick={handleReset}
                  className="btn btn-error btn-outline btn-sm sm:btn-md gap-2 min-w-[100px]"
                >
                  <Circle className="size-4" />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading
          ? [...Array(6)].map((_, index) => (
              <ScholarshipCardSkeleton key={index} />
            ))
          : scholarships.map((scholarship) => (
              <ScholarshipCard
                key={scholarship._id}
                scholarship={scholarship}
              />
            ))}
      </div>
    </Container>
  );
};

export default AllScholarships;
