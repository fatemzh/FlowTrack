import { useState, useEffect } from "react";
import { useEditShift } from "../../api/resources/schedules";
import { useGetGroups } from "../../api/resources/groups";
import { ScheduleType } from "../../pages/schedules/Schedules.type";
import Button from "../Button";
import TextInput from "../TextInput";

export interface TimeSlotProps {
  id: string;
  color: string;
  group_id: string;
  start_time: string;
  end_time: string;
  leftPx: number;
  lengthPx: number;
  onDelete: (id: string) => void;
  onClick?: () => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({
  id,
  color,
  group_id,
  start_time,
  end_time,
  leftPx,
  lengthPx,
  onDelete,
}) => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const startTime = new Date(start_time);
  const endTime = new Date(end_time);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes === 0 ? "00" : minutes}`;
  };

  const handleDeleteClick = () => {
    if (isConfirming) {
      onDelete(id);
    } else {
      setIsConfirming(true);
      setTimeout(() => {
        setIsConfirming(false);
      }, 3000);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const { data: shiftGroup, isLoading } = useGetGroups();
  const [scheduleData, setScheduleData] = useState<ScheduleType>({
    id: "",
    group_id: "",
    start_time: "",
    end_time: "",
  });
  const editMutation = useEditShift(scheduleData.id);

  useEffect(() => {
    if (scheduleData) {
      setScheduleData({
        id: id,
        group_id: group_id,
        start_time: start_time,
        end_time: end_time,
      });
    }
  }, [id, group_id, start_time, end_time]);

  const convertToAPIDateFormat = (dateToConvert: string) => {
    const date = new Date(dateToConvert);
    return date.toISOString();
  };

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("start_time", scheduleData.start_time ?? "");
    formData.append("end_time", scheduleData.end_time ?? "");
    console.log("Data", scheduleData, Object.fromEntries(formData));

    if (scheduleData) {
      editMutation.mutate(scheduleData, {
        onSuccess: () => {
          alert("Horaire modifié avec succès");
          setShowModal(false);
        },
        onError: (error) => {
          alert(`Erreur lors de la modification: ${error.message}`);
          setShowModal(false);
        },
      });
      setShowModal(false);
    }
  };

  return (
    <div
      className="absolute rounded-lg shadow-lg cursor-pointer flex items-center justify-center text-center h-[50px]"
      style={{
        width: `${lengthPx + 27}px`,
        backgroundColor: `#${color}`,
        left: `${leftPx + 15}px`,
      }}
      role="button"
      tabIndex={0}
      onClick={() => setShowModal(true)}
    >
      {showModal ? (
        <>
          <div className="inset-0 z-50 outline-none focus:outline-none w-[800px]">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl font-semibold">Modifier un horaire</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form
                    onSubmit={handleEdit}
                    method="post"
                    className="flex flex-col space-y-4"
                    encType="multipart/form-data"
                  >
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-row space-x-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Groupe
                          </label>
                          <p>
                            {shiftGroup?.find(
                              (group) => group.id === scheduleData.group_id
                            )?.name || ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row space-x-4">
                        <div className="w-[300px]">
                          <TextInput
                            label="Départ"
                            name="start_time"
                            value={scheduleData.start_time || ""}
                            onTextChange={(newValue) =>
                              setScheduleData((prev) => ({
                                ...prev,
                                start_time: newValue,
                              }))
                            }
                            type="datetime-local"
                            required={true}
                          />
                        </div>
                        <div className="w-[300px]">
                          <TextInput
                            label="Fin"
                            name="end_time"
                            value={scheduleData.end_time || ""}
                            onTextChange={(newValue) =>
                              setScheduleData((prev) => ({
                                ...prev,
                                end_time: newValue,
                              }))
                            }
                            type="datetime-local"
                            required={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-between m-5">
                      <div className="w-[200px] mt-6">
                        <Button
                          label="Fermer"
                          onClickAction={() => setShowModal(false)}
                          //type="button"
                          //isLoading={false}
                        ></Button>
                      </div>
                      <div className="w-[200px] mt-6">
                        <Button
                          label="Enregistrer"
                          //type="submit"
                          //isLoading={isLoading}
                        ></Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        <>
          <p className="text-xs">{`${formatTime(startTime)} - ${formatTime(
            endTime
          )}`}</p>
          <button
            onClick={handleDeleteClick}
            className="w-[20px] h-[20px] ml-4 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default TimeSlot;
