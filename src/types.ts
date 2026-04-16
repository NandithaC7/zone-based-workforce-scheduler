import { WorkloadTag } from "./mockData";

export type AppEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  workload: WorkloadTag;
  memberName: string;
  resourceName: string;
};