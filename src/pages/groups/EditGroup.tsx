import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button.tsx";
import { useEditGroup, useGetGroup } from "../../api/resources/groups.ts";
import { GroupType } from "./Group.type";

const EditGroup = () => {
  const { id } = useParams<{ id?: string }>();
  const [groupData, setGroupData] = useState<GroupType>({
    id: "",
    name: "",
    color: "",
  });
  const { data: group } = useGetGroup(id);
  const editMutation = useEditGroup(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      alert("Aucun ID fourni. Aucun ID groupe est accessible");
      navigate("/groups");
      return;
    }

    if (group) {
      setGroupData(group);
    }
  }, [id, group, navigate]);

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (groupData) {
      editMutation.mutate(groupData, {
        onSuccess: () => {
          alert("Groupe modifié avec succès");
          navigate(`/groups/${id}`);
        },
        onError: (error) => {
          if (error.response?.status === 409) {
            alert("Ce nom de groupe existe déjà.");
          } else if (error.response?.status === 422) {
            alert("Données invalides. Veuillez respecter le format hexadécimal de la couleur.");
          } else {
            console.error(error);
          }
        },
      });
    }
  };

  return (
    <div className="form-container min-h-screen shadow-md rounded px-2 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <h1 className="text-4xl">Modifier le groupe</h1>
        <hr />
      </div>
      <form
        onSubmit={handleEdit}
        method="post"
        className="flex flex-row h-[300px] w-[1000px] justify-around"
        encType="multipart/form-data"
      >
        <div className="flex flex-col justify-evenly mt-10 w-[900px]">
          <div className="flex flex-row justify-between">
            <div className="mb-4 mr-10 w-[300px]">
              <TextInput
                label="Nom*"
                placeholder="Nom du groupe"
                name="name"
                value={groupData.name || ""}
                onTextChange={(newValue) =>
                  setGroupData((prev) => ({ ...prev, name: newValue }))
                }
                type="text"
                required={true}
              />
            </div>
            <div className="flex flex-row justify-between items-center mb-4 mr-2 w-[300px]">
              <div className="flex flex-col">
                <TextInput
                  label="Couleur*"
                  placeholder="Ex: FF5733"
                  name="color"
                  // title="Le format attendu est de type hexadécimal, ex: AB1234"
                  // pattern="^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                  value={groupData.color || ""}
                  onTextChange={(newValue) =>
                    setGroupData((prev) => ({ ...prev, color: newValue }))
                  }
                  type="text"
                  required={true}
                />
                <p className="text-xs text-secondary-400">
                  La couleur doit être au format hexadécimal
                </p>
              </div>
              <div
                style={{ backgroundColor: `#${groupData?.color}` }}
                className="block w-[40px] h-[40px] mt-4 rounded-3xl"
              ></div>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <div className="w-[200px] mt-6 mr-5">
              <Button
                label="Retour à la liste"
                onClickAction={() => navigate("/groups")}
              />
            </div>
            <div className="w-[200px] mt-6">
              <Button 
                label="Modifier le groupe" 
                //type="submit" 
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditGroup;
