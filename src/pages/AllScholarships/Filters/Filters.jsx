import React from "react";

const Filters = ({ setLoc, setSubCat, setSchCat, setSort }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {/* Scholarship Category Filter */}
      <div>
        <select
          onChange={(e) => setSchCat(e.target.value)}
          defaultValue=""
          className="select select-bordered focus:outline-none focus:border-primary"
        >
          <option value="" disabled>
            Scholarship Category
          </option>
          <option value="">All</option>
          <option value="Full fund">Full Fund</option>
          <option value="Partial fund">Partial Fund</option>
          <option value="Self fund">Self Fund</option>
        </select>
      </div>

      {/* Subject Category Filter */}
      <div>
        <select
          onChange={(e) => setSubCat(e.target.value)}
          defaultValue=""
          className="select select-bordered focus:outline-none focus:border-primary"
        >
          <option value="" disabled>
            Subject Category
          </option>
          <option value="">All</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Engineering">Engineering</option>
          <option value="Doctor">Doctor</option>
          <option value="Architecture">Architecture</option>
          <option value="Business">Business</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Law">Law</option>
          <option value="Arts">Arts</option>
          <option value="Science">Science</option>
          <option value="Mathematics">Mathematics</option>
        </select>
      </div>

      {/* Location Filter */}
      <div>
        <select
          onChange={(e) => setLoc(e.target.value)}
          defaultValue=""
          className="select select-bordered focus:outline-none focus:border-primary"
        >
          <option value="" disabled>
            Location
          </option>
          <option value="">All</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
          <option value="Germany">Germany</option>
          <option value="Australia">Australia</option>
          <option value="Japan">Japan</option>
          <option value="France">France</option>
          <option value="Netherlands">Netherlands</option>
          <option value="Sweden">Sweden</option>
          <option value="Switzerland">Switzerland</option>
          <option value="China">China</option>
          <option value="Singapore">Singapore</option>
          <option value="New Zealand">New Zealand</option>
          <option value="South Korea">South Korea</option>
          <option value="Italy">Italy</option>
        </select>
      </div>

      {/* Sort by Application fees  */}
      <div>
        <select
          onChange={(e) => setSort(e.target.value)}
          defaultValue=""
          className="select select-bordered focus:outline-none focus:border-primary"
        >
          <option value="" disabled>
            Sort by Fess
          </option>
          <option value="asc">Low to High</option>
          <option value="dsc">High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
