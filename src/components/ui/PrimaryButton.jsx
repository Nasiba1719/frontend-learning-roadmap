export function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background shadow-sm transition hover:bg-zinc-900 dark:hover:bg-zinc-100 dark:hover:text-black ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}


