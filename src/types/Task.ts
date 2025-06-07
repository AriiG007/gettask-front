import type { User } from "./User";

export interface Task {
  id: string;
  name: string;
  description: string;
  created_by: string;
  user_id: string;
  stage_id: string;
  is_active: boolean;
  cancelled_by: string;
  cancellation_reason: string;
  completed_at: string;
  isInFirstStage?:boolean; // esta propiedad se agrega al mapear las tareas 
  isInLastStage?:boolean; // esta propiedad se agrega al mapear las tareas
  user?: User
}