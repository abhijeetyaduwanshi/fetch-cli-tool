const { exec } = require('child_process');
const path = require('path');
const util = require('util');

const execPromise = util.promisify(exec);
const CLI_PATH = path.resolve(__dirname, '../src/index.js');

describe('Geo CLI Integration Tests', () => {
    beforeAll(() => {
        process.env.OPENWEATHER_API_KEY = 'test_api_key';
    });

    test('should return valid coordinates for a city and state', async () => {
        const { stdout } = await execPromise(`node ${CLI_PATH} "Madison, WI"`);
        expect(stdout).toMatch(/Location: Madison, Wisconsin, US/);
        expect(stdout).toMatch(/Latitude: \d+\.\d+, Longitude: -?\d+\.\d+/);
    });

    test('should return valid coordinates for a ZIP code', async () => {
        const { stdout } = await execPromise(`node ${CLI_PATH} "90006"`);
        expect(stdout).toMatch(/Location: Los Angeles, .+, US/);
        expect(stdout).toMatch(/Latitude: \d+\.\d+, Longitude: -?\d+\.\d+/);
    });

    test('should handle multiple locations', async () => {
        const { stdout } = await execPromise(`node ${CLI_PATH} "Chicago, IL" "10001"`);
        expect(stdout).toMatch(/Location: Chicago, Illinois, US/);
        expect(stdout).toMatch(/Latitude: \d+\.\d+, Longitude: -?\d+\.\d+/);
        expect(stdout).toMatch(/Location: New York, .+, US/);
        expect(stdout).toMatch(/Latitude: \d+\.\d+, Longitude: -?\d+\.\d+/);
    });

    test('should return an error for AK and HI', async () => {
        await expect(execPromise(`node ${CLI_PATH} "Anchorage, AK"`)).rejects.not.toBe(0);
        await expect(execPromise(`node ${CLI_PATH} "Honolulu, HI"`)).rejects.not.toBe(0);
    });    

    test('should return an error for an invalid location', async () => {
        const { stdout } = await execPromise(`node ${CLI_PATH} "InvalidCity, XY"`);
        expect(stdout).toMatch(/No results found for: InvalidCity, XY/);
    });
});
