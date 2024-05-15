import { ROLE } from "@/constants/roles";

export const hasAdminAccess = (role: Array<string>) =>
  role?.includes(ROLE.ADMIN);
