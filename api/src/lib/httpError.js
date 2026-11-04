// Create an error that carries an HTTP status. The error handler turns it into a JSON reply.
export const httpError = (status, message) => Object.assign(new Error(message), { status });
