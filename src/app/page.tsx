"use client";
import Aside from "@/components/aside/Aside";
import Carousel from "@/components/carousel/Carousel";
import Container from "@/components/common/container/Container";
import Item from "@/components/common/item/Item";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import useSWR, { Fetcher } from "swr";
const api_key = "009740acc09bd10104aa9686ff97c961";
export default function Home() {
  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/now_playing?language=vi&page=1&api_key=${api_key}`,
    fetcher
  );

  return (
    <main className="bg-[#263238]">
      <Header />
      <Container>
        <div className="bg-black/60 p-5 table rounded-md">
          <main className="pr-5 w-full table-cell align-top">
            <Carousel />

            <section>
              <h2 className="bg-accent-red p-2 my-5 uppercase w-max rounded-lg">
                Mới cập nhật
              </h2>
              <ul className="w-full grid grid-cols-4 gap-5">
                {data?.results.map((movie: any) => (
                  <li key={movie.id}>
                    <Item movie={movie} />
                  </li>
                ))}
              </ul>
            </section>
          </main>
          <Aside />
        </div>
      </Container>
      <Footer />
    </main>
  );
}
