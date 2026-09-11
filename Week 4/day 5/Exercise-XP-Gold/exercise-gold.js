//2: Analyze #2 — Sequential Await
//==SEQUENTIAL START==
//starting slow promise
//(...2 second pause...)
//slow promise is done
//slow
//starting fast promise
//(...1 second pause...)
//fast promise is done
//fast


//3: Analyze #3 — Concurrent Await
//(...4 second pause, from setTimeout...)
//==CONCURRENT START with await==
//starting slow promise
//starting fast promise
//(...2 second pause...)
//fast promise is done
//slow promise is done
//slow
//fast


//4:Modify Fetch with Async/Await
const urls = [
    "https://jsonplaceholder.typicode.com/users",
    "https://jsonplaceholder.typicode.com/posts",
    "https://jsonplaceholder.typicode.com/albums"
];

const getData = async function () {
    try {
        const [users, posts, albums] = await Promise.all(
            urls.map(async url => {
                const resp = await fetch(url);
                if (!resp.ok) {
                    throw new Error(`HTTP error! status: ${resp.status}`);
                }
                return resp.json();
            })
        );

        console.log('users', users);
        console.log('posts', posts);
        console.log('albums', albums);
    } catch (error) {
        console.log('ooooooops', error);
    }
};

getData();
