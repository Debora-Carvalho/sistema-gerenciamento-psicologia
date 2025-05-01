async function indexBackend(req, res) {
    return res.json("hello world");
}

module.exports = { indexBackend };
