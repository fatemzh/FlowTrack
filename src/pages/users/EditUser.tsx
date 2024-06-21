import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditUser, useGetProfessions, useGetUser, useAssignProfession, useDeleteUser } from '../../api/resources/users';
import Button from '../../components/Button.tsx';
import { UserType, ProfessionType } from './Users.type';
import TextInput from '../../components/TextInput';
import DropdownSelect from '../../components/DropdownList/DropdownList';
// import DropzonePhotos from '../../components/Dropzone/Dropzone.tsx';

const EditUser = () => {
    const { id } = useParams<{ id?: string }>();
    const { data: professions } = useGetProfessions();
    const { data: userProfile } = useGetUser(id);
    const [userData, setUserData] = useState<UserType>({
        id: '',
        name: '',
        firstname: '',
        lastname: '',
        phone_number: '',
        email: '',
        profession: [],
        // profile_picture: undefined,
        // license_picture: undefined,
    });
    const [selectedProfessionId, setSelectedProfessionId] = useState<string | undefined>();
    const navigate = useNavigate();
    const editMutation = useEditUser(id);
    const assignProfessionMutation = useAssignProfession();
    const deleteUserMutation = useDeleteUser();

    useEffect(() => {
        if (!id) {
            alert("Aucun ID utilisateur est accessible");
            navigate("/peoples");
            return;
        }
        if (userProfile) {
            setUserData(userProfile);
            const currentProfessionId = userProfile.profession?.id;
            if (currentProfessionId) {
                setSelectedProfessionId(currentProfessionId);
            }
        }
    }, [id, userProfile, navigate]);

    const handleProfessionChange = (newProfessionId: string) => {
        setSelectedProfessionId(newProfessionId);
        const selectedProfession = professions.find((profession: ProfessionType) => profession.id === newProfessionId);
        setUserData(prevData => ({
            ...prevData,
            profession: selectedProfession ? selectedProfession.name : ''
        }));
    };

    // const handlePhotoChange = (fieldName: keyof UserType, file: File | undefined) => {
    //     setUserData(prevData => ({
    //         ...prevData,
    //         [fieldName]: file
    //     }));
    // };

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('firstname', userData.firstname ?? '');
        formData.append('lastname', userData.lastname ?? '');
        formData.append('name', userData.name ?? '');
        formData.append('email', userData.email ?? '');
        formData.append('phone_number', userData.phone_number ?? '');
        // formData.append('profile_picture', userData.profile_picture ?? '');
        // formData.append('license_picture', userData.license_picture ?? '');
        console.log("Data", userData, Object.fromEntries(formData));
        if (userData) {
            editMutation.mutate(userData, {
                onSuccess: () => {
                    alert('Utilisateur modifié avec succès');
                    if (selectedProfessionId && id) {
                        assignProfessionMutation.mutate({ userId: id, professionId: selectedProfessionId }, {
                            onSuccess: () => {
                                navigate(`/peoples/${id}`);
                            },
                            onError: (error) => {
                                alert(`Erreur lors de l'assignation de la profession: ${error.message}`);
                            }
                        });
                    } else {
                        navigate(`/peoples/${id}`);
                    }
                },
                onError: (error) => {
                    alert(`Erreur lors de la modification: ${error.message}`);
                }
            });
        }
    };

    const handleDeleteUser = (id: string | undefined) => {
        if (id) {
            deleteUserMutation.mutate(id, {
                onSuccess: () => {
                    alert('Utilisateur supprimé avec succès');
                    navigate('/peoples');
                },
                onError: (error) => {
                    alert(`Erreur lors de la suppression: ${error.message}`);
                }
            });
        }
    };

    // if (!isChecking && (!isAuthenticated || !(user?.permissions['manage_other_users'] || user?.id.toString() === userData?.id.toString()))) {
    //     return <Navigate to='/unauthorized' />;
    // }

    return (
        <div className='form-container min-h-screen shadow-md rounded px-2 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
                <h1 className='text-4xl'>{userData?.lastname} {userData?.firstname}</h1>
                <hr />
            </div>
            <form 
                onSubmit={handleEdit} 
                className="flex flex-row justify-between h-[600px] align-around ml-10 mr-10"
                encType='multipart/form-data'>
                <div className='flex flex-col justify-around h-[620px]'>
                    {/* <DropzonePhotos 
                        label="Déposer une photo de profil" 
                        onDrop={(newValue) => handlePhotoChange("profile_picture", newValue)}
                    />
                    <DropzonePhotos 
                        label="Déposer une photo de permis" 
                        onDrop={(newValue) => handlePhotoChange("license_picture", newValue)}
                    /> */}
                </div>
                <div className='flex flex-col justify-evenly items-between h-[650px] w-[650px]'>
                    <div className='flex flex-row justify-between'>
                        <div className='mb-4 mr-10 w-50'>
                            <TextInput
                                label="Nom*"
                                placeholder="Nom"
                                name="firstname"
                                value={userData?.firstname || ''}
                                onTextChange={(newValue) => setUserData(prev => ({ ...prev, firstname: newValue }))}
                                type='text'
                                required={true}
                            />
                        </div>
                        <div className='mb-4 w-50'>
                            <TextInput
                                label="Prénom*"
                                placeholder='Prénom'
                                name="lastname"
                                value={userData?.lastname || ''}
                                onTextChange={(newValue) => setUserData(prev => ({ ...prev, lastname: newValue }))}
                                type='text'
                                required={true}
                            />
                        </div>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='mb-4'>
                            <TextInput
                                label='Surnom*'
                                placeholder='Surnom'
                                name='name'
                                value={userData?.name || ''}
                                required={true}
                                onTextChange={(newValue) => setUserData(prev => ({ ...prev, name: newValue }))}
                            />
                        </div>
                        <DropdownSelect
                            name='profession'
                            label='Profession'
                            value={selectedProfessionId}
                            onValueChange={handleProfessionChange}
                            options={professions?.map(profession => ({
                                value: profession.id,
                                label: profession.name
                            })) || []}
                            currentProfessionLabel={userData.profession || "Aucune profession"}
                        />
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='mb-4'>
                            <TextInput
                                label="Email"
                                placeholder="email@email.com"
                                name="email"
                                value={userData?.email || ''}
                                onTextChange={(newValue) => setUserData(prev => ({ ...prev, email: newValue }))}
                                type='email'
                            />
                        </div>
                        <div className='mb-4'>
                            <TextInput 
                                label='Numéro de téléphone*'
                                name='phone_number'
                                placeholder="+41 78 345 67 89"
                                //pattern="\+[0-9 ]+"
                                //title="Le format attendu est : +41 76 456 78 90" 
                                value={userData?.phone_number || ""}  
                                onTextChange={(newValue) => setUserData(prev => ({ ...prev, phone_number: newValue }))}
                                type="tel" 
                                required={true}
                            />
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='w-[200px] mt-6'>
                            <Button 
                                label="Retour à la liste" 
                                onClickAction={() => navigate('/peoples')} 
                                // type="button" 
                                // isLoading={false}
                            />
                        </div>
                        <div className='w-[200px] mt-6'>
                            <Button 
                                label="Modifier l'utilisateur" 
                                // type="submit" 
                                // isLoading={editMutation.isLoading}
                            />
                        </div>
                        <div className='w-[200px] mt-6'>
                            <Button 
                                label="Supprimer l'utilisateur" 
                                onClickAction={() => handleDeleteUser(id)} 
                                confirmationText="Êtes-vous sûr de vouloir supprimer cet utilisateur ?" 
                                // type="button" 
                                // isLoading={false}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
