interface IUser {
  id: string
  userName: string
  normalizedUserName: string
  email: string
  normalizedEmail: string
  emailConfirmed: boolean
  passwordHash: string
  securityStamp: string
  concurrencyStamp: string
  // phoneNumber?: string | null; // Optional phone number
  phoneNumberConfirmed: boolean
  twoFactorEnabled: boolean
  lockoutEnabled: boolean
  accessFailedCount: number
}

interface IUserProfile {
  id: string
  userName: string
  email: string
  phoneNumber: string
  twoFactorEnabled: boolean
  lockoutEnabled: boolean
  fullName: string
  role: string[]
  balance: number
  profilePictureUrl: string
}

interface IUpdateProfile {
  fullName: string
  profilePictureUrl: string
  phoneNumber: string
}
