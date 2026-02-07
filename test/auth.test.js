import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";
import pool from "../src/config/db.js";

test("Register and login flow", async () => {
  const email = `test${Date.now()}@example.com`;

  const r1 = await request(app)
    .post("/auth/register")
    .set("Content-Type", "application/json")
    .send({ name: "Test User", email, password: "password123" })
    .expect(201);

  assert(r1.body.token, "register returns token");

  const r2 = await request(app)
    .post("/auth/login")
    .set("Content-Type", "application/json")
    .send({ email, password: "password123" })
    .expect(200);

  assert(r2.body.token, "login returns token");
});
test.after(async () => {
  await pool.end();
});
