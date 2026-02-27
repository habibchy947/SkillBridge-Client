export enum UserRole {
  STUDENT = "STUDENT",
  TUTOR = "TUTOR",
  ADMIN = "ADMIN",
};

export enum UserStatus {
    ACTIVE,
    BANNED
};

export interface GetUsersParams { 
    status?: UserStatus;
    role?: UserRole;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
};