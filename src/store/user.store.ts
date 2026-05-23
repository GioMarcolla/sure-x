import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AvatarType = {
    id: string;
    r2Key: string;
    width: number;
    height: number;
    alt: string;
};

export type UserType = {
    id: string;
    firstName: string;
    middleNames: string;
    lastName: string;
    email: string;
    username: string;
    bio?: string | null;
    birthdate?: string | null;
    activityScore?: number | null;
    avatar: AvatarType | null;
};

type UserState = {
    user: UserType | null;
    isLoaded: boolean;

    getUser: () => UserType | null;
    setUser: (user: UserType) => void;
    clearUser: () => void;
    updateUser: (partial: Partial<UserType>) => void;

    hasAvatar: () => boolean;
};

/**
 * Creates a Zustand store for user state management.
 * @returns {UserState} - The user store.
 */
export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            isLoaded: false,

            /**
             * Retrieves the current user state.
             * @returns {User | null} - The current user state, or null if not found.
             */
            getUser: () => get().user,

            /**
             * Sets the user state and marks it as loaded.
             * @param {User} user - The user to set.
             */
            setUser: (user) =>
                set({
                    user,
                    isLoaded: true,
                }),

            /**
             * Clears the user state and marks it as loaded.
             */
            clearUser: () =>
                set({
                    user: null,
                    isLoaded: false,
                }),

            /**
             * Updates the user state by merging the provided partial object
             * into the existing user state. If the user state is null, the
             * partial object is ignored.
             * @param {Partial<User>} partial - The partial user object to merge.
             */
            updateUser: (partial) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...partial } : null,
                })),

            /**
             * Checks if the user has an avatar.
             * @returns {boolean} - True if the user has an avatar, false otherwise.
             */
            hasAvatar: () => Boolean(get().user?.avatar),
        }),
        {
            name: 'user-ui-state',

            /**
             * Partializes the user state by returning only the user object.
             * This is useful for persisting the user state in a way that doesn't
             * include the isLoaded flag.
             * @param {UserState} state - The user state to partialize.
             * @returns {Partial<UserState>} - The partialized user state.
             */
            partialize: (state) => ({
                user: state.user,
            }),
        }
    )
);
