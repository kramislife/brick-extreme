class API_Filters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // KEYWORD SEARCH -> MULTIPLE KEYWORDS SEPARATED BY SPACE
  search() {
    if (this.queryStr.keyword) {
      const keywords = this.queryStr.keyword.trim().split(/\s+/);

      if (keywords.length > 0 && keywords[0] !== "") {
        const keywordFilter = {
          $or: keywords.map((word) => ({
            $or: [
              { product_name: { $regex: word, $options: "i" } },
              { product_description_1: { $regex: word, $options: "i" } },
            ],
          })),
        };

        console.log("KEYWORDS: ", keywords);

        this.query = this.query.find(keywordFilter); // Apply the constructed filter
      }
    } else {
      this.query = this.query.find();
    }

    this.query = this.query
      .populate("product_category", "name")
      .populate("product_collection", "name");

    return this;
  }

  // PRODUCT FILTER -> FILTER PRODUCTS BASED ON DIFFERENT ATTRIBUTES
  filters() {
    const queryCopy = { ...this.queryStr };

    const fieldsToRemove = ["keyword", "page"];
    fieldsToRemove.forEach((element) => delete queryCopy[element]);

    // Arrays to store OR conditions for product_category and product_collection
    const categoryConditions = [];
    const collectionConditions = [];
    const otherConditions = [];

    for (let key in queryCopy) {
      if (queryCopy[key]) {
        // If the filter contains multiple values separated by commas, split them into an array
        if (
          typeof queryCopy[key] === "string" &&
          queryCopy[key].includes(",")
        ) {
          queryCopy[key] = queryCopy[key]
            .split(",")
            .map((value) => value.trim());
        }

        // Handle product_category filters (with OR between multiple values)
        if (key === "product_category") {
          if (Array.isArray(queryCopy[key])) {
            queryCopy[key].forEach((value) => {
              categoryConditions.push({ [key]: value });
            });
          } else {
            categoryConditions.push({ [key]: queryCopy[key] });
          }
        }
        // Handle product_collection filters (with OR between multiple values)
        else if (key === "product_collection") {
          if (Array.isArray(queryCopy[key])) {
            queryCopy[key].forEach((value) => {
              collectionConditions.push({ [key]: value });
            });
          } else {
            collectionConditions.push({ [key]: queryCopy[key] });
          }
        }
        // For other filters, handle using $in
        else {
          otherConditions.push({ [key]: { $in: queryCopy[key] } });
        }
      }
    }

    // Combine all conditions with $or logic
    const orConditions = [];

    if (categoryConditions.length > 0) {
      orConditions.push({ $or: categoryConditions }); // $or for product_category
    }

    if (collectionConditions.length > 0) {
      orConditions.push({ $or: collectionConditions }); // $or for product_collection
    }

    // If there are other conditions (like price, rating, etc.), include them
    if (otherConditions.length > 0) {
      orConditions.push(...otherConditions); // $or for other filters like price
    }

    // Apply the $or conditions if any
    if (orConditions.length > 0) {
      this.query = this.query.find({ $or: orConditions });
    }

    return this;
  }

  pagination(resPerPage) {
    const currentPage = this.queryStr.page || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.skip(skip).limit(resPerPage);
  }
}

export default API_Filters;
