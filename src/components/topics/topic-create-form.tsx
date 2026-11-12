"use client";

import { useActionState, startTransition } from "react";
import {
  Button,
  FieldError,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TextArea,
  TextField,
} from "@heroui/react";
import * as actions from "@/actions";
import FormButton from "../common/form-button";

export default function TopicCreateForm() {
  const [formState, action, isPending] = useActionState(actions.createTopic, {
    errors: {},
  });

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
        <Button variant="primary">Create Topic</Button>
      </PopoverTrigger>
      <PopoverContent placement="left">
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4 p-4 w-80">
            <TextField isInvalid={!!formState.errors.name}>
              <label htmlFor="topic-name">Name</label>
              <Input
                name="name"
                id="topic-name"
                placeholder="Enter topic name"
                aria-label="Name"
              />
              <FieldError>{formState.errors.name?.join(", ")}</FieldError>
            </TextField>

            <TextField isInvalid={!!formState.errors.description}>
              <label htmlFor="topic-description">Description</label>
              <TextArea
                name="description"
                id="topic-description"
                placeholder="Enter topic description"
                aria-label="Description"
              />
              <FieldError>
                {formState.errors.description?.join(", ")}
              </FieldError>
            </TextField>

            {!!formState.errors._form && (
              <div className="rounded bg-red-200 p-2 border border-red-400">
                {formState.errors._form?.join(", ")}
              </div>
            )}
            <FormButton isLoading={isPending}>Create Topic</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
