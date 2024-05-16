import { API } from "@/constants/api-routes";
import { PROMPTMESSAGES } from "@/constants/chat-bot";
import team from "../components/mock/team.json";
import { get, post } from "./axios";
import freezeList from "../components/mock/freezeList.json"
import projects from "../components/mock/projects.json"
import replace from "../components/mock/replace.json"

export const sendChatResponse = async (data: {}) => {
  return team;
};

export const sendSecondaryPrompt = async (id: string, data: {}) => {
  return replace;
};

export const getAllProjectsList = async () => {
  return projects;
};

export const filterProjects = (projects:any, message:any) => {
  console.log("message", message);
  const keywords = message.split(/\s+/);
  const matches : any = [];
  projects.forEach((project:any) => {
    const projectName = project.project_name.toLowerCase().replace(/\s/g, "");
    keywords.forEach((keyword:any) => {
      const lowercaseKeyword = keyword.toLowerCase();
      if (projectName === lowercaseKeyword) {
        console.log(projectName + " " + lowercaseKeyword);
        matches.push(project);
      }
    });
  });
  return matches;
};

export const checkForReplaceKeyword = (message:any) => {
  console.log(message);
  const keywords = message.split(/\s+/);
  return keywords.some((keyword:any) => {
    const lowercaseKeyword = keyword.toLowerCase();
    return lowercaseKeyword === PROMPTMESSAGES.REPLACE;
  });
};

export const checkForYesKeyword = (message:any) => {
  console.log(message);
  const keywords = message.split(/\s+/);
  return keywords.some((keyword:any) => {
    const lowercaseKeyword = keyword.toLowerCase();
    return lowercaseKeyword === PROMPTMESSAGES.YES;
  });
};

export const checkForNoKeyword = (message:any) => {
  console.log(message);
  const keywords = message.split(/\s+/);
  return keywords.some((keyword:any) => {
    const lowercaseKeyword = keyword.toLowerCase();
    return lowercaseKeyword === PROMPTMESSAGES.NO;
  });
};

export const initiateProjectAllocation = async (id: string) => {
  return team
};

export const freezeTeamList = async (id: string, data: Array<any>) => {
  // console.log("dattaaa",data)
  // const {
  //   data: { result },
  // } = await post<{ result: any }>(`${API.FREEZE_LIST}/${id}`, {
  //   allocated_resources: freezeList,
  // });

  // return result;
};

export const fetchTeamList = async (id: string) => {
 
  return freezeList.result;
};
