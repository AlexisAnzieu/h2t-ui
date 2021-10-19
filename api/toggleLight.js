import fetch from "node-fetch";

export default async (_, res) => {
    const result = await fetch(`https://maker.ifttt.com/trigger/h2t_door_open/with/key/${process.env.IFTT_KEY}`);
    const data = await result;
    console.log(data)
    res.status(200).send(data);
};