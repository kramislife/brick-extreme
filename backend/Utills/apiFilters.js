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

    //    this.query = this.query.populate("product_category");
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

    // ADVANCED FILTER FOR PRICE, RATING, AND OTHER ATTRIBUTES
    let queryString = JSON.stringify(queryCopy);

    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryString));

    return this;
  }

  pagination(resPerPage) {
    const currentPage = this.queryStr.page || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.skip(skip).limit(resPerPage);
  }
}

export default API_Filters;
