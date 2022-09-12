const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// middleware
app.use(cors());
app.use(express.json());

// ROUTES //

// PLANT DATABASE //

// add a plant to the database
app.post('/addplant', async (req, res) => {
    try {
        const { 
            speciesGer, 
            speciesLat, 
            speciesDescription, 
            wateringFrequencyGrowth, 
            wateringFrequencyResting, 
            fertilizingFrequencyGrowth, 
            fertilizingFrequencyResting, 
            miscNotes 
        } = req.body;
        const newPlant = await pool.query(
            "INSERT INTO plants (plant_id, species_ger, species_lat, species_description, watering_frequency_growth, watering_frequency_resting, fertilizing_frequency_growth, fertilizing_frequency_resting, misc_notes) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [speciesGer, speciesLat, speciesDescription, wateringFrequencyGrowth, wateringFrequencyResting, fertilizingFrequencyGrowth, fertilizingFrequencyResting, miscNotes]
        );
        res.json(newPlant.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get all plants from the database
app.get('/plants', async (req, res) => {
    try {
        const allPlants = await pool.query("SELECT * FROM plants");
        res.json(allPlants.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get a plant from the database

// PLANTS CARE PLAN //

// add a plant to the care plan

// get all plants from the care plan

// remove a plant from the care plan

// set last watering date

// set last fertilizing date



app.listen(5000, () => {
    console.log('Server is running on port 5000');
    });
