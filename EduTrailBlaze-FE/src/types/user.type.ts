interface IUser {
    id: string;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    // phoneNumber?: string | null; // Optional phone number
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnabled: boolean;
    accessFailedCount: number;
  }

  interface IUserProfile {
    id: string
    fullname: string
    balance: number
    profilePictureUrl: string
  }