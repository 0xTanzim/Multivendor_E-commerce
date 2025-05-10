import { Market } from '@repo/types';
import { Policy, PolicyContext, PolicyResult } from '../../Policy';

export class MarketUpdatePolicy extends Policy {
  constructor() {
    super('MarketUpdatePolicy', 'Check if user can update the market');
  }

  async can(context: PolicyContext): Promise<PolicyResult> {
    const { role, userId, permissions = [], resource, roleName } = context;

    if (!resource) return this.denied('Market not found');

    const isAdmin = roleName?.toLowerCase() === 'admin';
    const isOwner = (resource as Market).ownerId === userId;

    if (isAdmin) {
      return this.allowed();
    }

    if (!isAdmin && !isOwner)
      return this.denied('No permission to update market');

    if (!(resource as Market).isActive)
      return this.denied('Inactive markets cannot be updated');

    if (!permissions.includes('update:market')) {
      return this.denied('Missing update:market permission');
    }

    return this.allowed();
  }
}
