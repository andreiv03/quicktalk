import { Redis } from "@upstash/redis";

import { ENV } from "@/config/constants";

export const redis = new Redis({
	token: ENV.UPSTASH_REDIS_REST_TOKEN,
	url: ENV.UPSTASH_REDIS_REST_URL,
});
