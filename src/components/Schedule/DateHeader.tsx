import { useEffect, useState } from 'react';

interface DateHeaderProps { 
    dates: string[]; 
    children: React.ReactNode;
    earliestStartTime: Date;
} 

const DateHeader: React.FC<DateHeaderProps> = ({ dates, earliestStartTime, children }: DateHeaderProps) => { 

    // Create a date header displaying every hour of a day
    const generateHours = (startHour: number) => {
        const hours = [];
        for (let i = 0; i < 24; i++) {
            const hour = (startHour + i) % 24;
            hours.push(`${hour}h`);
        }
        return hours;
    };

    // Generate today's date and time for the visual indicator
    const getToday = () => {
        const today = new Date();
        const currentDate = `${today.toLocaleString('default', { weekday: 'long' })} ${today.getDate()} ${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}`;
        return currentDate;
    };

    // Calculate the position for today's date
    const calculateCurrentPosition = () => {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

        // Adjust for time zone if needed
        const timeZoneOffset = now.getTimezoneOffset() * 60000; 
        const localTime = now.getTime() - timeZoneOffset;
        const elapsedMinutes = (localTime - startOfDay.getTime()) / (1000 * 60);
        const pixelsPerMinute = 1200 / (24 * 60); 
        return elapsedMinutes * pixelsPerMinute;
    };

    const [currentPosition, setCurrentPosition] = useState(calculateCurrentPosition());

    // TODO: check why the visual indicator is not being displayed at the right time
    // Update the position of the current time every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPosition(calculateCurrentPosition());
        }, 60000); // Updates every minute

        return () => clearInterval(interval);
    }, []);

    // Get the earliest start time of all schedules as a starting point
    const startHour = earliestStartTime.getHours();
    const hours = generateHours(startHour);
    
    return ( 
        <div className="bg-white top-0 z-10 shadow relative"> 
            <div className="flex overflow-x-auto py-2 mb-1 ml-12"> 
                {dates.map((date, index) => {
                    const isToday = date === getToday();
                    return (
                        <div key={index} className="w-[1200px] px-4 py-2 bg-gray-100 rounded-lg text-center relative"> 
                            <h3 className="text-sm font-semibold text-gray-800">{date}</h3> 
                            {/* Visual indicator for the current's date and time */}
                            {isToday && (
                                <div 
                                    className="absolute top-0 h-full border-l-2 border-red-500 opacity-70" 
                                    style={{ left: `${currentPosition}px` }}
                                />
                            )}
                            <div className="flex justify-between text-sm font-medium text-gray-500 mt-1"> 
                                {hours.map(hour => ( 
                                    <span key={hour}>{hour}</span> 
                                ))} 
                            </div> 
                        </div> 
                    );
                })} 
            </div> 
            <div className="group-schedules">
                {children}
            </div>
        </div> 
    ); 
}; 

export default DateHeader;
