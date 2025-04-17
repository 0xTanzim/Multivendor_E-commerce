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
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { zodResolver } from '@hookform/resolvers/zod';
import { setError, setPermissionGroups } from '@repo/redux';
import { isPermissionGroup } from '@repo/types';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

interface PermissionGroupFormDialogProps {
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
});

const PermissionGroupFormDialog = ({
  mode,
  open,
  onOpenChange,
}: PermissionGroupFormDialogProps) => {
  const dispatch = useAppDispatch();
  const { selectedPermissionGroup, permissionGroups } = useAppSelector(
    (state) => state.rbac
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const title =
    mode === 'create' ? 'Create Permission Group' : 'Edit Permission Group';
  const description =
    mode === 'create'
      ? 'Create a new group to organize related permissions.'
      : 'Update the details of this permission group.';
  const submitButtonText = mode === 'create' ? 'Create' : 'Save Changes';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  // Reset form values when selectedPermissionGroup changes or dialog opens in edit mode
  useEffect(() => {
    if (open && mode === 'edit' && selectedPermissionGroup) {
      form.reset({
        name: selectedPermissionGroup.name || '',
      });
    } else if (open && mode === 'create') {
      form.reset({
        name: '',
      });
    }
  }, [open, mode, selectedPermissionGroup, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      const url =
        mode === 'create'
          ? '/api/permission-groups'
          : `/api/permission-groups/${selectedPermissionGroup?.id}`;

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
        throw new Error(data.message || `Failed to ${mode} permission group`);
      }

      if (!isPermissionGroup(data)) {
        throw new Error('Invalid response data format');
      }

      // Update permission groups in state
      if (mode === 'create') {
        dispatch(setPermissionGroups([...permissionGroups, data]));
      } else {
        dispatch(
          setPermissionGroups(
            permissionGroups.map((group) =>
              group.id === data.id ? data : group
            )
          )
        );
      }

      toast.success(
        `Permission group ${mode === 'create' ? 'created' : 'updated'} successfully.`
      );

      onOpenChange(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch(setError(message));
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
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
                    <Input placeholder="Permission group name" {...field} />
                  </FormControl>
                  <FormDescription>
                    A descriptive name for this group of permissions.
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

export default PermissionGroupFormDialog;
