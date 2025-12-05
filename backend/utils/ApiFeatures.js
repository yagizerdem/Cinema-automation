class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // substring match
  contains() {
    // 1A) Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sortAsc", "sortDesc", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|ne)\b/g,
      (match) => `$${match}`
    );
    let parsedQuery = JSON.parse(queryStr);

    // 1C) Convert plain string fields to regex for substring search
    for (const key in parsedQuery) {
      const val = parsedQuery[key];
      if (typeof val === "string") {
        parsedQuery[key] = { $regex: val, $options: "i" }; // case-insensitive substring match
      }
    }

    this.query = this.query.find(parsedQuery);
    return this;
  }

  // exact match
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|ne)\b/g, (m) => `$${m}`);

    let parsedQuery = JSON.parse(queryStr);

    for (const key in parsedQuery) {
      if (parsedQuery[key] && typeof parsedQuery[key] === "object") {
        for (const op in parsedQuery[key]) {
          const val = parsedQuery[key][op];

          if (!isNaN(val)) {
            parsedQuery[key][op] = Number(val);
          } else if (typeof val === "string" && !isNaN(Date.parse(val))) {
            parsedQuery[key][op] = new Date(val);
          }
        }
      }
    }

    this.query = this.query.find(parsedQuery);
    return this;
  }

  sortAscending() {
    if (this.queryString.sortAsc) {
      const sortBy = this.queryString.sortAsc.split(",").join(" ");
      this.query = this.query.sort(sortBy + " _id"); // ascending by default
    }
    return this;
  }

  sortDescending() {
    if (this.queryString.sortDesc) {
      const sortBy = this.queryString.sortDesc
        .split(",")
        .map((field) => "-" + field)
        .join(" ");
      this.query = this.query.sort(sortBy + " -_id");
    }
    return this;
  }

  limitFields() {
    // 3) Field limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    // 4) Pagination
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = { ApiFeatures };
