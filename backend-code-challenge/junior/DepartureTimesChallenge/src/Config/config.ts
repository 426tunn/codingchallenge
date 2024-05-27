import { config } from "dotenv";
import path from "path";
config();
((): void => {
    config({
        path: path.join(__dirname, "./../", ".env"),
    });
})();

const getConfig = function () {
    return {
        PORT: Number(process.env.PORT || 3010),
        DBURL: String(process.env.DBURL),
        TFL_API_KEY: String(process.env.TFL_API_KEY),
        TFL_API_URL: String(process.env.TFL_API_URL)
    };
};

export const Config = getConfig();
