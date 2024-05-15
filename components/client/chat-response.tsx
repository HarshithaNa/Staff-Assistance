// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const ChatResponse = ({
//   dataResponse,
// }: {
//   dataResponse: { [key: string]: any }[];
// }) => {
//   console.log(dataResponse);
//   if (!dataResponse || dataResponse.length === 0) {
//     return <div>No data available</div>;
//   }

//   const chatResponse = Object.keys(dataResponse[0]);

//   return (
//     <>
//       <div className="py-1 border rounded-md border-[#B3A3FA] grid">
//         <Table className="min-w-full divide-y divide-gray-200 grid-cols-3">
//           <TableHeader className="bg-black">
//             <TableRow>
//               {chatResponse.map((key) => (
//                 <TableHead
//                   key={key}
//                   className="px-6 py-3 text-left text-xs font-medium text-[#B3A3FA] uppercase tracking-wider grid-cols-1"
//                 >
//                   {key}
//                 </TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody className="bg-black divide-y divide-gray-50 grid-cols-3">
//             {dataResponse.map((item, index) => (
//               <TableRow className="bg-black-100" key={index}>
//                 {chatResponse.map((key) => (
//                   <TableCell
//                     key={`${index}-${key}`}
//                     className="px-6 py-4 whitespace-nowrap text-white grid-cols-1"
//                   >
//                     {Array.isArray(item[key]) ? (
//                       <ul>
//                         {item[key].map(
//                           (subItem: string | number, subIndex: number) => (
//                             <li key={`${index}-${key}-${subIndex}`}>
//                               {subItem}
//                             </li>
//                           )
//                         )}
//                       </ul>
//                     ) : (
//                       item[key]
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="py-4 whitespace-nowrap text-white text-sm">
//         Do you want to freeze the list?
//       </div>
//     </>
//   );
// };

// export default ChatResponse;

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Spinner from "../ui/spinner";
import { Button } from "../ui/button";
import Image from "next/image";
import { Watch } from "lucide-react";
import { CHAT_THEME } from "@/constants/chat-theme";

const ChatResponse = ({
  dataResponse,
}: {
  dataResponse: { [key: string]: any }[];
}) => {
  console.log(dataResponse);
  if (!dataResponse || dataResponse.length === 0) {
    return <div>No data available</div>;
  }
  // const chatResponse = Object.keys(dataResponse[0]);
  return (
    <div className="pt-4 inline-block" style={{ display: 'flex', minWidth: '1000px'}}>
      {!dataResponse.length ? (
        <Spinner />
      ) : (
        <div className=" border rounded-md border-[#B3A3FA] inline-block">
          <header className="flex justify-between items-center">
            <div className="flex gap-8">
            </div>
          </header>
          <main className="border border-[#B3A3FA] rounded-md pt-8 relative">
            <ul role="list">
              {dataResponse?.map((item: any, index) => (
                <li key={`${item}-${index + 1}`} role="list-item ">
                  <div className="p-4 border-b border-[#b3a3fa26]">
                    <h3 className="text-[#B3A3FA] pl-12">{item.title}</h3>
                    <div className="mt-4 grid grid-cols-3 text-white items-center text-center" style={{display:'flex',gap:'200px'}}>
                      <div className="flex items-center gap-4 pl-12" style={{width:'300px'}}>
                        <Image
                          alt=""
                          src="/avatar.svg"
                          width={48}
                          height={48}
                          style={{ width: "3rem", height: "3rem" }}
                        />
                        <p className="text-left text-base font-medium" style={{overflowWrap: "break-word"}}>
                          {item.name}
                        </p>
                      </div>
                      <p className="text-left text-base text-[#C8C8C8] pl-20 min-w-fit">
                        {item.title}
                      </p>
                      {/* TODO: Add Later */}
                      {/* <p className="text-sm text-[#9DA8B8] flex items-center justify-center gap-2">
                        <span>
                          <Suitcase />
                        </span>
                        16y 9m
                      </p> */}
                      {/* <div className="flex items-center justify-center gap-4">
                        <Watch />
                        <div className="bg-[#B3A3FA29] w-[120px] h-2.5 rounded">
                          <div
                            className="h-full bg-[#6E659A] rounded"
                            style={{ width: `${item.allocation}` }}
                          ></div>
                        </div>
                        <span className="text-sm text-[#9DA8B8]">
                          {item.allocation}
                        </span>
                      </div> */}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </main>
        </div>
      )}
      </div>
  );
};
export default ChatResponse;
