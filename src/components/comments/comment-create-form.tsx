"use client";

import { useActionState } from "react";
import { useEffect, useRef, useState } from "react";
import { TextArea, Button, TextField, Label, FieldError } from "@heroui/react";
import FormButton from "@/components/common/form-button";
import * as actions from "@/actions";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action, isPending] = useActionState(
    actions.createComment.bind(null, { postId, parentId }),
    { errors: {} },
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form
      action={action}
      ref={ref}
      className="rounded-xl border border-gray-200 bg-gray-50 p-4"
    >
      <div className="space-y-3">
        <TextField isInvalid={!!formState.errors.content}>
          <Label>Your reply</Label>
          <TextArea
            name="content"
            placeholder="Enter your comment"
            className="min-h-24 resize-y"
          />
          <FieldError>{formState.errors.content?.join(", ")}</FieldError>
        </TextField>

        {formState.errors._form ? (
          <div className="rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}

        <FormButton isLoading={isPending} variant="primary">
          Create Comment
        </FormButton>
      </div>
    </form>
  );

  return (
    <div className="space-y-2">
      <Button size="sm" variant="light" onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
    </div>
  );
}
