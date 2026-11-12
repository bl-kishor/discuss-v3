"use client";
import { startTransition, useActionState } from "react";
import {
  Button,
  FieldError,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TextArea,
  TextField,
} from "@heroui/react";
import * as actions from "@/actions";
import FormButton from "../common/form-button";

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, action, isPending] = useActionState(
    actions.createPost.bind(null, slug),
    {
      errors: {},
    },
  );

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="primary">Create Post</Button>
      </PopoverTrigger>
      <PopoverContent placement="left">
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4 p-4 m-1 w-80">
            <h3 className="text-lg">Create a post</h3>
            <TextField isInvalid={!!formState.errors?.title}>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Title" />
              <FieldError>{formState.errors?.title?.join(", ")}</FieldError>
            </TextField>
            <TextField isInvalid={!!formState.errors?.content}>
              <Label htmlFor="content">Content</Label>
              <TextArea id="content" name="content" placeholder="Content" />
              <FieldError>{formState.errors?.content?.join(", ")}</FieldError>
            </TextField>
            {!!formState.errors?._form && (
              <div className="border rounded p-2 bg-red-200 border-red-400">
                {formState.errors?._form}
              </div>
            )}

            <FormButton isLoading={isPending}>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
