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
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-e-0 rounded-s-lg bg-black border-gray-700 hover:bg-gray-900 hover:text-gray-300 text-textColor ${
              page <= 1 &&
              "!bg-black/40 hover:!bg-black/40 !text-gray-300/40 hover:!text-gray-300/40"
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
                className={`flex items-center justify-center px-3 h-8 leading-tight border  ${
                  page === index + 1
                    ? "hover:text-blue-300 text-blue-400 border border-gray-700 bg-blue-50 hover:bg-blue-100 hover:text-blue-70"
                    : "bg-black border-gray-700 hover:bg-gray-900 hover:text-gray-300 text-gray"
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
            className={`flex items-center justify-center px-3 h-8 me-0 leading-tight border rounded-e-lg bg-black border-gray-700 hover:bg-gray-900 hover:text-gray-300 text-textColor ${
              page >= totalPage &&
              "!bg-black/40 hover:!bg-black/40 !text-gray-300/40 hover:!text-gray-300/40"
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
