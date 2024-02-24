const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

//dotenv
require('dotenv').config();

// Use CORS for cross site scripting protection
app.use(cors());


// Express now has built-in body parsing functionality
app.use(express.json());

// Endpoint to handle code execution
app.post('/execute', async (req, res) => {
    const { script, language } = req.body;

    // Update the program object with the provided language
    const program = {
        script,
        language, // Dynamically set the language based on user selection
        versionIndex: "0",
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret
    };

    try {
        // Make a POST request to the JDoodle execute endpoint using axios
        const response = await axios.post('https://api.jdoodle.com/v1/execute', program, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Send the response back to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error making API request:', error);
        res.status(500).send('Error executing code');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
