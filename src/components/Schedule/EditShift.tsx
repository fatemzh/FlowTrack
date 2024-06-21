import * as React from "react";
import DropdownSelect from "../DropdownList/DropdownList";
import { useGetGroups } from "../../api/resources/groups";
import { useEditShift } from "../../api/resources/schedules";
import { ScheduleType } from "../../pages/schedules/Schedules.type";
import { useEffect, useState } from "react";
import { GroupType } from "../../pages/groups/Group.type";
import TextInput from "../TextInput";
import Button from "../Button";
import { useParams } from "react-router-dom";

const EditShiftModal = () => {
  const { id } = useParams<{ id?: string }>();
  const [showModal, setShowModal] = useState(false);
  const editMutation = useEditShift(id);
  const { data: shiftGroup } = useGetGroups();
  const [scheduleData, setScheduleData] = useState<ScheduleType>({
    id: "",
    group_id: "",
    start_time: "",
    end_time: "",
  });

  const [selectedGroupId, setSelectedGroupId] = useState<ScheduleType>();

  useEffect(() => {
    if (scheduleData) {
      setSelectedGroupId(scheduleData);
      const currentGroupId = scheduleData.group_id;
      if (currentGroupId) {
        setSelectedGroupId(currentGroupId);
      }
    }
  }, [scheduleData, setSelectedGroupId]);

  const handleGroupValueChange = (newGroupId: string) => {
    setSelectedGroupId(newGroupId);
    setScheduleData((prevData) => ({
      ...prevData,
      group_id: newGroupId,
    }));
  };

  const convertToAPIDateFormat = (dateToConvert: string) => {
    const date = new Date(dateToConvert);
    return date.toISOString();
  };

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const convertedStartTime = convertToAPIDateFormat(scheduleData.start_time);
    const convertedEndTime = convertToAPIDateFormat(scheduleData.end_time);

    const formData = new FormData();

    formData.append("group_id", scheduleData.group_id ?? "");
    formData.append("start_time", convertedStartTime ?? "");
    formData.append("end_time", convertedEndTime ?? "");
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
    <>
      <button
        className="w-[200px] rounded p-3 mt-2 text-xs px-6 py-3 font-semibold 
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
        focus-visible:outline-primary-100 bg-black text-white"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Modifier un horaire
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none">
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
                        <div className="w-[300px]">
                          <DropdownSelect
                            name="group_id"
                            label="Sélectionner un groupe"
                            placeholder="Sélectionner un groupe"
                            value={selectedGroupId}
                            onValueChange={handleGroupValueChange}
                            options={
                              shiftGroup?.map((group: GroupType) => ({
                                value: group.id,
                                label: group.name,
                              })) || []
                            }
                          />
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
                          // type="button"
                          // isLoading={false}
                        ></Button>
                      </div>
                      <div className="w-[200px] mt-6">
                        <Button
                          label="Enregistrer"
                          // type="submit"
                          // isLoading={isLoading}
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
      ) : null}
    </>
  );
};

export default EditShiftModal;
