import { describe, expect, it } from "bun:test";
import { Err, ErrOf, Ok } from "./types";

describe("Ok", () => {
	it("should create a successful result containing the specified value", () => {
		const result = Ok(42);

		expect(result).toEqual({
			ok: true,
			value: 42,
		});
	});

	it("should preserve complex values", () => {
		const value = {
			id: 1,
			name: "Alice",
			roles: ["admin", "user"],
		};

		const result = Ok(value);

		expect(result).toEqual({
			ok: true,
			value,
		});
	});

	it("should support null as a success value", () => {
		const result = Ok(null);

		expect(result).toEqual({
			ok: true,
			value: null,
		});
	});
});

describe("Err", () => {
	it("should create a failed result containing an Error instance", () => {
		const result = Err("Something went wrong");

		expect(result.ok).toBe(false);

		if (!result.ok) {
			expect(result.error).toBeInstanceOf(Error);
			expect(result.error.message).toBe("Something went wrong");
		}
	});

	it("should create an Error with the specified message", () => {
		const message = "User not found";
		const result = Err(message);

		expect(result).toEqual({
			ok: false,
			error: new Error(message),
		});
	});

	it("should support an empty error message", () => {
		const result = Err("");

		expect(result.ok).toBe(false);

		if (!result.ok) {
			expect(result.error).toBeInstanceOf(Error);
			expect(result.error.message).toBe("");
		}
	});
});

describe("ErrOf", () => {
	it("should preserve a string error", () => {
		const result = ErrOf("USER_NOT_FOUND");

		expect(result).toEqual({
			ok: false,
			error: "USER_NOT_FOUND",
		});
	});

	it("should preserve a custom error object", () => {
		const error = {
			code: 404,
			message: "User not found",
		};

		const result = ErrOf(error);

		expect(result).toEqual({
			ok: false,
			error,
		});
	});

	it("should preserve the original error reference", () => {
		const error = new Error("Request failed");
		const result = ErrOf(error);

		expect(result.ok).toBe(false);

		if (!result.ok) {
			expect(result.error).toBe(error);
		}
	});

	it("should support numeric error values", () => {
		const result = ErrOf(404);

		expect(result).toEqual({
			ok: false,
			error: 404,
		});
	});
});
