"use client";

import { cn } from "@/lib/utils";
import { CHAT_THEME } from "@/constants/chat-theme";
import Bot from "@/public/bot.svg";
import Send from "@/public/send.svg";
import {
  checkForReplaceKeyword,
  checkForYesKeyword,
  fetchTeamList,
  filterProjects,
  freezeTeamList,
  getAllProjectsList,
  initiateProjectAllocation,
  sendSecondaryPrompt,
} from "@/utils/chatInterface";
import { hasAdminAccess } from "@/utils/hasAdminAccess";
import { fetchUserDetails } from "@/utils/user";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Spinner from "../ui/spinner";
import AdminPopUp from "./AdminPopUp";
import Loading from "./Loading";
import ChatReplace from "./chat-replace";
import ChatResponse from "./chat-response";

const ChatInterface = () => {
  const [chatMessages, setChatMessages] = useState<Array<any>>([
    {
      isBot: true,
      message: "Hello there, How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [promptResponse, setPromptResponse] = useState<any>(null);
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const { data: session } = useSession();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [projects, setProjects] = useState<any>(null);
  const [selectedProjects, setSelectedProjects] = useState<any>({});
  const [initiatedPRoject, setInitiatedProject] = useState<any>({});
  const [replaceMember, setReplaceMember] = useState<any>({});
  const [newMember, setNewMember] = useState<any>({});
  const [viewList, setViewList] = useState<any>({});
  const [requestType, setRequestType] = useState<String | null>(null);
  const inputRef = useRef(null);
  const fetchData = useCallback(async () => {
    try {
      const userDetailsData = await fetchUserDetails();
      setIsAdmin(hasAdminAccess(userDetailsData?.role));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, []);

  const fetcProjects = useCallback(async () => {
    try {
      const projectsList = await getAllProjectsList();
      setProjects(projectsList.result);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();

    fetcProjects();
  }, [fetchData, fetcProjects]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    document.addEventListener("keydown", checkEnterKeyPress);

    return () => {
      document.removeEventListener("keydown", checkEnterKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkEnterKeyPress = (event: KeyboardEvent) => {
    if (event.key !== "Enter") return;

    submitButtonRef.current?.click();
  };

  const handleSubmitChat = async () => {
    
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    const selectedProject = filterProjects(projects, message);

    setChatMessages((prev) => [
      ...prev,
      {
        isBot: false,
        message,
      },
    ]);

    setIsResponseLoading(true);

    let response = "";

    if (selectedProject?.[0]) {
      setSelectedProjects(selectedProject);

      response = await initiateProjectAllocation(selectedProject?.[0]?._id);
      setInitiatedProject(response);

      setChatMessages((prev) => [
        ...prev,
        {
          isBot: true,
          message: "Absolutely! Here is a result:",
          result: response,
          type: "initial_allocation",
        },
      ]);
    }

    if (checkForReplaceKeyword(message)) {
      const response = await sendSecondaryPrompt(selectedProjects?.[0]?._id, {
        engineering_team: {
          team_structure: initiatedPRoject?.engineering_team?.team_structure,
        },
        tech_stacks: initiatedPRoject?.tech_stacks,
        employee_name_to_replace_prompt: message,
      });

      setReplaceMember(response);
      setChatMessages((prev) => [
        ...prev,
        {
          isBot: true,
          message: "Absolutely! Here is a result:",
          result: response,
          type: "replace",
        },
      ]);

      setPromptResponse(response);
    }

    if (checkForYesKeyword(message)) {
      const newTeam = initiatedPRoject?.engineering_team?.team_structure.map(
        (employee) => {
          const employeeName = employee.name.toLowerCase();

          const oldEmployeeName =
            replaceMember?.old_employee.employee_name.toLowerCase();

          return employeeName === oldEmployeeName
            ? {
                title: employee.title,
                name: replaceMember.new_employee.employee_name,

                allocation: employee.allocation,
              }
            : employee;
        }
      );
      // setInitiatedProject(newTeam);
      setNewMember(newTeam);

      // await freezeTeamList(selectedProjects?.[0]?._id, newTeam);

      const freezedList = await fetchTeamList(selectedProjects?.[0]?._id);
      setViewList(viewList);

      setChatMessages((prev) => [
        ...prev,
        {
          isBot: true,
          message: "Awesome! Team is freezed:",
          result: freezedList,
          type: "view",
        },
      ]);
    }

    setPromptResponse(response);

    setMessage("");
    setIsResponseLoading(false);
  };

  const handleMessageFromUser = (event) => {
    event.preventDefault();
    setMessage(event.target.value);
  };
  console.log(chatMessages);
  return isAdmin === null ? (
    <Loading />
  ) : isAdmin ? (
    <div>
      <div className=" bg-stone-950 bottom-0 h-screen absolute left-24 right-1">
        <div
          ref={messagesContainerRef}
          className="px-6 pt-6 pb-24 flex flex-col gap-8 overflow-y-auto h-full"
        >
          {chatMessages.map((chatItem, index) => (
            <div
              className={`flex gap-4 ${!chatItem.result && "items-center"}`}
              key={`message-${index + 1}`}
            >
              <span>
                {chatItem.isBot ? (
                  <Bot />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full flex justify-center items-center text-lg uppercase"
                    style={{
                      backgroundColor: CHAT_THEME.USER_ICON_BACKGROUND_COLOR,
                      color: CHAT_THEME.USER_ICON_FONT_COLOR,
                    }}
                  >
                    {session?.user?.name?.charAt(0)}
                  </div>
                )}
              </span>

              <div className="w-full">
                <p style={{ color: CHAT_THEME.CHAT_MESSAGE_COLOR }}>
                  {chatItem.message}
                </p>

                {chatItem.result && (
                  <div className="">
                    {/* <div className="text-[#B3A3FA] my-5">
                      {chatItem?.message}
                    </div> */}

                    {chatItem?.type === "initial_allocation" ? (
                      <ChatResponse
                        dataResponse={
                          chatItem?.result?.engineering_team?.team_structure
                        }
                      />
                    ) : chatItem?.type === "replace" ? (
                      <ChatReplace
                        name={chatItem.result.new_employee.employee_name}
                        feedback={
                          chatItem.result.manager_rating
                            ? chatItem.result.manager_rating
                            : chatItem.result.feedback
                        }
                        techStack={chatItem.result.new_employee.tech_stack}
                      />
                    ) : (
                      <ChatResponse dataResponse={chatItem?.result} />
                    )}

                    {/* <TableView dataResponse={promptResponse.result}/> */}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isResponseLoading && (
            <div className="flex gap-4">
              <Bot />
              <Spinner />
            </div>
          )}
        </div>

        <div className=" flex justify-center absolute bottom-6 left-12 right-5">
           <div className="max-w-[75%] bg-stone-950 w-full flex justify-end items-center p-1.5 pl-4 rounded-xl border border-solid border-[#B3A3FA]">
              <input
                autoFocus
                className="w-full bg-stone-950 border-none outline-none text-white placeholder-[#6B7B94]  "
                placeholder="Type here..."
                type="text"
                ref={inputRef}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
              ref={submitButtonRef}
              className={cn("p-2.5 rounded-lg", {
                "bg-gray-400": isResponseLoading,
                "bg-[#6846F6]": !isResponseLoading,
              })}
              type="submit"
              onClick={handleSubmitChat}
              disabled={isResponseLoading ? true : false}
            >
                <Send />
              </button>
            </div>
        </div>
      </div>
    </div>
  ) : (
    <AdminPopUp />
  );
};

export default ChatInterface;
