import { Tasks } from './Tasks';
import { ConfirmActionModal } from '../../../components/ConfirmActionModal';
import { useState } from 'react';
import type { Task } from '../../../types/Task';
import type { ConfirmActionModalProps } from '../../../types/ConfirmActionModalProps';
import { SelectUserModal } from './components/SelectUserModal';

const TasksTemplate = () => {
  const { stages, tasks, loading, moveStage, revertStage, cancelTask, canReasignTasks, assignTask, createFakeTask } = Tasks();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalUserOpen, setModalUserOpen] = useState(false);
  const [setSelectedTask, setsetSelectedTask] = useState<Task | null>(null);
  const [actionType, setActionType] = useState<'move' | 'revert' | 'cancel' | 'create-fake' | null>(null);
  const [modalConfig, setModalConfig] = useState<ConfirmActionModalProps | null>(null);

  const openModalUser = (task: Task) => {
    setsetSelectedTask(task);
    setModalUserOpen(true);
  }

  const closeModalUser = () => {
    setModalUserOpen(false);
    setsetSelectedTask(null);
  }

  const confirmAssignment = async (user_id: string) => {
    const taskId = setSelectedTask?.id ?? '';
    await assignTask(taskId, user_id);
    closeModal();
  };


  const openModal = (task: Task | null, action: 'move' | 'revert' | 'cancel' | 'create-fake') => {
    setsetSelectedTask(task);
    setActionType(action);


    if (action === 'move') {
      setModalConfig({
        title: 'Move task to the next stage',
        message: 'Are you sure you want to proceed?',
        confirmLabel: 'Confirm',
        cancelLabel: 'Cancel',
        confirmColor: 'blue',
        withReason: false,
      });
    }
    else if (action === 'revert') {
      setModalConfig({
        title: 'Move task to the previous stage',
        message: 'Are you sure you want to proceed?',
        confirmLabel: 'Confirm',
        cancelLabel: 'Cancel',
        confirmColor: 'blue',
        withReason: false,
      });
    }
    else if (action === 'cancel') {
      setModalConfig({
        title: 'Cancel task',
        message: 'Are you sure you want to proceed?',
        confirmLabel: 'Confirm',
        cancelLabel: 'Cancel',
        confirmColor: 'blue',
        withReason: true,
        reasonPlaceholder: 'Reason or motive why the task is cancelled',
      });
    }
    else if (action === 'create-fake') {
      setModalConfig({
        title: 'Create fake task',
        message: 'A fake task will be created assigned to you for testing, are you sure to continue?',
        confirmLabel: 'Confirm',
        cancelLabel: 'Cancel',
        confirmColor: 'blue',
        withReason: false,
      });
    }

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setsetSelectedTask(null);
    setActionType(null);
  };


  const handleConfirm = async (reason?: string) => {
    reason = reason ?? '';

    if (actionType === 'create-fake') await createFakeTask();

    if (!setSelectedTask || !actionType) return;

    if (actionType === 'move') await moveStage(setSelectedTask)
    if (actionType === 'revert') await revertStage(setSelectedTask);
    if (actionType === 'cancel') await cancelTask(setSelectedTask, reason);

    closeModal();
  };


  if (loading) return <div className="p-6">Loading...</div>;

  return (

    <div className="w-full h-screen bg-gray-100 flex flex-col">

      <header className="p-4 bg-white shadow flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm"
          onClick={() => openModal(null, 'create-fake')}
        >
          Add fake task
        </button>
      </header>

      <div className="flex-1 overflow-hidden p-4">
        <div className="h-full w-full bg-transparent rounded-xl p-4 overflow-x-auto overflow-y-hidden scrollbar-visible">
          <div className="flex space-x-6 w-max h-full">
            {stages.map((stage) => {
              const stageTasks = tasks.filter((task) => task.stage_id === stage.id);

              return (
                <div
                  key={stage.id}
                  className="w-80 flex-shrink-0 bg-white rounded-2xl shadow-lg p-4 border border-gray-200 max-h-full overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">{stage.name}</h2>
                  </div>

                  <div className="flex flex-col gap-4">
                    {stageTasks.map((task) => (
                      <div
                        key={task.id}
                        className="relative bg-gray-50 rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition min-h-[100px]"
                      >

                        {(task.is_active && !task.completed_at) ? (
                          <button
                            onClick={() => openModal(task, 'cancel')}
                            className="absolute top-2 right-3 text-xs font-medium text-red-500 hover:text-red-600 transition"
                          >
                            Cancel
                          </button>
                        ) : <span className={`absolute top-2 right-3 text-xs font-medium ${task.completed_at ? 'text-cyan-700' : 'text-gray-400'} `}>
                          {task.completed_at ? 'Task completed' : 'Task Cancelled'}
                        </span>}

                        <h3 className="text-sm pt-3 font-semibold text-gray-900">
                          Task:  {task.name}
                        </h3>

                        <p className="text-xs font-bold break-words text-gray-500">
                          {task?.user?.name ? `User task: ${task.user.name}` : ''}
                        </p>

                        <p className="text-xs break-words text-gray-500 mt-2">
                          {task.description}
                        </p>


                        {(task.is_active && !task.completed_at) ? (

                          <div className="flex gap-4 mt-4">

                            {!task?.isInFirstStage && (
                              <button
                                onClick={() => openModal(task, 'revert')}
                                className="px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition curson-pointer"
                              >
                                Revert Stage
                              </button>
                            )}

                            {(!task?.isInLastStage) && (

                              <button
                                onClick={() => openModal(task, 'move')}
                                className="px-3 py-1 text-sm rounded-full bg-blue-500 text-white hover:bg-blue-600 transition curson-pointer"
                              >
                                Move Stage
                              </button>

                            )}
                          </div>
                        ) : ""}

                        {(canReasignTasks) ? (
                          <div className="flex justify-center items-center mt-3">

                            <button
                              onClick={() => openModalUser(task)}
                              className="text-xs font-medium text-blue-500 hover:text-blue-600 transition"
                            >
                              Reassign Task
                            </button>
                          </div>
                        ) : ""}

                      </div>

                    ))}
                    {stageTasks.length === 0 && (
                      <p className="text-sm text-gray-400 italic">No tasks.</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <ConfirmActionModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        withReason={modalConfig?.withReason}
        title={modalConfig?.title}
        message={modalConfig?.message}
        confirmLabel={modalConfig?.confirmLabel}
        cancelLabel={modalConfig?.cancelLabel}
        reasonPlaceholder={modalConfig?.reasonPlaceholder}
      />

      <SelectUserModal
        isOpen={modalUserOpen}
        onClose={closeModalUser}
        onConfirm={confirmAssignment}
      />

    </div>

  );
};

export default TasksTemplate;
