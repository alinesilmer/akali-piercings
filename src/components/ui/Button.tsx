import type { ComponentProps, Ref } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Variant = "bare" | "solid" | "line" | "white" | "chip" | "icon" | "link";

type ButtonProps = Omit<ComponentProps<"button">, "ref"> & {
  variant?: Variant;
  size?: "md" | "sm";
  active?: boolean;
  /** Internal route: renders a router link. */
  to?: string;
  /** External address: renders a safe `target=_blank` link. */
  href?: string;
  ref?: Ref<HTMLElement>;
};

export function ExternalLink(props: ComponentProps<"a">) {
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

/**
 * The only button in the app. `bare` keeps just the reset (for cards and tiles that
 * style themselves); every other variant gets the shared look from `components/_button.scss`.
 */
export function Button({
  variant = "bare",
  size = "md",
  active = false,
  to,
  href,
  type = "button",
  className = "",
  ref,
  ...rest
}: ButtonProps) {
  const classes = [
    variant !== "bare" && `btn btn--${variant}`,
    size === "sm" && "btn--sm",
    active && "is-on",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const linkProps = { ...rest, className: classes } as ComponentProps<"a">;

  if (to) return <Link to={to} ref={ref as Ref<HTMLAnchorElement>} {...linkProps} />;
  if (href) return <ExternalLink href={href} ref={ref as Ref<HTMLAnchorElement>} {...linkProps} />;
  return <button type={type} ref={ref as Ref<HTMLButtonElement>} {...rest} className={classes} />;
}

export const MotionButton = motion.create(Button);
