import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUser } from '../../api/resources/users';
import Button from '../../components/Button.tsx';
import { UserType } from './Users.type';
//import { useAuth } from '../../contexts/AuthContext';

const ViewUser = () => {
    const { id } = useParams<{ id?: string }>();
    const { data: userProfile, error, isLoading } = useGetUser(id);
    //const { user, isAuthenticated, isChecking } = useAuth();

    const [userData, setUserData] = useState<UserType | undefined>({
        id: '',
        name: '',
        firstname: '',
        lastname: '',
        phone_number: '',
        roles: [],
        email: '',
        image_profile: undefined,
        image_licence: undefined,
        wish_comment: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            alert("Aucun ID utilisateur est accessible");
            navigate("/peoples");
            return;
        }
        if (userProfile) {
            setUserData(userProfile);
        } else if (error) {
            alert(`Erreur: ${error.message}`);
        }
    }, [id, userProfile, error, navigate]);

    if (isLoading) {
        return <div>Chargement du profil...</div>;
    }

    // if (!isChecking && !isAuthenticated) {
    //     return <Navigate to='/unauthorized' />;
    // }

    return (
        <div className='form-container min-h-screen shadow-md rounded px-2 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
                <h1 className='text-4xl'>{userData?.lastname} {userData?.firstname}</h1>
                <hr />
            </div>
            <div className="flex flex-row justify-between h-[600px] align-around ml-10 mr-10">
                {/* <div className='flex flex-col justify-around h-[620px]'>
                    <div className='w-[230px] h-[230px] mb-4'>
                        {userData?.image_profile ? (
                            <img src={userData?.image_profile} alt={`Photo de profil de l'utilisateur`} />
                        ) : (
                            <span>Pas de photo de profil</span>
                        )}
                    </div>
                    <div className='w-[230px] h-[230px] mb-4'>
                        {userData?.image_licence ? (
                            <img src={userData?.image_licence} alt={`Photo de permis de l'utilisateur`} />
                        ) : (
                            <span>Pas de photo de permis</span>
                        )}
                    </div>
                </div> */}
                <div className='flex flex-col justify-evenly h-[650px] w-[650px]'>
                    <div className='flex flex-row justify-between '>
                        <div className='mb-4 mr-10 w-50'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Nom : </label>
                            <p className='shadow w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                {userData?.firstname || ""}
                            </p>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Prénom : </label>
                            <p className='shadow w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                {userData?.lastname || ""}
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Surnom : </label>
                            <p className='shadow w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                {userData?.name || ""}
                            </p>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Rôle : </label>
                            <p>{userData?.roles ? userData.roles[0]?.name : 'Aucun rôle'}</p>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Email:</label>
                            <p className='shadow w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                {userData?.email || ""}
                            </p>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Numéro de téléphone : </label>
                            <p className='shadow w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                {userData?.phone_number || ""}
                            </p>
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
                                onClickAction={() => navigate(`/editUsers/${id}`)}
                                // type="button"
                                // isLoading={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewUser;
