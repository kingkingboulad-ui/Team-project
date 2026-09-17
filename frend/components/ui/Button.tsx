
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "outline" | "solid";

type ButtonProps = {
  href?: string;
  variant?: Variant;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<"button">;

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  outline: "btn-outline",
  solid: "btn-solid",
};

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  const classes = `${variantClass[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={
          onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>
        }
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
