export interface PolicyContext extends Record<string, unknown> {
  userId?: string;
  roleName?: string;
  roleId?: string;
  permissions?: string[] | string;
  email?: string;
  featureFlags?: string[]; // future implementation
}

export interface PolicyResult {
  name: string;
  allowed: boolean;
  reason?: string;
}

export abstract class Policy {
  constructor(
    public readonly name: string,
    public readonly description: string
  ) {}

  abstract can(context: PolicyContext): Promise<PolicyResult> | PolicyResult;

  protected allowed(): PolicyResult {
    return {
      allowed: true,
      name: this.name,
      reason: 'Access granted',
    };
  }

  protected denied(reason?: string): PolicyResult {
    return {
      allowed: false,
      name: this.name,
      reason: reason || 'Access denied',
    };
  }
}
