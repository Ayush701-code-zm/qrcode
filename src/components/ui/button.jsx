import * as React from "react";
import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary: "bg-orange-500 text-white shadow-xs hover:bg-orange-600",
        secondary: "bg-orange-400 text-white shadow-xs hover:bg-orange-500",
        destructive: "bg-red-500 text-white shadow-xs hover:bg-red-600",
        outline:
          "border border-orange-500 text-orange-500 bg-background shadow-xs hover:bg-orange-100",
        ghost: "hover:bg-orange-100 text-orange-500",
        link: "text-orange-500 underline-offset-4 hover:underline",
      },
      size: {
        normal: "h-[3.1215rem] px-4 py-2",
        small: "h-[2.625rem] px-3",
        large: "h-[3.75rem] px-6",
      },
      width: {
        full_width: "w-full",
        auto: "w-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "normal",
      width: "auto",
    },
  }
);

const MainButton = forwardRef(
  (
    {
      text,
      form,
      isLoading = false,
      action,
      disabled = false,
      isSubmitable,
      width = "auto",
      dataLoadingText = "Please wait ...",
      variant = "primary",
      className,
      iconRoute,
      rightIconRoute,
      rightIconClass = "w-[24px] h-[24px]",
      iconComponent,
      size = "normal",
      ...props
    },
    ref
  ) => {
    return !isLoading ? (
      <button
        form={form}
        className={cn(buttonVariants({ variant, size, width, className }))}
        onClick={!disabled ? action : undefined}
        type={isSubmitable ? "submit" : "button"}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {iconRoute && (
          <img src={iconRoute} alt="left icon" className="w-6 h-6" />
        )}
        {iconComponent}
        {text}
        {rightIconRoute && (
          <img
            src={rightIconRoute}
            alt="right icon"
            className={rightIconClass}
          />
        )}
      </button>
    ) : (
      <button
        className={cn(
          buttonVariants({ variant: "primary", size, width, className }),
          "cursor-not-allowed"
        )}
        ref={ref}
        disabled
      >
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {dataLoadingText}
      </button>
    );
  }
);

MainButton.displayName = "MainButton";

export { MainButton, buttonVariants };
