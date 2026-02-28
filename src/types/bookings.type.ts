export enum BookingStatus {
  CONFIRMED,
  COMPLETED,
  CANCELLED
}

export interface GetBookingsParams { 
    status?: BookingStatus;
    category?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
};