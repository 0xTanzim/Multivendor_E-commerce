'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { isPermission } from '@repo/types';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useRbac } from './RbacContext';

// Define form schema with Zod
const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(50, {
      message: 'Name must not exceed 50 characters.',
    }),
  description: z
    .string()
    .max(200, {
      message: 'Description must not exceed 200 characters.',
    })
    .optional(),
  permissionGroupId: z.string().optional(),
  action: z
    .string()
    .min(1, {
      message: 'Action is required.',
    })
    .max(50, {
      message: 'Action must not exceed 50 characters.',
    }),
  resource: z
    .string()
    .min(1, {
      message: 'Resource is required.',
    })
    .max(50, {
      message: 'Resource must not exceed 50 characters.',
    }),
});

interface PermissionFormDialogProps {
  mode: 'create' | 'edit';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PermissionFormDialog = ({
  mode,
  open,
  onOpenChange,
}: PermissionFormDialogProps) => {
  const {
    selectedPermission,
    permissions,
    permissionGroups,
    setPermissions,
    setError,
  } = useRbac();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const title = mode === 'create' ? 'Create Permission' : 'Edit Permission';
  const description =
    mode === 'create'
      ? 'Create a new permission that can be assigned to roles.'
      : 'Update the details of this permission.';
  const submitButtonText = mode === 'create' ? 'Create' : 'Save Changes';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selectedPermission?.name || '',
      description: selectedPermission?.description || '',
      permissionGroupId: selectedPermission?.permissionGroupId || undefined,
      action: selectedPermission?.action || '',
      resource: selectedPermission?.resource || '',
    },
  });

  // Reset form values when selectedPermission changes or dialog opens in edit mode
  useEffect(() => {
    if (open && mode === 'edit' && selectedPermission) {
      form.reset({
        name: selectedPermission.name || '',
        description: selectedPermission.description || '',
        permissionGroupId: selectedPermission.permissionGroupId || undefined,
        action: selectedPermission.action || '',
        resource: selectedPermission.resource || '',
      });
    } else if (open && mode === 'create') {
      form.reset({
        name: '',
        description: '',
        permissionGroupId: undefined,
        action: '',
        resource: '',
      });
    }
  }, [open, mode, selectedPermission, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      const url =
        mode === 'create'
          ? '/api/permissions'
          : `/api/permissions/${selectedPermission?.id}`;

      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Failed to ${mode} permission`);
      }

      if (!isPermission(data)) {
        throw new Error('Invalid response data format');
      }

      // Update permissions in state
      if (mode === 'create') {
        setPermissions([...permissions, data]);
      } else {
        setPermissions(
          permissions.map((permission) =>
            permission.id === data.id ? data : permission
          )
        );
      }

      toast.success(
        `Permission ${mode === 'create' ? 'created' : 'updated'} successfully.`
      );

      onOpenChange(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Permission name" {...field} />
                  </FormControl>
                  <FormDescription>
                    A descriptive name for this permission.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="action"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Action</FormLabel>
                  <FormControl>
                    <Input placeholder="Action" {...field} />
                  </FormControl>
                  <FormDescription>
                    The action this permission allows (e.g., 'read', 'write').
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resource</FormLabel>
                  <FormControl>
                    <Input placeholder="Resource" {...field} />
                  </FormControl>
                  <FormDescription>
                    The resource this permission applies to (e.g., 'users').
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the purpose of this permission"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormDescription>
                    A brief description of what this permission allows.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="permissionGroupId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permission Group</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ungrouped">Ungrouped</SelectItem>
                      {permissionGroups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    Group related permissions together for easier management.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {submitButtonText}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionFormDialog;
