import { API } from "@/constants/api-routes";
import team from "../components/mock/team.json";
import { get, post } from "./axios";
import freezeList from "../components/mock/freezeList.json";
import projects from "../components/mock/projects.json";
import replace from "../components/mock/replace.json";

export const sendChatResponse = async (data: {}) => {
  return team;
};

export const sendSecondaryPrompt = async (id: string, data: {}) => {
  return replace;
};

export const getAllProjectsList = async () => {
  return projects;
};

export const initiateProjectAllocation = async (id: string) => {
  return team;
};
