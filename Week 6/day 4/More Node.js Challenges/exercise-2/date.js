function calculateMinutesLived(birthdate) {
    const birthDate = new Date(birthdate);
    const now = new Date();

    const difference = now - birthDate;

    const minutes = Math.floor(
        difference / (1000 * 60)
    );

    return minutes;
}

module.exports = calculateMinutesLived;