import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://pro-wasp-9634.upstash.io",
  token: "ASWiAAImcDIzYjFiZTE5MTg1NTY0ZTVmYjY1ZDM3NzNiYzUzMTA0NHAyOTYzNA",
});

async function test() {
  try {
    await redis.set("test-key", "hello");
    const value = await redis.get("test-key");
    console.log("✅ Redis works:", value);
  } catch (err) {
    console.error("❌ Redis error:", err);
  }
}

test();
