"use client";

import Link from "next/link";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  ghost: "btn btn-ghost",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  loading = false,
  disabled = false,
  children,
  className = "",
  type = "button",
  target,
  rel,
}: ButtonProps) {
  const classes = [
    variantClasses[variant],
    sizeClasses[size],
    (disabled || loading) ? "opacity-60 cursor-not-allowed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {loading ? "Loading..." : children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
