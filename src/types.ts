/**
 * Represents the result of an operation that can either succeed or fail.
 *
 * @example
 * 	const success: Result<number> = {
 * 		ok: true,
 * 		value: 42,
 * 	};
 *
 * @example
 * 	const failure: Result<number> = {
 * 		ok: false,
 * 		error: new Error("Something went wrong"),
 * 	};
 *
 * @template T - The type of the success value.
 * @template E - The type of the error value. Defaults to `Error`.
 */
export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

/**
 * Creates a successful result containing the specified value.
 *
 * @example
 * 	const result = Ok(42);
 *
 * 	if (result.ok) {
 * 		console.log(result.value); // 42
 * 	}
 *
 * @example
 * 	const user = Ok({ id: 1, name: "Alice" });
 *
 * @template T - The type of the success value.
 * @param value - The value to include in the result.
 * @returns A successful result with no possible error value.
 */
export const Ok = <T>(value: T): Result<T, never> => ({
	ok: true,
	value,
});

/**
 * Creates a failed result from an error message.
 *
 * The message is wrapped in a native `Error` instance.
 *
 * @example
 * 	const result = Err("User not found");
 *
 * 	if (!result.ok) {
 * 		console.error(result.error.message); // "User not found"
 * 	}
 *
 * @example
 * 	function findUser(id: number): Result<{ id: number }> {
 * 		if (id <= 0) {
 * 			return Err("Invalid user ID");
 * 		}
 *
 * 		return Ok({ id });
 * 	}
 *
 * @param message - The error message.
 * @returns A failed result containing an `Error` instance.
 */
export const Err = (message: string): Result<never> => ({
	ok: false,
	error: new Error(message),
});

/**
 * Creates a failed result containing an error of any specified type.
 *
 * Unlike `Err`, this function preserves the original error value instead of wrapping it in an
 * `Error` instance.
 *
 * @example
 * 	const result = ErrOf("USER_NOT_FOUND");
 *
 * 	if (!result.ok) {
 * 		console.log(result.error); // "USER_NOT_FOUND"
 * 	}
 *
 * @example
 * 	type ApiError = {
 * 		code: number;
 * 		message: string;
 * 	};
 *
 * 	const result = ErrOf<ApiError>({
 * 		code: 404,
 * 		message: "User not found",
 * 	});
 *
 * 	if (!result.ok) {
 * 		console.log(result.error.code); // 404
 * 	}
 *
 * @template E - The type of the error value.
 * @param error - The error value to include in the result.
 * @returns A failed result containing the specified error.
 */
export const ErrOf = <E>(error: E): Result<never, E> => ({
	ok: false,
	error,
});
