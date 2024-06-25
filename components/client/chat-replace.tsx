import Image from "next/image";
import Spinner from "../ui/spinner";

const ChatResponse = ({
  dataResponse,
}: {
  dataResponse: { [key: string]: any }[];
}) => {
  if (!dataResponse || dataResponse.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <div
        className="pt-4 inline-block"
        style={{ display: "flex", minWidth: "1000px" }}
      >
        {!dataResponse.length ? (
          <Spinner />
        ) : (
          <div className="inline-block">
            <header className="flex justify-between items-center">
              <div className="flex gap-8"></div>
            </header>
            <main className="pt-2 relative">
              <ul role="list">
                {dataResponse?.map((item: any, index) => (
                  <li key={`${item}-${index + 1}`} role="list-item ">
                    <div className="pl-2 pt-2 pb-4 border-b border-[#b3a3fa26]">
                      <div
                        className="mt-4 grid grid-cols-3 text-white items-center text-center"
                        style={{ display: "flex", gap: "200px" }}
                      >
                        <div
                          className="flex items-center gap-4 pl-2"
                          style={{ width: "300px" }}
                        >
                          <Image
                            alt=""
                            src="/avatar.svg"
                            width={48}
                            height={48}
                            style={{ width: "3rem", height: "3rem" }}
                          />
                          <p
                            className="text-left text-base font-medium"
                            style={{ overflowWrap: "break-word" }}
                          >
                            {item.name}
                          </p>
                        </div>
                        <p className="text-left text-base text-[#C8C8C8] pl-20 min-w-fit">
                          {item.title}
                        </p>

                        <div>
                          {/* {item.allocation.map((all: any) => {
                              <span className="text-sm text-[#9DA8B8]">
                                {all}
                              </span>;
                            })} */}
                          {item.allocation.length > 1 && (
                            <div>
                              <span
                                className="pl-2 pr-2"
                                style={{
                                  height: "10px",
                                  width: "auto",
                                  backgroundColor: "#A19ABD",
                                  borderRadius: "4px",
                                }}
                              >
                                {item.allocation[0]}
                              </span>
                              <span
                                className="pl-2 pr-2"
                                style={{
                                  height: "10px",
                                  width: "auto",
                                  backgroundColor: "#A19ABD",
                                  borderRadius: "4px",
                                }}
                              >
                                {item.allocation[1]}{" "}
                              </span>
                              <span
                                className="pl-2 pr-2"
                                style={{
                                  height: "10px",
                                  width: "auto",
                                  backgroundColor: "#A19ABD",
                                  borderRadius: "4px",
                                }}
                              >
                                {item.allocation[2]}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* TODO: Add Later */}
                        {/* <p className="text-sm text-[#9DA8B8] flex items-center justify-center gap-2">
                        <span>
                          <Suitcase />
                        </span>
                        16y 9m
                      </p> */}
                        <div className="flex items-center justify-center gap-4">
                          {/* <span className="text-sm text-[#9DA8B8]">
                              {item.allocation[0]}
                              </span>
                              <span className="text-sm text-[#9DA8B8]">
                              {item.allocation[1]}
                              </span>
                              <span className="text-sm text-[#9DA8B8]">
                              {item.allocation[2]}
                              </span> */}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </main>
          </div>
        )}
      </div>
    </div>
  );
};
export default ChatResponse;
