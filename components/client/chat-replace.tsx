import Image from "next/image";

  const ChatReplace = ({name,feedback,techStack} : {name: String, feedback:String, techStack: []}) => {
    return (
       <>
        <div className="mt-4  border-2 border-[#B3A3FA] rounded-md inline-block">
        <div className="p-4 border-b border-[#b3a3fa26]">
          <div className="flex justify-between text-white items-center text-center ">
            <div className="flex items-center gap-4">
              <Image
                alt=""
                src="/avatar.svg"
                width={56}
                height={56}
                style={{ width: "3.5rem", height: "3.5rem" }}
              />
              <div>
                <p className="text-left text-base font-medium">{name}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex text-[#C8C8C8]">
          <div className="p-4 w-1/4 border-r border-[#b3a3fa26] flex flex-col gap-6 min-w-36">
            <p>Skill sets</p>
            {feedback && <p>Feedback</p>}
          </div>
          <div className="p-4 w-full flex flex-col gap-6">
            <div className="flex gap-2 min-w-36">
              {techStack
              // .map((stack: string) => (
              //   <span
              //     key={`${stack}`}
              //     className="px-3 bg-[#6846F626] rounded-md"
              //   >
              //     {stack}
              //   </span>
              // ))
              }
            </div>
            {feedback && <p>{feedback}</p>}
          </div>
        </div>
      </div>
      <div className="py-4 whitespace-nowrap text-white text-sm">
        Do you want to freeze the list? Yes/No
      </div>
      </>
    
    )

  }

  export default ChatReplace;