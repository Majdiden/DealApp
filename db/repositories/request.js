const mongoose = require("mongoose");
const Request = require("../models/request");

const paginationLabels = {
  totalDocs: "requestsCount",
  docs: "requests",
  limit: "perPage",
  page: "currentPage",
  nextPage: "next",
  prevPage: "prev",
  totalPages: "pageCount",
  hasPrevPage: "hasPrev",
  hasNextPage: "hasNext",
  pagingCounter: "pageCounter",
  meta: "paginator",
};

module.exports = class RequestRepository {
  static async create(requestData) {
    return await Request.create(requestData);
  }

  static async findById(id) {
    return await Request.findById(id);
  }

  static async updateById(id, updateData) {
    return await Request.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async find(query) {
    const aggregate = Request.aggregate([
      { $match: query },
      { $sort: { refreshedAt: -1 } },
    ]);
    return await Request.aggregatePaginate(aggregate, {
      page: 1,
      limit: 5,
      customLabels: paginationLabels,
      useFacet: true,
    });
  }
};
