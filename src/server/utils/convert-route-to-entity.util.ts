const mapping: Record<string, string> = {
  bookings: 'booking',
  'booking-managers': 'booking_manager',
  companies: 'company',
  users: 'user',
  'van-cars': 'van_car',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
