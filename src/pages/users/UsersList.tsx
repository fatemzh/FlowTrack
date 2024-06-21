import { useNavigate } from 'react-router-dom';
import { useGetUsers } from '../../api/resources/users';
import Button from '../../components/Button.tsx';
import Table from '../../components/Table.tsx'; 
import { UserType } from './Users.type';
import NavBar from '../../components/NavBar.tsx';

const UsersList = () => {
  const { data: users, isLoading, isError } = useGetUsers();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/users/add');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading users</div>;
  }

  const columns = [
    { header: 'Prénom', accessor: 'firstname' },
    { header: 'Nom', accessor: 'lastname' },
    { header: 'Date de naissance', accessor: 'birth_date' },
    { header: 'Téléphone', accessor: 'phone_number' },
    { header: 'Email', accessor: 'email' },
    { header: 'Profession', accessor: 'profession' },
  ];

  return (
    <div className="home-page font-sans">
      <NavBar />
      <article className="article-header mb-4">
        <header className="flex flex-row justify-between">        
          <h1 className="text-2xl"> Liste des utilisateurs </h1>
          <hr />
        </header>
      </article>
      <section className="section-content ">
        <>
          <div className="overflow-x-auto">
            <Table<UserType>
              data={users || []}
              title="Liste des utilisateurs"
              columns={columns}
            />
            <div className="w-[168px] mt-6">
              <Button 
                label="Ajouter un utilisateur" 
                onClickAction={handleButtonClick} 
                //type="button" 
              />
            </div>
          </div>
        </>
      </section>
    </div>
  );
};

export default UsersList;
