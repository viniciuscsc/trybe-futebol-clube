export type ServiceMessage = { message: string };

export type ServiceResponseError = {
  // unauthorized | not_found | conflict | invalid_data
  statusCode: 401 | 404 | 409 | 422,
  data: ServiceMessage,
};

export type ServiceResponseSuccess<T> = {
  statusCode: 200,
  data: T,
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
