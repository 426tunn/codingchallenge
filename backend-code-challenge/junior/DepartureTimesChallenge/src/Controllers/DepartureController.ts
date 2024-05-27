import { Request, Response } from 'express';
import axios from 'axios';
import geocoder from '../Services/GeolocationService';
import { Config } from '../Config/config';
import { StopPoint } from '../Types/StopPoint'; 

export const getDepartures = async (req: Request, res: Response) => {
    const { address, latitude, longitude } = req.body;
    let coordinates: { latitude: number; longitude: number } = { latitude: 0, longitude: 0 };

    if (latitude && longitude) {
        coordinates = { latitude, longitude };
    } else if (address) {
        try {
            const location = await geocoder.geocode(address);
            // console.log('Geocoding result:', location);
            if (location.length === 0) {
                console.error('Invalid address:', address);
                return res.status(400).json({ error: 'Invalid address' });
            }
            coordinates = { latitude: location[0].latitude, longitude: location[0].longitude };
        } catch (geocodeError) {
            console.error('Geocoding error:', geocodeError);
            return res.status(500).json({ error: 'Geocoding error', details: geocodeError.message });
        }
    } else {
        return res.status(400).json({ error: 'Invalid location request' });
    }

    try {
        console.log('Making request to TfL API with coordinates:', coordinates);
        const response = await axios.get(`${Config.TFL_API_URL}StopPoint/?lat=${coordinates.latitude}&lon=${coordinates.longitude}&stopTypes=NaptanMetroStation,NaptanPublicBusCoachTram&radius=500&app_key=${Config.TFL_API_KEY}`);
        const stopPoints: StopPoint[] = response.data.stopPoints;
        return res.status(200).json(stopPoints);
    } catch (error) {
        console.error('Error fetching departures:', error.response ? error.response.data : error.message);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};
