"use client";

import { Button, Spinner } from "@heroui/react";

interface FormButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
  variant?: "primary" | "tertiary";
}

export default function FormButton({
  children,
  isLoading,
  variant = "tertiary",
}: FormButtonProps) {
  return (
    <Button
      type="submit"
      isPending={isLoading}
      className="w-full p-2"
      variant={variant}
    >
      {isLoading ? <Spinner color="current" size="md" /> : children}
    </Button>
  );
}
