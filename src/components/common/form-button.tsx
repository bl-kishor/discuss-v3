"use client";

import { Button, Spinner } from "@heroui/react";

interface FormButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export default function FormButton({ children, isLoading }: FormButtonProps) {
  return (
    <Button
      type="submit"
      isPending={isLoading}
      className="w-full p-2"
      variant="tertiary"
    >
      {isLoading ? <Spinner color="current" size="md" /> : children}
    </Button>
  );
}
