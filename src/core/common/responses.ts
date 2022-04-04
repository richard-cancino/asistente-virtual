export function resultResponse<T>(
  count: number,
  message: String,
  success: boolean,
  result: T[]
) {
  const response = {
    count,
    message,
    success,
    result,
  };

  return response;
}

export function singleResponse<T>(
  message: string | unknown[],
  success: boolean,
  result: T | null = null
) {
  const response = {
    message,
    success,
    result,
  };

  return response;
}
