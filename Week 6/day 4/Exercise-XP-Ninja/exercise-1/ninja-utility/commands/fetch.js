const axios = require("axios");

async function fetchData() {
    try {
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts/1"
        );

        console.log("Fetched data:");
        console.log(response.data);
    } catch (error) {
        console.log("Error fetching data:", error.message);
    }
}

module.exports = fetchData;