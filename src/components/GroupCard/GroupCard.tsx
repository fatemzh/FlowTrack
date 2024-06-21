import MemberCard from "./MemberCard";
import { UserType } from "../../pages/users/Users.type";
import { useNavigate } from 'react-router-dom';

interface GroupCardProps {
  id: string;
  name: string;
  color: string;
  members?: UserType[];
  onDrop?: (droppedId: string, groupId: string) => void;
}

export default function GroupCard({ id, name, members, color, onDrop }: GroupCardProps): JSX.Element {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/groups/${id}`);
  };

  return (
    <div
      style={{ backgroundColor: `#${color}` }}
      className={`glass cursor-pointer min-w-[250px] max-w-smmin-h-[300px] rounded-lg overflow-hidden shadow-lg mt-3 ml-2 transition-transform duration-200 ease-in-out ${id === 'ungrouped' ? 'sticky top-0' : ''}`}
      onClick={handleClick}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <ul className="text-gray-700 text-base">
          {members ? members.map((member: UserType) => (
            <MemberCard
              key={member.id}
              id={member.id}
              name={`${member.firstname} ${member.lastname}`}
              onClick={() => {}}
              onDrop={(droppedId: string) => onDrop && onDrop(droppedId, id)}
            />
          )) : null}
        </ul>
      </div>
    </div>
  );
}
