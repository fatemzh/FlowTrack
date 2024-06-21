import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Button.tsx';
import { useGetGroup, useDeleteGroup } from '../../api/resources/groups';
import { GroupType } from './Group.type';
import Table from '../../components/Table.tsx';
import { UserType } from '../users/Users.type';

const ViewGroup = () => {
  const { id } = useParams<{ id?: string }>();
  const { data: group, error } = useGetGroup(id);
  const [groupData, setGroupData] = useState<GroupType>({
    id: '',
    name: '',
    color: '',
    members: [],
  });
  const { mutate: deleteGroup } = useDeleteGroup();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      alert("Aucun ID fourni. Aucun ID groupe est accessible.");
      navigate("/groups");
      return;
    }
    if (group) {
      setGroupData(group);
    } else if (error) {
      alert("Erreur lors de la récupération des détails du groupe.");
    }
  }, [id, group, error, navigate]);

  if (!group) {
    return <div>Loading...</div>;
  }

  const handleDeleteGroup = (id: string) => {
    if (!id) {
      console.error("No ID provided for deletion.");
      return;
    }
    deleteGroup(id, {
      onSuccess: () => {
        alert("Groupe supprimé avec succès.");
        navigate('/groups');
      },
      onError: (error) => {
        alert(`Erreur lors de la suppression du groupe: ${error.message}`);
      }
    });
  };

  return (
    <div className='form-container min-h-screen shadow-md rounded px-2 pt-6 pb-8 mb-4'>
      <div className='mb-4'>
        <h1 className='text-4xl'>Groupe {groupData?.name}</h1>
        <hr />
      </div>
      <div className="flex flex-row justify-between align-around ml-2 mr-10">
        <div className='flex flex-col mt-10 h-[250px] w-[550px]'>
          <div className='flex flex-row justify-between'>
            <div className='mb-4 mr-10 w-50'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Nom du groupe :</label>
              <p className='shadow w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                {groupData?.name || ""}
              </p>
            </div>
            <div className='flex flex-row w-[250px] items-center'>
              <div className='flex flex-col w-[100px] justify-center mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Couleur :</label>
                <div className='flex flex-row w-[200px] justify-between'>
                  <p className='shadow w-100px py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                    {groupData?.color || ""}
                  </p>
                </div>
              </div>
              <div style={{ backgroundColor: `#${groupData?.color}` }} className='block w-[40px] h-[40px] mt-4 rounded-3xl'></div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-page p-4 font-sans">
        <article className="article-header mb-4">
          <header className="flex flex-row justify-between">
            <h1 className="text-2xl">Membres du groupe</h1>
            <hr />
          </header>
        </article>
        <section className="section-content">
          <div className="overflow-x-auto">
            <Table<UserType>
              data={group.members || []}
              title="Membres du groupe"
              columns={[
                { header: 'Nom', accessor: 'lastname' },
                { header: 'Prénom', accessor: 'firstname' },
                { header: 'Email', accessor: 'email' },
                { header: 'Téléphone', accessor: 'phone_number' },
                { header: 'Profession', accessor: 'profession' }
              ]}
            />
          </div>
        </section>
      </div>
      <div className='flex flex-row items-center justify-between'>
        <div className='w-[200px] mt-6'>
          <Button
            label="Retour à la liste"
            onClickAction={() => navigate('/groups')}
          />
        </div>
        <div className='w-[200px] mt-6'>
          <Button
            label="Modifier le groupe"
            onClickAction={() => navigate(`/editGroup/${id}`)}
          />
        </div>
        <div className='w-[200px] mt-6'>
          <Button
            label="Supprimer le groupe"
            onClickAction={() => handleDeleteGroup(id)}
            confirmationText="Êtes-vous sûr de vouloir supprimer ce groupe ?"
            isDisabled={group.members.length !== 0}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewGroup;
