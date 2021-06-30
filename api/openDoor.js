const fetch = require("node-fetch");

module.exports = async (_, res) => {
    // const result = await fetch(`http://${STATIC_IP}:8080/api`);
    // const data = await result.json();
    res.status(200).send("coucou");
};