const { Given, When, Then } = require("@cucumber/cucumber");
const axios = require("axios");
const chai = require("chai");

const expect = chai.expect;

let apiEndpoint;
let apiKey;
let apiInvalidKey;
let response;

Given("the API endpoint is {string}", function (endpoint) {
  apiEndpoint = endpoint;
});

Given("the API key is {string}", function (key) {
  apiKey = key;
});

Given("Invalid API key is {string}", function (invalidKey) {
  apiInvalidKey = invalidKey;
});

When(
  "I make a request to the endpoint with valid start date {string} and end date {string}",
  async function (startDate, endDate) {
    const url = `${apiEndpoint}?end_date=${endDate}&start_date=${startDate}&apikey=${apiKey}`;
    response = await axios.get(url);
  }
);

When(
  "I make a request to the endpoint with valid parameters and base currency {string}",
  async function (baseCurrency) {
    const url = `${apiEndpoint}?end_date=2023-08-08&start_date=2023-07-30&base=${baseCurrency}&apikey=${apiKey}`;
    response = await axios.get(url);
  }
);

When(
  "I make a request with valid parameters and symbols {string}",
  async function (symbolCurrency) {
    const url = `${apiEndpoint}?end_date=2023-08-08&start_date=2023-07-30&symbols=${symbolCurrency}&apikey=${apiKey}`;
    response = await axios.get(url);
  }
);

When(
  "I make a request to the endpoint with valid parameters, base currency {string}, and symbols {string}",
  async function (baseCurrency, symbolCurrency) {
    const url = `${apiEndpoint}?end_date=2023-08-08&start_date=2023-07-30&base=${baseCurrency}&symbols=${symbolCurrency}&apikey=${apiKey}`;
    response = await axios.get(url);
  }
);

When("I send a request without an API key", async function () {
  const url = `${apiEndpoint}?end_date=2023-08-08&start_date=2023-07-30`;
  try {
    response = await axios.get(url);
  } catch (error) {
    response = error.response;
  }
});

When("I send a request with an invalid API key", async function () {
  const url = `${apiEndpoint}?end_date=2023-08-08&start_date=2023-07-30&apikey=${apiInvalidKey}`;
  try {
    response = await axios.get(url);
  } catch (error) {
    response = error.response;
  }
});

When(
  "I send a request with an invalid base currency {string}",
  async function (baseCurrency) {
    const url = `${apiEndpoint}?end_date=2023-08-08&start_date=2023-07-30&base=${baseCurrency}&apikey=${apiKey}`;
    try {
      response = await axios.get(url);
    } catch (error) {
      response = error.response;
    }
  }
);

When(
  "I send a request with invalid currency symbol {string}",
  async function (symbolCurrency) {
    const url = `${apiEndpoint}?end_date=2023-08-08&start_date=2023-07-30&symbols=${symbolCurrency}&apikey=${apiKey}`;
    try {
      response = await axios.get(url);
    } catch (error) {
      response = error.response;
    }
  }
);

When(
  "I send a request with an invalid start date {string}",
  async function (startDate) {
    const url = `${apiEndpoint}?end_date=2023-08-08&start_date=${startDate}&apikey=${apiKey}`;
    try {
      response = await axios.get(url);
    } catch (error) {
      response = error.response;
    }
  }
);

When(
  "I send a request with an invalid end date {string}",
  async function (endDate) {
    const url = `${apiEndpoint}?end_date=${endDate}&start_date=2023-07-30&apikey=${apiKey}`;
    try {
      response = await axios.get(url);
    } catch (error) {
      response = error.response;
    }
  }
);

When(
  "I send a request with a start date {string} further the end date {string}",
  async function (startDate, endDate) {
    const url = `${apiEndpoint}?end_date=${endDate}&start_date=${startDate}&apikey=${apiKey}`;
    try {
      response = await axios.get(url);
    } catch (error) {
      response = error.response;
    }
  }
);

When(
  "I send a request with a start date {string} and the end date {string} range over 365 days",
  async function (startDate, endDate) {
    const url = `${apiEndpoint}?end_date=${endDate}&start_date=${startDate}&apikey=${apiKey}`;
    try {
      response = await axios.get(url);
    } catch (error) {
      response = error.response;
    }
  }
);

When("I send a request with a wrong route {string}", async function (route) {
  const url = `${route}?end_date=2023-08-08&start_date=2023-07-30&apikey=${apiKey}`;
  try {
    response = await axios.get(url);
  } catch (error) {
    response = error.response;
  }
});

Then("the response status code should be {int}", function (statusCode) {
  expect(response.status).to.equal(statusCode);
});
