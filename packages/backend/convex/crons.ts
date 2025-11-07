import { cronJobs } from "convex/server";
import { internal } from "@workspace/backend/_generated/api.js";

const crons = cronJobs();

// Запускаем каждый час (можно поменять на минуту/день)
crons.interval(
  "clear expired contact sessions",
  { hours: 1 },
  internal.private.functions.clearExpiredSessions
);

export default crons;