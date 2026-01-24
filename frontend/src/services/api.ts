const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

interface ApiResponse<T> {
  data: T;
  message?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

// Auth endpoints
export const login = (email: string, password: string) =>
  apiClient.post('/auth/login', { email, password });

export const refreshToken = (refreshToken: string) =>
  apiClient.post('/auth/refresh', { refreshToken });

export const getProfile = () => apiClient.get('/auth/profile');

// User endpoints
export const getUsers = () => apiClient.get('/users');

export const createUser = (userData: any) => apiClient.post('/users', userData);

export const updateUser = (id: string, userData: any) =>
  apiClient.patch(`/users/${id}`, userData);

export const getAvailableDrivers = () => apiClient.get('/users/drivers/available');

// Company endpoints
export const getCompanies = () => apiClient.get('/companies');

export const getCompanyById = (id: string) => apiClient.get(`/companies/${id}`);

export const createCompany = (companyData: any) => apiClient.post('/companies', companyData);

export const updateCompany = (id: string, companyData: any) =>
  apiClient.patch(`/companies/${id}`, companyData);

// Vehicle endpoints
export const getVehicles = () => apiClient.get('/vehicles');

export const getVehicleById = (id: string) => apiClient.get(`/vehicles/${id}`);

export const createVehicle = (vehicleData: any) => apiClient.post('/vehicles', vehicleData);

export const updateVehicle = (id: string, vehicleData: any) =>
  apiClient.patch(`/vehicles/${id}`, vehicleData);

// Trip endpoints
export const getTrips = () => apiClient.get('/trips');

export const getTripById = (id: string) => apiClient.get(`/trips/${id}`);

export const createTrip = (tripData: any) => apiClient.post('/trips', tripData);

export const updateTrip = (id: string, tripData: any) =>
  apiClient.patch(`/trips/${id}`, tripData);

// Service requests
export const getServiceRequests = () => apiClient.get('/service-requests');

export const createServiceRequest = (requestData: any) =>
  apiClient.post('/service-requests', requestData);

// Reports
export const getReports = () => apiClient.get('/reports');