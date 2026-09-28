function timeUntilNewYear() {
    const now = new Date();

    let nextNewYear = new Date(now.getFullYear() + 1, 0, 1);

    const difference = nextNewYear - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    return `${days} days, ${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} hours`;
}

module.exports = timeUntilNewYear;