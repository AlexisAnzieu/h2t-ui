import fetch from "node-fetch";

export default async (_, res) => {
    const result = await fetch(`http://${process.env.STATIC_IP}:8080/api`);
    const data = await result.json();
    console.log(data)
    res.status(200).send(data);
};