import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "outline" | "solid";
{/*children heweh mehtawa mawjud bi aleb button <button><Icon>Get started</button/> w fi ykun 8er text  */}
{/*ComponentPropsWithoutRef haydi ye3ni enu fina nzid aa button maslan bi alba <Button disabled or type="submit" */}
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
{/*ye3ni variantClass rahh tjib variant w terbetu ma3 css te3u  ha tjib variant:primary
	w primary:"btn-primary" w ysir 3na <Primary,btn-primary> tfatech aalaya bi css " */}

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
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
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
