import { Request, Response } from 'express';
import axios from 'axios';
import geocoder from '../Services/GeolocationService';
import { Config } from '../Config/config';

export const getDepartures = async (req: Request, res: Response) => {
    const { address, latitude, longitude } = req.body;
    let coordinates: { latitude: number, longitude: number } = { latitude: 0, longitude: 0 };

    if (latitude && longitude) {
        coordinates = { latitude, longitude };
    } else if (address) {
        const location = await geocoder.geocode(address);
        if (location.length === 0) {
            return res.status(400).json({ error: 'Invalid address' });
        }
        coordinates = { latitude: location[0].latitude, longitude: location[0].longitude };
    } else {
        return res.status(400).json({ error: 'Invalid location request' });
    }

    try {
        
        const response = await axios.get(`${Config.TFL_API_URL}StopPoint/?lat=${coordinates.latitude}&lon=${coordinates.longitude}&stopTypes=NaptanMetroStation,NaptanPublicBusCoachTram&radius=500&app_key=${Config.TFL_API_KEY}`);
    
        return res.status(200).json(response.data.data);
    } catch (error) {
        console.error('Error fetching departures:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
