#!/usr/bin/env node

const axios = require('axios');
const { Command } = require('commander');
require('dotenv').config();

const program = new Command();
const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/geo/1.0';

async function fetchCoordinates(location) {
    try {
        let url;
        if (/^\d{5}$/.test(location)) {
            // Handle ZIP code lookup
            url = `${BASE_URL}/zip?zip=${location},US&appid=${API_KEY}`;
        } else {
            // Handle city/state lookup
            const [city, state] = location.split(',').map(s => s.trim().toUpperCase());
            if (['AK', 'HI'].includes(state)) {
                console.error(`Error: ${state} is not supported.`);
                console.log('--------------------------------');
                process.exit(1);
            }
            url = `${BASE_URL}/direct?q=${encodeURIComponent(location)},US&limit=1&appid=${API_KEY}`;
        }
        
        const response = await axios.get(url);
        const data = response.data;

        if (!data || data.length === 0) {
            console.log(`No results found for: ${location}`);
            return;
        }

        // If API returns an array, take the first result
        const result = Array.isArray(data) ? data[0] : data;

        console.log(`Location: ${result.name}, ${result.state || 'Unknown State'}, ${result.country}`);
        console.log(`Latitude: ${result.lat}, Longitude: ${result.lon}`);
    } catch (error) {
        console.error(`Error fetching data for ${location}:`, error.message);
    }
}

program
    .name('mycli')
    .description('A CLI tool to fetch latitude and longitude of a given location.')
    .version('1.0.0')
    .argument('<locations...>', 'City, State, or ZIP code (comma-separated for multiple)')
    .action(async (locations) => {
        for (const location of locations) {
            console.log(`Fetching coordinates for: ${location}...`);
            await fetchCoordinates(location);
            console.log('--------------------------------');
        }
    });

program.parse(process.argv);
