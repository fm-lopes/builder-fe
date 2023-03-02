import { format } from 'date-fns';

export default function DateText({
  value
}: {
  value: string
}) {
  const date = new Date(value);
  return <span>{format(date, 'dd/MM HH:mm')}</span>;
}