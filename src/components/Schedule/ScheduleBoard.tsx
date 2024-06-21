import GroupSchedule from './GroupSchedule';
import DateHeader from './DateHeader';
import { GroupType } from '../../pages/groups/Group.type';
import { useGetAllGroupSchedules } from '../../api/resources/schedules';

interface ScheduleBoardProps {
  groups: GroupType[];
}

const ScheduleBoard: React.FC<ScheduleBoardProps> = ({ groups }) => {
  const groupIds = groups.map(group => group.id);
  const { data: allSchedules, isLoading, error } = useGetAllGroupSchedules(groupIds);

  if (isLoading) {
    return <div>Chargement de la page...</div>;
  }

  if (error) {
    return <div>Erreur dans le chargement de la page</div>;
  }

  // Extract the shifts with their start_time and the groupID from an array of shifts
  const extractAndConvertStartTimes = (schedules: any[]) => {
    return schedules.map(schedule => ({
      startTimeInMinutes: new Date(schedule.start_time).getTime() / (1000 * 60),
      groupId: schedule.group_id
    }));
  };
  const startTimes = extractAndConvertStartTimes(allSchedules);

  // Find the earliest start time from an array of shift
  const findEarliestTime = (startTimesInMinutes: { startTimeInMinutes: number, groupId: string }[]) => {
    return startTimesInMinutes.reduce((earliest, current) => {
      return current.startTimeInMinutes < earliest.startTimeInMinutes ? current : earliest;
    });
  };
  const earliestStartTimeObj = findEarliestTime(startTimes);

  // Convert the minutes to a date object
  const convertMinutesToDate = (minutes: number) => {
    return new Date(minutes * 60 * 1000);
  };
  const earliestStartTime = convertMinutesToDate(earliestStartTimeObj.startTimeInMinutes);

  // Generating dates for the schedule header
  const generateDates = (start: Date, end: Date) => {
    const dates = [];
    const currentDate = new Date(start);

    while (currentDate <= end) { 
      dates.push(`${currentDate.toLocaleString('default', { weekday: 'long' })} ${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`); 
      currentDate.setDate(currentDate.getDate() + 1); 
  } 
  return dates; 
}; 

  // Generate a date based on the earliest start time
  const startDate = earliestStartTime;
  const endDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
  const dates = generateDates(startDate, endDate);

  return (
    <div className="flex">

      <div className="flex flex-grow overflow-x-auto">
          <DateHeader dates={dates} earliestStartTime={earliestStartTime}>    
          <div className='mb-2'>
            {groups.map((group) => (
              <GroupSchedule 
                key={group.id} 
                group={group} 
                startDate={startDate} 
              />
            ))}
          </div>
        </DateHeader>
      </div>
      <div>
      </div>
    </div>
  );
};

export default ScheduleBoard;