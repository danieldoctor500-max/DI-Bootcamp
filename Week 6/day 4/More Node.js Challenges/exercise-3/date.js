function getNextHoliday() {
    const now = new Date();

    let holiday = new Date(
        now.getFullYear(),
        11,
        25,
        0,
        0,
        0
    );

    if (holiday <= now) {
        holiday = new Date(
            now.getFullYear() + 1,
            11,
            25,
            0,
            0,
            0
        );
    }

    const difference = holiday - now;

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    return {
        holiday: "Christmas",
        date: holiday,
        days,
        hours,
        minutes,
        seconds
    };
}

module.exports = getNextHoliday;