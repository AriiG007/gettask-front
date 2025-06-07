import { useEffect, useState } from 'react';
import api from '../../../api/axios';
import type { Stage } from '../../../types/Stage';
import type { Task } from '../../../types/Task';
import { showErrorMessage, showSuccessMessage } from '../../../helpers/ToastMessage';
import { validatePermission } from '../../../services/auth/Auth';

export const Tasks = () => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [canReasignTasks, setPermissionToReasign] = useState(true);

  useEffect(() => {
    setPermissionToReasign(validatePermission('assign.tasks'));
    fetchData();
  }, []);


  const fetchData = async () => {

    const params = {
      filters: [{ relations: ['user'] }]
    }

    try {

      const tasksParams = canReasignTasks ? buildCustomQueryParams(params) : '';
      const [stagesRes, tasksRes] = await Promise.all([
        api.get<Stage[]>('/stages'),
        api.get<Task[]>(`/tasks?${tasksParams}`),
      ]);

      let stages = Array.isArray(stagesRes.data) && stagesRes.data.length > 0
        ? stagesRes.data.sort((a, b) => a.order - b.order)
        : [];


      // Agregar stage "Canceladas" 
      const cancelledStage: Stage = {
        id: 'cancelled_stage',
        name: 'Cancelled',
        description: 'Contain all cancelled tasks',
        order: stages.length + 1,
      };

      stages = [...stages, cancelledStage];

      const firstStage = stages[0];
      const lastStage = stages[stages.length - 1];

      const tasks = tasksRes.data;

      //agregar propiedades para saber si la tarea esta en el primer o ultimo stage y usarlos para los habilitar botones avanzar o retroceder de stage
      // si la tarea esta cancelada cambia su valor de stage id, por el de cancelado para el map en el template
      const mappedTasks = tasks.map(task => {
        const currentStage = stages.find(s => s.id === task.stage_id);
        return {
          ...task,
          stage_id: !task.is_active ? 'cancelled_stage' : task.stage_id,
          isInFirstStage: currentStage?.id === firstStage.id,
          isInLastStage: currentStage?.id === lastStage.id,
        };
      });

      setStages(stages);
      setTasks(mappedTasks);
    } catch (error) {
      console.error('Error loading data:', error);
      showErrorMessage(
        'An error occurred while loading data. ' +
        'Please reload the page. If the problem persists, please contact the administrator.'
      );
    } finally {
      setLoading(false);
    }
  };




  const moveStage = async (task: Task) => {
    try {
      await api.post(`/tasks/${task.id}/advance`);
      await fetchData();
      showSuccessMessage('The task moved to the next stage successfully.');
    } catch (error) {
      console.error(error);
      showErrorMessage('The task could not be advanced.');
    }
  };


  const revertStage = async (task: Task) => {
    try {
      await api.post(`/tasks/${task.id}/back`);
      await fetchData();
      showSuccessMessage('Task successfully rolled back.');
    } catch (error) {
      console.error(error);
      showErrorMessage('The task could not be rolled back.');
    }
  };

  const assignTask = async (task_id: string, user_id: string) => {
  
    try {
      await api.post(`/tasks/${task_id}/assign`, { user_id });
      await fetchData();
      showSuccessMessage('Task successfully assigned.');
    } catch (error) {
      console.error(error);
      showErrorMessage('The task could not be assigned back.');
    }
  };



  const cancelTask = async (task: Task, reason: string) => {

    if (!task.is_active) {
      showErrorMessage('This task is already canceled.');
      return;
    }

    try {
      await api.post(`/tasks/${task.id}/cancel`, { cancellation_reason: reason });
      await fetchData();
      showSuccessMessage('Task has been successfully canceled.');
    } catch (error) {
      console.error(error);
      showErrorMessage('The task could not be canceled.');
    }
  };

  const createFakeTask = async () => {
    try {

      await api.post<Task>(`/tasks/create-fake-task`);
      await fetchData();

      showSuccessMessage('Task has been created successfully.');
    } catch (error) {
      console.error(error);
      showErrorMessage('The task could not be created.');
    }
  };


  const buildCustomQueryParams = (obj: any): string => {
    const params: string[] = [];

    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        // Agrega la clave con [] si es un arreglo
        params.push(`${key}=[]`);

        value.forEach(item => {
          if (typeof item === 'object' && item !== null) {
            for (const [innerKey, innerValue] of Object.entries(item)) {
              if (Array.isArray(innerValue)) {

                params.push(`${key}[${innerKey}]=[]`);
                innerValue.forEach((val, i) => {

                  params.push(`${key}[${innerKey}][${i}]=${val}`);
                });
              }
            }
          }
        });
      }
      return params.join('&');
    }
  }

  return { stages, tasks, loading, moveStage, revertStage, cancelTask, canReasignTasks, createFakeTask, assignTask };
};