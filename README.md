# Fetch Geolocation CLI Utility

## Overview
This command-line utility is for Fetch take home project that fetches geographic coordinates (latitude and longitude) based on United States city/state or ZIP code inputs. It queries the OpenWeather Geocoding API and returns location details. The utility supports multiple location inputs and enforces restrictions for HI (Hawaii) and AK (Alaska).

## Features
- Fetches latitude and longitude for United States city/state or ZIP code.
- Supports multiple location queries at once.
- Uses OpenWeather Geocoding API.
- Rejects locations in HI (Hawaii) and AK (Alaska).
- Provides clear output in the terminal.

## Folder Structure
```
fetch-cli-tool/
│── src/
│   ├── index.js # Main CLI script
│── tests/
│   ├── test.js # Jest integration tests
│── .gitignore # Git ignore file
│── example.env # Example API key configuration
│── package.json
│── README.md
```

## Test Structure
- **Integration Tests**: The `tests/test.js` file contains full CLI tests using Jest.
- **Test Coverage**:
  - Valid city/state lookup
  - Valid ZIP code lookup
  - Multiple location queries
  - Handling of unsupported states (HI (Hawaii) and AK (Alaska))
  - Invalid location handling

## Prerequisites
- Node.js
- OpenWeather API Key

## Installation
1. Clone the repository:
   ```
   git clone -path
   cd fetch-cli-tool
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Configure API Key:
   - Duplicate the `example.env` file and remove `example` and add your OpenWeather API key:
     ```
     OPENWEATHER_API_KEY=your_api_key_here
     ```
4. Make the CLI executable:
    ```
    chmod +x src/index.js
    ```
5. Link the CLI globally:
    ```
    npm link
    ```
    Now, we can use `mycli` as a global command from anywhere in the terminal eg: `mycli "Madison, WI"`

## Usage
Run the CLI with a city/state or ZIP code:
```
mycli "Madison, WI"
mycli "90006"
mycli "Chicago, IL" "10001"
```

### Example Output
```
Fetching coordinates for: Madison, WI...
Location: Madison, Wisconsin, US
Latitude: 43.074761, Longitude: -89.3837613
--------------------------------
```

```
Fetching coordinates for: 90006...
Location: Los Angeles, Unknown State, US
Latitude: 34.0493, Longitude: -118.2917
--------------------------------
```

```
Fetching coordinates for: Chicago, IL...
Location: Chicago, Illinois, US
Latitude: 41.8755616, Longitude: -87.6244212
--------------------------------
Fetching coordinates for: 10001...
Location: New York, Unknown State, US
Latitude: 40.7484, Longitude: -73.9967
--------------------------------
```

## Running Tests
To execute integration tests:
```
npm test
```

## Constraints
- If HI (Hawaii) or AK (Alaska) is entered, an error will be thrown:
  ```
  mycli "Honolulu, HI"
  ```
  **Output:**
  ```
  Error: HI is not supported.
  ```
- If an invalid location is provided, the utility will return:
  ```
  No results found for: InvalidCity, XY
  ```
