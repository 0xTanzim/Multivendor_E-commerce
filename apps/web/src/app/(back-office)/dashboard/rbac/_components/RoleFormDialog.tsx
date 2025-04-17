'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { isRole } from '@repo/types';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useRbac } from './RbacContext';

interface RoleFormDialogProps {
  mode: 'create' | 'edit';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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
  isDefault: z.boolean().default(false),
  parentId: z.string().optional().nullable(),
});

const RoleFormDialog = ({ mode, open, onOpenChange }: RoleFormDialogProps) => {
  const { selectedRole, roles, setRoles, setError } = useRbac();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const title = mode === 'create' ? 'Create Role' : 'Edit Role';
  const description =
    mode === 'create'
      ? 'Create a new role to assign to users.'
      : 'Update the details of this role.';
  const submitButtonText = mode === 'create' ? 'Create' : 'Save Changes';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selectedRole?.name || '',
      description: selectedRole?.description || '',
      isDefault: selectedRole?.isDefault || false,
      parentId: selectedRole?.parentId || null,
    },
  });

  // Reset form when selected role changes or dialog opens/closes
  useEffect(() => {
    if (open) {
      form.reset({
        name: selectedRole?.name || '',
        description: selectedRole?.description || '',
        isDefault: selectedRole?.isDefault || false,
        parentId: selectedRole?.parentId || null,
      });
    }
  }, [open, selectedRole, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      const url =
        mode === 'create' ? '/api/roles' : `/api/roles/${selectedRole?.id}`;

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
        throw new Error(data.message || `Failed to ${mode} role`);
      }

      if (!isRole(data)) {
        throw new Error('Invalid response data format');
      }

      // Update roles in state
      if (mode === 'create') {
        const updatedRoles = [...roles, data];
        setRoles(updatedRoles);
      } else {
        const updatedRoles = roles.map((role) =>
          role.id === data.id ? data : role
        );
        setRoles(updatedRoles);
      }

      toast.success(
        `Role ${mode === 'create' ? 'created' : 'updated'} successfully.`
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

  // Function to handle dialog closing
  const handleDialogClose = () => {
    onOpenChange(false);
  };

  // Filter out the current role and its children from potential parent roles
  // to prevent circular references
  const availableParentRoles = roles.filter((role) => {
    // Can't select self as parent
    if (selectedRole && role.id === selectedRole.id) {
      return false;
    }

    // Check if this role is already a child of the selected role (if editing)
    if (selectedRole && mode === 'edit') {
      // This is a simplified check - in a real app, you'd recursively check all children
      return !role.parentId || role.parentId !== selectedRole.id;
    }

    return true;
  });

  // Use a controlled Dialog instead of relying on the onOpenChange prop
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
                    <Input placeholder="Role name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of the role as it will appear in the system.
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
                      placeholder="Describe the purpose of this role"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormDescription>
                    A brief description of what this role is for.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Role</FormLabel>

                  <Select
                    onValueChange={(value) =>
                      field.onChange(value === 'none' ? null : value)
                    }
                    value={field.value ?? 'none'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parent role (optional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">
                        None (Top-level role)
                      </SelectItem>
                      {availableParentRoles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    Assign this role as a child of another role in the
                    hierarchy.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Default Role</FormLabel>
                    <FormDescription>
                      If enabled, new users will be assigned this role by
                      default.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleDialogClose}
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

export default RoleFormDialog;
