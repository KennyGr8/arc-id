export interface CreateLocalAccountDTO {
  identityId?: string
  email: string
  passwordHash: string
  passwordAlgorithm?: string
  passwordUpdatedAt?: Date
}

export interface UpdateLocalAccountDTO {
  password?: string
  passwordAlgorithm?: string
}
