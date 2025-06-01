import { permissionManagerService } from '@repo/core/pm';
import { Policy, PolicyContext } from '@repo/policies';
import { NextRequest, NextResponse } from 'next/server';
import { authDetails } from '../auth';

interface RequirePolicyOptions {
  resourceFetcher?: (id: string) => Promise<any>;
  paramKey?: string;
  extraContext?: (req: NextRequest) => Promise<Record<string, any>>;
  allowGuest?: boolean;
  useJsonBody?: boolean;
}

function errorResponse(message: string, statusCode: number): NextResponse {
  return NextResponse.json(
    {
      error: message,
      statusCode,
      timestamp: new Date().toISOString(),
    },
    { status: statusCode }
  );
}

export function RequirePolicy(
  policyClass: new () => Policy,
  options: RequirePolicyOptions = {}
) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req: NextRequest = args[0];

      const params = (await args[1]?.params) ?? {};

      const {
        resourceFetcher,
        paramKey = 'id',
        extraContext,
        allowGuest = false,
        useJsonBody = false,
      } = options;

      let userId: string | undefined;
      let roleId: string | undefined;
      let permissions: string[] = [];
      let roleName: string | undefined;

      try {
        // Step 1: Auth handling
        if (!allowGuest) {
          const { userId: uid, roleId: rid, role } = await authDetails();
          if (!uid || !rid) return errorResponse('Unauthorized', 401);
          userId = uid;
          roleId = rid;
          roleName = role ?? undefined;
          permissions = await permissionManagerService.getPermissions(rid);
        }

        // Step 2: Feature details from JSON body (safe clone)
        let featureDetails: Record<string, any> = {};
        if (
          useJsonBody &&
          ['POST', 'PATCH', 'PUT'].includes(req.method) &&
          req.headers.get('content-type')?.includes('application/json')
        ) {
          try {
            const clone = req.clone();
            featureDetails = await clone.json();
          } catch {
            featureDetails = {};
          }
        }

        // Step 3: Fetch resource if needed
        let resource: any = null;
        if (resourceFetcher && paramKey in params) {
          try {
            resource = await resourceFetcher(params[paramKey]);
          } catch {
            return errorResponse('Resource not found or fetch failed', 404);
          }
        }

        // Step 4: Build policy context
        const context: PolicyContext = {
          userId,
          roleId,
          permissions,
          roleName: roleName ?? '',
          resource,
          ...(useJsonBody ? { featureDetails } : {}),
          ...(extraContext ? await extraContext(req) : {}),
        };

        // Step 5: Evaluate policy
        const policy = new policyClass();
        const result = await policy.can(context);

        if (!result.allowed) {
          return errorResponse(result.reason || 'Access denied', 403);
        }

        // Optional logging (add logger.debug/info here if needed)

        return await originalMethod.apply(this, args);
      } catch (err) {
        // Optional: add logger.error here
        return errorResponse('Internal server error during policy check', 500);
      }
    };

    return descriptor;
  };
}
