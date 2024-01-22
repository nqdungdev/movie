import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;
  let genre = "";
  switch (id) {
    case "28":
      genre = "Action";
      break;
    case "12":
      genre = "Adventure";
      break;
    case "16":
      genre = "Animation";
      break;
    case "35":
      genre = "Comedy";
      break;
    case "80":
      genre = "Crime";
      break;
    case "99":
      genre = "Documentary";
      break;
    case "18":
      genre = "Drama";
      break;
    case "10751":
      genre = "Family";
      break;
    case "14":
      genre = "Fantasy";
      break;
    case "36":
      genre = "History";
      break;
    case "27":
      genre = "Horror";
      break;
    case "10402":
      genre = "Music";
      break;
    case "9648":
      genre = "Mystery";
      break;
    case "10749":
      genre = "Romance";
      break;
    case "878":
      genre = "Science Fiction";
      break;
    case "10770":
      genre = "TV Movie";
      break;
    case "53":
      genre = "Thriller";
      break;
    case "10752":
      genre = "War";
      break;
    case "37":
      genre = "Western";
      break;

    default:
      break;
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Thể loại ${genre}`,
    openGraph: {
      images: ["/images/vercel.svg", ...previousImages],
    },
  };
}

export default function MovieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
