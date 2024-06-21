import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput.tsx";
import Button from "../../components/Button.tsx";
import { useCreateGroup } from "../../api/resources/groups.ts";
import { GroupType } from "./Group.type";

const AddGroup = () => {
  const [groupData, setGroupData] = useState<GroupType>({
    id: "",
    name: "",
    color: "",
  });

  const mutation = useCreateGroup();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", groupData.name ?? "");
    formData.append("color", groupData.color ?? "");
    mutation.mutate(formData, {
      onSuccess: (data) => {
        alert("Groupe ajouté avec succès");
        navigate(`/groups`);
      },
      onError: (error) => {
        alert("Erreur lors de l'ajout du groupe");
      },
    });
  };

  return (
    <div className="form-container min-h-screenshadow-md rounded px-2 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <h1 className="text-4xl">Nouveau groupe</h1>
        <hr />
      </div>
      <form
        onSubmit={handleSubmit}
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
                  //title="Le format attendu est de type hexadécimal, ex: AB1234"
                  //pattern="^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
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
                className="block w-[40px] h-[40px] mt-4 rounded-3xl border-solid border-2 border-black"
              ></div>
            </div>
          </div>
          <div className="flex flex-row mt-3">
            <div className="w-[200px] mr-10">
              <Button
                label="Retour à la liste des groupes"
                onClickAction={() => navigate("/groups")}
              />
            </div>
            <div className="w-[200px]">
              <Button 
                label="Enregistrer" 
                //type="submit" 
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddGroup;
