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

export const filterProjects = (projects, message) => {
  console.log("message", message);
  const keywords = message.split(/\s+/);
  const matches = [];
  projects.forEach((project) => {
    const projectName = project.project_name.toLowerCase().replace(/\s/g, "");
    keywords.forEach((keyword) => {
      const lowercaseKeyword = keyword.toLowerCase();
      if (projectName === lowercaseKeyword) {
        console.log(projectName + " " + lowercaseKeyword);
        matches.push(project);
      }
    });
  });
  return matches;
};

export const checkForReplaceKeyword = (message) => {
  console.log(message);
  const keywords = message.split(/\s+/);
  return keywords.some((keyword) => {
    const lowercaseKeyword = keyword.toLowerCase();
    return lowercaseKeyword === PROMPTMESSAGES.REPLACE;
  });
};

export const checkForYesKeyword = (message) => {
  console.log(message);
  const keywords = message.split(/\s+/);
  return keywords.some((keyword) => {
    const lowercaseKeyword = keyword.toLowerCase();
    return lowercaseKeyword === PROMPTMESSAGES.YES;
  });
};

export const initiateProjectAllocation = async (id: string) => {
  return team
};

export const freezeTeamList = async (id: string, data: Array<Employee>) => {
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
