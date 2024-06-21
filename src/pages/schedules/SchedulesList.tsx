import { useGetGroups } from '../../api/resources/groups';
import AddShiftModal from '../../components/Schedule/AddShift';
import ScheduleBoard from '../../components/Schedule/ScheduleBoard';
import Zoom from '../../components/Zoom.tsx';

const SchedulesList = () => {
  const { data: groups, isLoading: groupsLoading, error: groupsError } = useGetGroups();

  if (groupsLoading) {
    return <div>Chargement de la page...</div>;
  }

  if (groupsError) {
    return <div>Erreur dans le chargement de la page</div>;
  }

  return (
    <div className="overflow-x-auto">
      <article className="article-header mb-4">
        <header className="flex flex-row justify-between">
          <h1 className="text-2xl">Schedules</h1>
          <hr />
        </header>
      </article>
      <div className='flex justify-end'>
        <AddShiftModal/>
      </div>
      <Zoom>
        <ScheduleBoard groups={groups}/>
      </Zoom>
    </div>
  );
};

export default SchedulesList;

