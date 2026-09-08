// Video class

class Video {
    constructor(title, uploader, time) {
        this.title = title;
        this.uploader = uploader;
        this.time = time;
    }

    watch() {
        console.log(
            `${this.uploader} watched all ${this.time} seconds of ${this.title}!`
        );
    }
}


// First video

const video1 = new Video(
    "JavaScript Basics",
    "Daniel",
    120
);

video1.watch();


// Second video

const video2 = new Video(
    "Learn HTML",
    "John",
    180
);

video2.watch();


// Bonus: Store five videos in an array

const videoData = [
    {
        title: "JavaScript Basics",
        uploader: "Daniel",
        time: 120
    },
    {
        title: "Learn HTML",
        uploader: "John",
        time: 180
    },
    {
        title: "CSS Tutorial",
        uploader: "Mary",
        time: 240
    },
    {
        title: "Python for Beginners",
        uploader: "Peter",
        time: 300
    },
    {
        title: "Web Development",
        uploader: "Sarah",
        time: 360
    }
];


// Bonus: Create Video objects using a loop

for (const video of videoData) {
    const newVideo = new Video(
        video.title,
        video.uploader,
        video.time
    );

    newVideo.watch();
}