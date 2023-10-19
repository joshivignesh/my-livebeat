export interface EventCardProps {
  date: string;
  image: ({
    alt: string;
    height?: number;
    url: string;
    width?: number;
  });
  location: string;
  name: string;
}
