# API Layer Strategy

## Overview
The API layer acts as the bridge between the frontend application and the backend services. A well-architected API layer ensures that components remain agnostic of networking logic, errors are handled consistently, and data conforms to expected TypeScript shapes.

## Architecture

### 1. Centralized API Client
- **Tooling:** Axios or native `fetch` with a wrapper.
- **Configuration:** A singleton instance configured with the base URL, default headers (e.g., `Content-Type: application/json`), and timeout settings.

### 2. Request & Response Interceptors
- **Request Interceptor:**
  - Automatically attaches the Authentication Token (Bearer token) to outgoing requests if available.
  - Can append localization headers based on user preferences.
- **Response Interceptor:**
  - Globally intercepts specific HTTP status codes.
  - `401 Unauthorized`: Automatically trigger a token refresh flow or redirect the user to `/login`.
  - `403 Forbidden`: Redirect to an error page or show a generic "Access Denied" toast.
  - `500+ Server Errors`: Log the error to a monitoring service (e.g., Sentry) and show a generic fallback message.

### 3. Services / Repositories Layer
- UI components should NEVER call `axios.get('/api/transactions')` directly.
- Instead, API calls are abstracted into Service modules organized by feature.
- Example:
  ```typescript
  // src/features/transactions/api/transactionService.ts
  export const fetchTransactions = async (filters: TransactionFilters): Promise<Transaction[]> => {
    const response = await apiClient.get('/transactions', { params: filters });
    return response.data;
  };
  ```

### 4. DTOs (Data Transfer Objects)
- Define strict TypeScript interfaces for API requests and responses.
- If the backend returns data in a format unsuitable for the UI (e.g., snake_case properties or complex nested objects), the Service layer is responsible for mapping/transforming the response into the frontend domain model before it reaches the UI components.

### 5. Error Handling
- Use standardized Error objects.
- Create a reusable `handleApiError(error)` utility that parses Axios errors and extracts user-friendly messages provided by the backend, falling back to a generic message if the backend fails silently.

### 6. Retry Strategy
- Utilize the server-state library (React Query/SWR) to handle exponential backoff and retry logic for transient network failures (e.g., 502 Bad Gateway or network timeouts).
- Idempotent requests (GET, PUT, DELETE) can be retried automatically. Non-idempotent requests (POST) should require manual user retry.
