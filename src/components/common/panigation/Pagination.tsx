import React, { useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
type Props = {
  totalPage: number;
};

const Pagination = ({ totalPage }: Props) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { push } = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <nav className="flex w-full justify-center my-10">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            onClick={() => {
              page > 1 &&
                push(
                  `${pathname}?${createQueryString(
                    "page",
                    (page - 1).toString()
                  )}`
                );
            }}
            className={`flex items-center justify-center px-3 h-10 m-1 rounded-md bg-[#696969]/20 hover:bg-accent-green hover:text-white text-[#78909c] ${
              page <= 1 &&
              "!bg-[#696969]/40 hover:!bg-[#696969]/40 !text-gray-300/40 hover:!text-gray-300/40"
            }`}
            disabled={page <= 1 ? true : false}
          >
            Previous
          </button>
        </li>

        {[...Array(totalPage)].map((_, index) =>
          index + 1 === 1 ||
          index + 1 === page - 1 ||
          index + 1 === page ||
          index + 1 === page + 1 ||
          index + 1 === page + 2 ||
          index + 1 === totalPage / 2 ||
          index + 1 === totalPage ? (
            <li key={index}>
              <button
                className={`flex items-center justify-center w-10 h-10 rounded-md m-1 font-bold ${
                  page === index + 1
                    ? "text-white bg-accent-red"
                    : "bg-[#696969]/20 hover:bg-accent-green hover:text-white text-[#78909c]"
                }`}
                onClick={() => {
                  push(
                    `${pathname}?${createQueryString(
                      "page",
                      (index + 1).toString()
                    )}`
                  );
                }}
              >
                {index + 1}
              </button>
            </li>
          ) : (
            ""
          )
        )}

        <li>
          <button
            onClick={() => {
              page < totalPage &&
                push(
                  `${pathname}?${createQueryString(
                    "page",
                    (page + 1).toString()
                  )}`
                );
            }}
            className={`flex items-center justify-center px-3 h-10 m-1 rounded-md bg-[#696969]/20 hover:bg-accent-green hover:text-white text-[#78909c] ${
              page >= totalPage &&
              "!bg-[#696969]/40 hover:!bg-[#696969]/40 !text-gray-300/40 hover:!text-gray-300/40"
            }`}
            disabled={page >= totalPage ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
