import { useQuery, useMutation } from '@tanstack/react-query';
import { axiosClient } from '../config';
import { GroupType, UserType } from '../../pages/groups/Group.type';

/**
 * Fetches all groups
 * @returns - An array of groups
 */
export function useGetGroups() {
    return useQuery({
        queryKey: ['groups'],
        queryFn: async () => {
            return axiosClient.get('/groups').then((res) => {
                const groups = res.data.map((item: GroupType) => ({
                    id: item.id.toString(),
                    name: item.name,
                    color: item.color,
                    members: item.members?.map((memberId: number) => ({
                        ...res.data.find((user: UserType) => user.id === memberId),
                    })) || [],
                }));
                return groups;
            });
        },
        staleTime: 10000,
    });
}

/**
 * Fetches a specific group
 * @param groupId - ID of the group to fetch
 * @returns - The datas of the group
 */
export function useGetGroup(groupId: string | undefined) {
    return useQuery({
        enabled: !!groupId,
        staleTime: 10000,
        queryKey: ['groups', groupId],
        queryFn: async () => {
            return axiosClient.get(`/groups/${groupId}`).then((res) => {
                return {
                    ...res.data,
                    members: res.data.members?.map((memberId: number) => ({
                        ...res.data.find((user: UserType) => user.id === memberId),
                    })) || [],
                };
            });
        },
    });
}

/**
 * Creates a new group with a POST request to send form data
 */
export function useCreateGroup() {
    return useMutation((formData: FormData) =>
        axiosClient.post('/groups', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    );
}

/**
 * Updates a group with the modified datas from the form
 * @param groupId id of the group to update
 */
export function useEditGroup(groupId: string | undefined) {
    return useMutation((group: GroupType) =>
        axiosClient.patch(`/groups/${groupId}`, group)
    );
}

/**
 * Deletes a specific group
 */
export function useDeleteGroup() {
    return useMutation((groupId: string) =>
        axiosClient.delete(`/groups/${groupId}`)
    );
}

/**
 * Adds a member to a group
 */
export function useAssignUser() {
    return useMutation(({ groupId, userId }: { groupId: GroupType['id'], userId: UserType['id'] }) =>
        axiosClient.post(`/groups/${groupId}/users/${userId}`)
    );
}

/**
 * Withdraws a member from a group
 */
export function useWithdrawUser() {
    return useMutation(({ groupId, userId }: { groupId: GroupType['id'], userId: UserType['id'] }) =>
        axiosClient.delete(`/groups/${groupId}/users/${userId}`)
    );
}
