import { Link } from 'react-router-dom';

interface MemberCardProps {
  id: string;
  name?: string;
  onClick?: () => void;
  onDrop?: () => void;
}

export default function MemberCard({ id, name, onClick, onDrop }: MemberCardProps): JSX.Element {
  return (
    <div>
      <ul className="text-gray-700 text-base">
        <Link to={'/users/' + id}>
          <li className="hover:text-white rounded" 
              key={id} 
              onClick={onClick} 
              onDrop={onDrop}>
            {name}
          </li>
        </Link>
      </ul>
    </div>
  );
}
