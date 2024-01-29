import type { Metadata } from "next";
import { Slug } from "@/types/const";
type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  function isInstance<T extends object>(
    value: string | string[] | number,
    type: T
  ): type is T {
    return Object.values(type).includes(value);
  }

  const title =
    isInstance(params.slug, Slug) && params.slug === "now_playing"
      ? "Danh sách film mới cập nhật"
      : params.slug === "upcoming"
      ? "Danh sách film sắp chiếu"
      : params.slug === "popular"
      ? "Danh sách film phổ biến"
      : "Không tìm thấy kết quả";

  return {
    title: title || "Không tìm thấy kết quả",
  };
}

export default function MovieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
