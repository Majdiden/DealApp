const mongoose = require("mongoose");
const User = require("../models/user");

const paginationLabels = {
  totalDocs: "usersCount",
  docs: "users",
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

class UserRepository {
  static async findByPhone(phone) {
    return await User.findOne({ phone });
  }

  static async findById(id) {
    return await User.findById(id);
  }

  static async create(user) {
    return await User.create(user);
  }

  static async getStats() {
    const aggregate = User.aggregate([
      {
        $lookup: {
          from: "requests",
          localField: "_id",
          foreignField: "createdBy",
          as: "requests",
        },
      },
      {
        $lookup: {
          from: "ads",
          localField: "_id",
          foreignField: "createdBy",
          as: "ads",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          role: 1,
          phone: 1,
          status: 1,
          adsCount: { $size: "$ads" },
          totalAdsAmount: { $sum: "$ads.price" },
          requestsCount: { $size: "$requests" },
          totalRequestsAmount: { $sum: "$requests.price" },
        },
      },
    ]);
    const users = await User.aggregatePaginate(aggregate, {
      page: 1,
      limit: 5,
      customLabels: paginationLabels,
      useFacet: true,
    });
    return users;
  }
}

module.exports = UserRepository;
