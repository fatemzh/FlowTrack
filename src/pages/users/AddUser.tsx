import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button.tsx";
import { useCreateUser } from "../../api/resources/users";
import { UserType } from "./Users.type";

const AddUser = () => {
  const [userData, setUserData] = useState<UserType>({
    id: "",
    firstname: "",
    lastname: "",
    birth_date: "",
    phone_number: "",
    email: "",
    profession: [],
    image_profile: "",
  });

  const mutation = useCreateUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("firstname", userData.firstname ?? "");
    formData.append("lastname", userData.lastname ?? "");
    formData.append("birth_date", userData.birth_date ?? "");
    formData.append("phone_number", userData.phone_number ?? "");
    formData.append("email", userData.email ?? "");
    formData.append("image_profile", userData.image_profile ?? "");

    console.log("Data", userData, Object.fromEntries(formData));
    mutation.mutate(formData, {
      onSuccess: (data) => {
        alert("Utilisateur ajouté avec succès");
        const userId = data?.data?.id;
        if (userId) {
          navigate(`/peoples/${userId}`);
        } else {
          console.error("User ID not found in response data");
        }
      },
      onError: (error) => {
        alert(`Erreur: ${error.message}`);
      },
    });
  };

  return (
    <div className="form-container min-h-screenshadow-md rounded px-2 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <h1 className="text-4xl">Nouveau utilisateur</h1>
        <hr />
      </div>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-row justify-between h-[600px] align-around ml-10 mr-10"
        encType="multipart/form-data"
      >
        <div className="flex flex-col justify-evenly h-[650px] w-[650px]">
          <div className="flex flex-row justify-between">
            <div className="mb-4 mr-10 w-50">
              <TextInput
                label="Nom*"
                placeholder="Nom"
                name="firstname"
                value={userData.firstname || ""}
                onTextChange={(newValue) =>
                  setUserData((prev) => ({ ...prev, firstname: newValue }))
                }
                type="text"
                required={true}
              />
            </div>
            <div className="mb-4">
              <TextInput
                label="Prénom*"
                placeholder="Prénom"
                name="lastname"
                value={userData.lastname || ""}
                onTextChange={(newValue) =>
                  setUserData((prev) => ({ ...prev, lastname: newValue }))
                }
                type="text"
                required={true}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <TextInput
              label="Date de naissance*"
              placeholder="Date de naissance"
              name="birth_date"
              value={userData.birth_date || ""}
              onTextChange={(newValue) =>
                setUserData((prev) => ({ ...prev, birth_date: newValue }))
              }
              type="date"
              required={true}
            />
          </div>
          <div>
            <TextInput
              label="Téléphone*"
              placeholder="Ex: +123...."
              name="phone_number"
              required={true}
              value={userData.phone_number || ""}
              onTextChange={(newValue) =>
                setUserData((prev) => ({ ...prev, phone_number: newValue }))
              }
            />
          </div>
          <div>
            <TextInput
              label="Email"
              placeholder="Email"
              name="email"
              value={userData.email || ""}
              onTextChange={(newValue) =>
                setUserData((prev) => ({ ...prev, email: newValue }))
              }
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="w-[200px] mt-6">
              <Button
                label="Retour à la liste"
                onClickAction={() => navigate("/peoples")}
              />
            </div>
            <div className="w-[200px] mt-6">
              <Button 
                label="Ajouter un utilisateur" 
                //type="submit" 
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
