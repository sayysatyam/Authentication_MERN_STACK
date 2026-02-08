const checkWeeklyReset = (userDoc) => {
  const now = new Date();

  if (!userDoc.lastWeeklyReset) {
    userDoc.lastWeeklyReset = now;
    userDoc.weeklyCompleted = 0;
    return;
  }

  const last = new Date(userDoc.lastWeeklyReset);

  const diffWeeks =
    Math.floor(
      (now.setHours(0,0,0,0) - last.setHours(0,0,0,0)) /
      (1000 * 60 * 60 * 24 * 7)
    );

  if (diffWeeks >= 1) {
    userDoc.weeklyCompleted = 0;
    userDoc.lastWeeklyReset = new Date();
  }
};

module.exports = checkWeeklyReset;