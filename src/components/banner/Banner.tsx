import React from "react";

type Props = {};

const Banner = (props: Props) => {
  return (
    <section className="inner_content new_index bg-[url('https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/fgYfch0MGfNEpgzPst49ThKUqA4.jpg')] w-full max-w-[1400px] min-h-[300px] h-[calc(100vh/2.5)] max-h-[360px] bg-cover bg-no-repeat bg-center text-white flex flex-wrap items-start content-start mt-16">
      <div className="max-w-[1400px] w-full flex items-start content-start flex-wrap px-10 py-8">
        <div className="w-full mb-5">
          <h1 className="text-[3em] font-bold">Welcome.</h1>
          <h1 className="text-[2em] font-semibold">
            Millions of movies, TV shows and people to discover. Explore now.
          </h1>
        </div>
        <div className="search w-full">
          {/* <form className="mt-8 relative">
            <TextInput
              theme={{
                field: {
                  input: {
                    base: "w-full !rounded-[30px] h-[46px] leading-[46px] text-[1.1em] px-5",
                  },
                },
              }}
              placeholder="Search for a movie, tv show, person......"
            />
            <Button
              type="submit"
              className="absolute top-0 -right-[1px] !h-[46px] bg-gradient-to-r from-[#1ed5a9] to-[#01b4e4] py-[10px] px-[26px] !rounded-[30px] text-white focus:outline-none focus:shadow-none focus:border-none focus:!ring-0 focus-visible:!ring-0"
            >
              Search
            </Button>
          </form> */}
        </div>
      </div>
    </section>
  );
};

export default Banner;
