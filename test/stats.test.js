// This file contains unit tests for the /users endpoint

const request = require("supertest");
const { expect } = require("chai");
const app = require("../server");
const User = require("../db/models/user");

/**
 * Helper function to register a user and obtain a token
 */
async function registerAndLogin(user) {
  try {
    await request(app).post("/auth/register").send(user);
    const response = await request(app).post("/auth/login").send({
      phone: user.phone,
      password: user.password,
    });
    return response.body.token;
  } catch (error) {
    console.error("Error in registerAndLogin:", error);
    throw error;
  }
}

/**
 * Helper function to create ads for a user
 */
async function createAds(token, userId) {
  try {
    const adData = {
      createdBy: userId,
      price: 100,
      description: "",
      area: "",
      district: "",
      propertyType: "VILLA",
      city: "",
      refreshedAt: Date.now(),
    };
    await request(app)
      .post("/ads")
      .set("Authorization", `Bearer ${token}`)
      .send(adData);
    adData.price = 200;
    await request(app)
      .post("/ads")
      .set("Authorization", `Bearer ${token}`)
      .send(adData);
  } catch (error) {
    console.error("Error in createAds:", error);
    throw error;
  }
}

/**
 * Helper function to create requests for a user
 */
async function createRequests(token, userId) {
  try {
    const requestData = {
      createdBy: userId,
      price: 100,
      description: "",
      area: "",
      district: "",
      propertyType: "VILLA",
      city: "",
      refreshedAt: Date.now(),
    };
    await request(app)
      .post("/requests")
      .set("Authorization", `Bearer ${token}`)
      .send(requestData);
    requestData.price = 300;
    await request(app)
      .post("/requests")
      .set("Authorization", `Bearer ${token}`)
      .send(requestData);
  } catch (error) {
    console.error("Error in createRequests:", error);
    throw error;
  }
}

/**
 * Test suite for the /users endpoint
 */
describe("GET /users", () => {
  /**
   * Setup before each test
   * - Clear the database
   * - Create test users, ads, and requests
   * - Obtain an authentication token for the admin user
   */

  let token;
  before(async function () {
    this.timeout(20000);
    try {
      await User.deleteMany({});

      const admin = {
        name: "Admin",
        phone: "12211221",
        password: "password1122",
        role: "ADMIN",
        status: "ACTIVE",
      };

      const users = [
        admin,
        {
          name: "Client",
          phone: "11223344",
          password: "password1122",
          role: "CLIENT",
          status: "ACTIVE",
        },
        {
          name: "Agent",
          phone: "12345678",
          password: "password1122",
          role: "AGENT",
          status: "ACTIVE",
        },
      ];

      for (const user of users) {
        token = await registerAndLogin(user);
        if (user.role === "AGENT") {
          await createAds(token, user._id);
        }
        if (user.role === "CLIENT") {
          await createRequests(token, user._id);
        }
      }

      token = await registerAndLogin(admin);
    } catch (error) {
      console.error("Error in before hook:", error);
      throw error;
    }
  });

  it("should return a list of users", async () => {
    try {
      const response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(200);
      expect(response.body.users.length).to.greaterThan(0);
      // Add more assertions as needed
    } catch (error) {
      console.error("Error in 'should return a list of users' test:", error);
      throw error;
    }
  });

  it("should return user statistics for a user with ads", async () => {
    try {
      const response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(200);
      const userStats = response.body.users.find(
        (user) => user.role === "AGENT"
      );

      expect(userStats.adsCount).to.equal(2);
      expect(userStats.requestsCount).to.equal(0);
      expect(userStats.totalAdsAmount).to.equal(300);
      expect(userStats.totalRequestsAmount).to.equal(0);
      // Add more assertions as needed
    } catch (error) {
      console.error(
        "Error in 'should return user statistics for a user with ads' test:",
        error
      );
      throw error;
    }
  });

  it("should return user statistics for a user with requests", async () => {
    try {
      const response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(200);
      const userStats = response.body.users.find(
        (user) => user.role === "CLIENT"
      );

      expect(userStats.adsCount).to.equal(0);
      expect(userStats.requestsCount).to.equal(2);
      expect(userStats.totalAdsAmount).to.equal(0);
      expect(userStats.totalRequestsAmount).to.equal(400);
      // Add more assertions as needed
    } catch (error) {
      console.error(
        "Error in 'should return user statistics for a user with requests' test:",
        error
      );
      throw error;
    }
  });

  it("should return user statistics for a user with no ads or requests", async () => {
    try {
      const response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(200);
      const userStats = response.body.users.find(
        (user) => user.name === "Admin"
      );

      expect(userStats.adsCount).to.equal(0);
      expect(userStats.requestsCount).to.equal(0);
      expect(userStats.totalAdsAmount).to.equal(0);
      expect(userStats.totalRequestsAmount).to.equal(0);
      // Add more assertions as needed
    } catch (error) {
      console.error(
        "Error in 'should return user statistics for a user with no ads or requests' test:",
        error
      );
      throw error;
    }
  });
});
