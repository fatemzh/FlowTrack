import { useMutation, useQuery, useQueries } from '@tanstack/react-query';
import { axiosClient } from '../config';
import { ScheduleType } from '../../pages/schedules/Schedules.type';

/**
 * Fetch the schedule of a specific group.
 * @param groupId - The id of the of the specified group
 * @returns - The schedule of the specified group
 */
export function useGetGroupSchedule(groupId:string | undefined){
    return useQuery({
        enabled: !!groupId,
        staleTime: 10000,
        queryKey: ['schedule', groupId],
        queryFn: async () => {
            return axiosClient.get(`/schedules/${groupId}`).then((res) => {
            return res.data
            });
        },
    })
}

/**
 * Fetch the schedules of all groups
 * @param groupId - an Array of Ids of the group whose schedule needs to be fetched.
 * @returns - an Array of schedules
 */
export const useGetAllGroupSchedules = (groupIds: string[]) => {
    const queryConfigs = groupIds.map(groupId => ({
        queryKey: ['schedule', groupId],
        queryFn: async () => {
            const data = await axiosClient.get(`/schedules/${groupId}`).then(res => res.data);
            return data.map((schedule:ScheduleType) => ({ ...schedule, group_id: groupId }));
        },
        enabled: !!groupId,
        staleTime: 10000
    }));

    const results = useQueries({ queries: queryConfigs });
    const isLoading = results.some(result => result.isLoading);
    const error = results.find(result => result.error)?.error;
    const data = results.flatMap(result => result.data || []);
    return { data, isLoading, error };
};

/**
 * Creates a new shift.
 */
export function useCreateShift(){
    return useMutation((formData: FormData) => axiosClient.post('/schedules', formData, {
        headers: { 
            'Content-Type': 'multipart/form-data' 
        } 
    }));
}

/**
 * Updates an existing shift.
 * @param scheduleId - The id of the schedule to be updated.
 */
export function useEditShift(scheduleId:string | undefined){
    return useMutation((schedule: ScheduleType) => axiosClient.post(`/schedules/${scheduleId}`, schedule,{
        headers: { 
            'Content-Type': 'multipart/form-data',
            '_method':'PUT' ,
        }
    }));
}

/**
 * Deletes a shift.
 */
export function useDeleteShift(){
    return useMutation((scheduleId: string) => axiosClient.delete(`/schedules/${scheduleId}`));
}