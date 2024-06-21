import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button.tsx';
import { useGetGroups } from '../../api/resources/groups';
import GroupCard from '../../components/GroupCard/GroupCard';
import { GroupType } from './Group.type';
import { useGetUsers } from '../../api/resources/users';
import { UserType } from '../users/Users.type';
import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar.tsx';

const GroupsList = () => {
  const { data: groups, isLoading } = useGetGroups();
  const { data: users } = useGetUsers();
  const [groupState, setGroupState] = useState<GroupType[]>([]);
  const [usersWithoutGroup, setUsersWithoutGroup] = useState<UserType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (groups) {
      setGroupState(groups);
    }
    if (users && groups) {
      const groupedUserIds = new Set(groups.flatMap((group: GroupType) => group.members?.map((member) => member.id) || []));
      setUsersWithoutGroup(users.filter((user: UserType) => !groupedUserIds.has(user.id)));
    }
  }, [groups, users]);

  if (isLoading) {
    return <div>Chargement des groupes...</div>;
  }

  return (
    <div className="home-page p-4 font-sans">
      <NavBar />
      <article className="article-header mb-4">
        <header className="flex flex-row justify-between">
          <h1 className="text-2xl">Liste des groupes</h1>
          <hr />
        </header>
      </article>
      <section className="section-content overflow-auto h-screen">
        <>
          <div className="flex flex-row min-w-[1000px] min-h-[750px]">
            <div className='flex flex-wrap'>
              {groupState && groupState.map((group: GroupType) => (
                <GroupCard
                  key={group.id}
                  id={group.id}
                  name={group.name}
                  color={group.color}
                  members={group.members || []}
                />
              ))}
            </div>
            <div className='min-h-sm'>
              <GroupCard
                key='ungrouped'
                id='ungrouped'
                name='Sans groupe'
                color='D6CFC2'
                members={usersWithoutGroup || []}
              />
            </div>
          </div>
          <div className='flex flex-row items-center'>
            <div className="w-[168px] mt-6 mr-6">
              <Button
                label="Ajouter un groupe"
                onClickAction={() => navigate(`/addGroup`)}
              />
            </div>
          </div>
        </>
      </section>
    </div>
  );
}

export default GroupsList;
