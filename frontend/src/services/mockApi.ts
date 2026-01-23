import * as mocks from '../mocks/data';

// Re-export structured mocks for backward compatibility
export const site = mocks.site;
export const companiesMockData = (mocks as any).companiesMockData;
export const companiesPage2MockData = (mocks as any).companiesPage2MockData;
export const companyDetailMockData = (mocks as any).companyDetailMockData;
export const companyEditMockData = (mocks as any).companyEditMockData;
export const usersMockData = (mocks as any).usersMockData;
export const usersPage2MockData = (mocks as any).usersPage2MockData;
export const userDetailMockData = (mocks as any).userDetailMockData;
export const userEditMockData = (mocks as any).userEditMockData;
export const vehiclesMockData = (mocks as any).vehiclesMockData;
export const vehicleDetailMockData = (mocks as any).vehicleDetailMockData;
export const vehicleEditMockData = (mocks as any).vehicleEditMockData;
export const tripsMockData = (mocks as any).tripsMockData;
export const reportsMockData = (mocks as any).reportsMockData;
export const paymentMockData = (mocks as any).paymentMockData;
export const complaintsMockData = (mocks as any).complaintsMockData;
export const privacyMockData = (mocks as any).privacyMockData;
export const termsMockData = (mocks as any).termsMockData;
export const logoutMockData = (mocks as any).logoutMockData;
export const loginMockData = (mocks as any).loginMockData;
export const homeMockData = (mocks as any).homeMockData;
export const contactMockData = (mocks as any).contactMockData;
export const driverDashboardMockData = (mocks as any).driverDashboardMockData;
export const companiesMockRaw = (mocks as any).companiesMockRaw;

// Async helpers (simulate network delay)
const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getSite() {
  await wait(50);
  return site;
}

export async function getCompanies() {
  await wait(100);
  return companiesMockData;
}

export async function getCompanyById(id: string) {
  await wait(50);
  return companiesMockData.companies.find((c: any) => String(c.id) === String(id));
}

export async function getUsers() {
  await wait(80);
  return usersMockData;
}

export async function getUserById(id: string) {
  await wait(50);
  return usersMockData.users.find((u: any) => String(u.id) === String(id));
}

export async function getVehicles() {
  await wait(80);
  return vehiclesMockData;
}

export async function getVehicleById(id: string) {
  await wait(50);
  return vehicleDetailMockData; // simplified
}

export async function getTrips() {
  await wait(90);
  return tripsMockData;
}

export async function getTripById(id: string) {
  await wait(50);
  return tripsMockData.trips.find((t: any) => String(t.id) === String(id));
}

export async function getReports() {
  await wait(80);
  return reportsMockData;
}

export function getHtmlMock(name: string) {
  return (mocks as any).htmlMocks?.[name] ?? null;
}

export default {
  getSite,
  getCompanies,
  getCompanyById,
  getUsers,
  getUserById,
  getVehicles,
  getVehicleById,
  getTrips,
  getTripById,
  getReports,
  getHtmlMock,
};
