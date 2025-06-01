import { Market } from '@repo/types';
import { Policy, PolicyContext, PolicyResult } from '../../Policy';

export class MarketDeletePolicy extends Policy {
  constructor() {
    super('MarketDeletePolicy', 'Check if user can delete the market');
  }

  async can(context: PolicyContext): Promise<PolicyResult> {
    const { role, userId, permissions = [], resource, roleName } = context;

    if (!resource) return this.denied('Market not found');

    const isAdmin = roleName?.toLowerCase() === 'admin';
    const isOwner = (resource as Market).ownerId === userId;

    if (!isAdmin && !isOwner) {
      return this.denied('You do not have permission to delete this market');
    }

    if (!permissions.includes('delete:market')) {
      return this.denied('Missing delete:market permission');
    }

    return this.allowed();
  }
}
