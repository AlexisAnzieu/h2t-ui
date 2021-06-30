module.exports = async (_, res) => {
    const result = await fetch(`http://${STATIC_IP}:8080/api`);
    res.status(200).send(result);
};