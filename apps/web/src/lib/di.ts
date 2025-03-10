import { MarketService } from '@repo/backend-services';
import { container } from '@repo/core/container';

export const marketService = container.resolve(MarketService);
