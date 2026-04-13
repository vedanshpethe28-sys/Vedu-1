const FREE_DAILY_LIMIT = 3;

export const resetDailyCreditsIfNeeded = (user) => {
  const now = new Date();
  const resetDate = new Date(user.creditsResetDate);
  const isDifferentDay =
    now.getUTCFullYear() !== resetDate.getUTCFullYear() ||
    now.getUTCMonth() !== resetDate.getUTCMonth() ||
    now.getUTCDate() !== resetDate.getUTCDate();

  if (isDifferentDay) {
    user.creditsUsedToday = 0;
    user.creditsResetDate = now;
  }
};

export const canGenerateVideo = (user) => {
  if (user.plan === "paid") {
    return true;
  }

  return user.creditsUsedToday < FREE_DAILY_LIMIT;
};

export const consumeCredit = (user) => {
  if (user.plan === "free") {
    user.creditsUsedToday += 1;
  }
};

export const creditsRemaining = (user) => {
  if (user.plan === "paid") {
    return "unlimited";
  }
  return Math.max(0, FREE_DAILY_LIMIT - user.creditsUsedToday);
};

export { FREE_DAILY_LIMIT };
