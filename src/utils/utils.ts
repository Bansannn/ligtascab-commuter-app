type variant = 'long' | 'short' | 'narrow' | 'numeric' | '2-digit' | undefined;

export function formatDate(dateString: string, variant?: variant): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: variant ? variant : 'short',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
}

export function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  return 'Something went wrong';
}
