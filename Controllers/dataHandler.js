const db = require("../Database/db");

exports.storeIntoDb = async (req, res) => {
    const {
        campaignName,
        platform,
        product,
        budget,
        startDate,
        endDate,
        location,
        radius
    } = req.body;
    try {
        await db.none(
            `INSERT INTO campaigns_table (
                campaign_name,
                platform,
                product,
                budget,
                start_date,
                end_date,
                location,
                radius
            ) VALUES($1, $2, $3, $4, $5, $6, $7, $8);`,
            [
                campaignName,
                platform,
                product,
                budget,
                startDate,
                endDate,
                location,
                radius
            ]
        );

        return res.status().json({
            status: true,
            message: "New Campaign created"
        });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};
/*
exports.getCampaign = async (res) => {
    try {
        await db.none(
            `SELECT * FROM campaigns_table;`
        ).then((res) => {
            return res.json();
        });
    } catch (err) {
        return console.log(err.message);
    }
}
*/

exports.getCampaign = async (req, res) => {
    try {
        const data = await db.any(`SELECT * FROM campaigns_table;`);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};