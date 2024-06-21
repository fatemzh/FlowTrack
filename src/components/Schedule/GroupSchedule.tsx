import { useState, useEffect } from 'react';
import TimeSlot from "./TimeSlot";
import { ScheduleType } from "../../pages/schedules/Schedules.type";
import { GroupType } from "../../pages/groups/Group.type";
import { useDeleteShift, useGetGroupSchedule } from '../../api/resources/schedules';

interface GroupScheduleProps {
  group: GroupType;
  startDate: Date;
}

const GroupSchedule: React.FC<GroupScheduleProps> = ({ group, startDate }: GroupScheduleProps) => {
  const { data: slotsData, isLoading, error } = useGetGroupSchedule(group.id);
  const [slots, setSlots] = useState<ScheduleType[]>([]);
  const { mutate: deleteShift } = useDeleteShift();

  useEffect(() => {
    if (slotsData) {
      setSlots(slotsData);
      if (group.name === 'B') {
        console.log('Shifts for Group B:', slotsData);
      }
    }
  }, [slotsData, group.name]);

  if (isLoading) {
    return <div>Loading schedules for {group.name}...</div>;
  }

  if (error) {
    return <div>Error loading schedules for {group.name}</div>;
  }

  const pxPerHour = 50;
  const getLeftPx = (startTime: string) => {
    const startDateTime = new Date(startTime).getTime();
    const baseDateTime = startDate.getTime();
    const hoursFromBase = (startDateTime - baseDateTime) / (1000 * 60 * 60);
    return hoursFromBase * pxPerHour;
  };

  const getLength = (start: string, end: string) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const durationHours = (endTime - startTime) / (1000 * 60 * 60);
    return durationHours * pxPerHour;
  };

  const handleDeleteShift = (id: string) => {
    deleteShift(id, {
      onSuccess: () => {
        setSlots(slots.filter(slot => slot.id !== id));
        alert('Shift deleted successfully');
      },
      onError: (error) => {
        alert(`Error deleting shift: ${error.message}`);
      }
    });
  };

  return (
    <div className="flex flex-row items-start border-b-2 border-indigo-100 p-1 h-[60px]">
      <div className="mr-12">
        <div
          key={group.id}
          style={{ backgroundColor: `#${group.color}` }}
          className="flex w-[50px] h-[50px] items-center justify-center rounded-xl absolute opacity-80">
          {group.name}
       Here is the continued and updated `GroupSchedule` component:

```tsx
        </div>
      </div>
      <div className="flex flex-row relative">
        {slots?.map((slot: ScheduleType) => (
          <TimeSlot
            key={slot.id}
            id={slot.id}
            color={group.color}
            leftPx={getLeftPx(slot.start_time)}
            lengthPx={getLength(slot.start_time, slot.end_time)}
            group_id={group.id}
            start_time={slot.start_time}
            end_time={slot.end_time}
            onDelete={handleDeleteShift}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupSchedule;
