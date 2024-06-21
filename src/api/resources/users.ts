import { useQuery, useMutation } from '@tanstack/react-query';
import { axiosClient } from '../config';
import { UserType, ProfessionType } from '../../pages/users/Users.type';

/**
 * Fetches a list of users from the mock server.
 *
 * @returns An array of user objects.
 */
export function useGetUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      return axiosClient.get('/users').then((res) => {
        const users = res.data.map((item: UserType) => ({
          id: item.id.toString(),
          firstname: item.firstname,
          lastname: item.lastname,
          birth_date: item.birth_date,
          phone_number: item.phone_number,
          email: item.email,
          profession: item.profession,
          image_profile: item.image_profile,
        }));
        return users;
      });
    },
    staleTime: 10000,
  });
}

/**
 * Fetches a single user from the mock server.
 *
 * @param userId - The ID of the user to fetch.
 * @returns The user data, or `undefined` if the user does not exist.
 */
export function useGetUser(userId: string | undefined) {
  return useQuery({
    enabled: !!userId,
    staleTime: 10000,
    queryKey: ['users', userId],
    queryFn: async () => {
      return axiosClient.get(`/users/${userId}`).then((res) => res.data);
    },
  });
}

/**
 * Creates a new user in the system.
 *
 * @returns The created user data.
 */
export function useCreateUser() {
  return useMutation((formData: FormData) =>
    axiosClient.post('/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  );
}

/**
 * Utilise useMutation pour modifier un utilisateur.
 *
 * @param userId - L'ID de l'utilisateur à modifier.
 */
export function useEditUser(userId: string | undefined) {
  return useMutation((user: UserType) =>
    axiosClient.patch(`/users/${userId}`, user, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  );
}

/**
 * Utilise useMutation pour supprimer un utilisateur.
 */
export function useDeleteUser() {
  return useMutation((userId: string) =>
    axiosClient.delete(`/users/${userId}`)
  );
}

/**
 * Fetches a list of professions from the mock server.
 *
 * @returns An array of profession objects.
 */
export function useGetProfessions() {
  return useQuery({
    queryKey: ['professions'],
    queryFn: async () => {
      return axiosClient.get('/professions').then((res) => {
        const professions = res.data.map((item: ProfessionType) => ({
          id: item.id.toString(),
          name: item.name,
        }));
        return professions;
      });
    },
    staleTime: 10000,
  });
}

/**
 * Assigns a profession to a user.
 *
 * @param userId - The ID of the user.
 * @param professionId - The ID of the profession to assign.
 */
export function useAssignProfession() {
  return useMutation(({ userId, professionId }: { userId: string, professionId: string }) =>
    axiosClient.post(`/users/${userId}/profession/${professionId}`)
  );
}
