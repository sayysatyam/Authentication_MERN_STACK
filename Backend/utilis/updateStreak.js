const updateStreak = (user) => {
  const today = new Date();
  today.setHours(0,0,0,0);

  const last = user.lastActiveDate
    ? new Date(user.lastActiveDate)
    : null;

  if (!last) {
    user.streak = 1;
  } else {
    last.setHours(0,0,0,0);

    const diff =
      (today - last) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      user.streak += 1;
    } else if (diff > 1) {
      user.streak = 1;
    }
    // diff === 0 → same day → do nothing
  }

  user.lastActiveDate = new Date();
};
module.exports = updateStreak;