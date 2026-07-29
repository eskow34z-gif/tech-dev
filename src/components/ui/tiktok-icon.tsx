export function TikTokIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M16.6 5.82c-.9-.98-1.39-2.26-1.39-3.58h-3.05v13.9c0 1.5-1.22 2.72-2.72 2.72a2.72 2.72 0 0 1 0-5.44c.28 0 .55.04.8.12V10.5a5.77 5.77 0 0 0-.8-.06 5.79 5.79 0 1 0 5.79 5.79V9.06a8.62 8.62 0 0 0 5.03 1.61V7.62a5.6 5.6 0 0 1-3.66-1.8z" />
    </svg>
  );
}
