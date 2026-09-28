import axios from "axios";

async function fetchPosts() {
    const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
    );

    return response.data;
}

export { fetchPosts };