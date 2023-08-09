Feature: Testing the /timeseries endpoint

    Timeseries endpoint lets you query the API for daily historical rates between two dates of your choice, with a maximum time frame of 365 days.
    Rule: Successfull scenarios

        Background:
            Given the API endpoint is "https://api.apilayer.com/exchangerates_data/timeseries"
            And the API key is "ITpSVENX8ywAWpWNZSIzEKxKbFelXkhA"

        Scenario: Successful API request with start and end date (without base currency and symbols)
            When I make a request to the endpoint with valid start date "2023-07-30" and end date "2023-08-08"
            Then the response status code should be 200

        Scenario: Successful API request with a different base currency
            When I make a request to the endpoint with valid parameters and base currency "PLN"
            Then the response status code should be 200

        Scenario: Successful API request with different currency symbols
            When I make a request with valid parameters and symbols "USD"
            Then the response status code should be 200

        Scenario: Successful API request with base currencies and multiple symbols
            When I make a request to the endpoint with valid parameters, base currency "USD", and symbols "EUR,GBP,PLN,CAD"
            Then the response status code should be 200


    Rule: Not successfull scenarios
        Background:
            Given the API endpoint is "https://api.apilayer.com/exchangerates_data/timeseries"

        Scenario: Missing API key
            When I send a request without an API key
            Then the response status code should be 401

        Scenario: Invalid API Key
            And Invalid API key is "ITpSVENX8ywAWpWNZSIzEKxKbFelXkhB"
            When I send a request with an invalid API key
            Then the response status code should be 401

        Scenario: Invalid base currency
            When I send a request with an invalid base currency "PLNY"
            Then the response status code should be 400


        Scenario: Invalid symbols currencies
            When I send a request with invalid currency symbol "XYZ"
            Then the response status code should be 400

        Scenario: Invalid start date
            When I send a request with an invalid start date "2023-30-01"
            Then the response status code should be 400

        Scenario: Invalid end date
            When I send a request with an invalid end date "08-08-2023"
            Then the response status code should be 400

        Scenario: Start date further than end date
            When I send a request with a start date "2023-05-05" further the end date "2023-04-05"
            Then the response status code should be 400

        Scenario: Invalid date range
            When I send a request with a start date "2021-12-31" and the end date "2023-01-02" range over 365 days
            Then the response status code should be 400

        Scenario: Invalid route
            When I send a request with a wrong route "https://api.apilayer.com/exchangerates_dataa/timeseries"
            Then the response status code should be 404



    # We could add these scenarios as well and simulate API response but it was not a part of the task
    #     Scenario: Server Errors
    #         When the server returns a 500 Internal Server Error
    #         Then the response status code should be 500

    # #         Given I have a request to retrieve exchange rate time series data
    # #         When the server returns a 503 Service Unavailable error
    # #         Then the response status code should be 503