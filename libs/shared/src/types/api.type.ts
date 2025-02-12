export type ApiResponse<T> =
  | { success: true; result: T }
  | { success: true }
  | { success: false; result: { error: string } };
