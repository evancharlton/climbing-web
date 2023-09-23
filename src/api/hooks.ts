import { useAuth0 } from "@auth0/auth0-react";
import {
  UseMutationOptions,
  MutationFunction,
  useMutation,
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Success } from "../@types/buldreinfo";
import { components } from "../@types/buldreinfo/swagger";
import { useLocalStorage } from "../utils/use-local-storage";
import { useRedirect } from "../utils/useRedirect";
import { makeAuthenticatedRequest } from "./utils";
import { FetchOptions } from "./types";

function useKey(
  customKey: readonly unknown[] | undefined,
  urlSuffix: string,
): readonly unknown[] {
  const { isAuthenticated } = useAuth0();
  const key = customKey ?? [urlSuffix, { isAuthenticated }];
  if (Array.isArray(key) && key[1] && typeof key[1] === "object") {
    // Spread them in this order so that callers can choose to ignore the
    // isAuthenticated variable if they choose to.
    key[1] = {
      isAuthenticated,
      ...key[1],
    };
  }
  return key;
}

export function usePostData<TVariables, TData = Response>(
  urlSuffix: string,
  {
    fetchOptions,
    createUrl = () => urlSuffix,
    select = (resp) => resp as TData,
    ...options
  }: Partial<
    UseMutationOptions<TData, unknown, TVariables> & {
      fetchOptions: FetchOptions;
      createUrl: (variables: TVariables) => string;
      select: (
        response: Response,
        variables: TVariables,
      ) => TData | Promise<TData>;
      createBody: (variables: TVariables) => BodyInit;
    }
  > = {},
) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const mutationKey = useKey(options.mutationKey, urlSuffix);

  const mutationFn: MutationFunction<TData, TVariables> = async (variables) => {
    const accessToken = isAuthenticated ? await getAccessTokenSilently() : null;

    const url = createUrl(variables);
    const createBody = options.createBody ?? JSON.stringify;

    const res = await makeAuthenticatedRequest(accessToken, url, {
      method: "POST",
      body: createBody(variables),
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions?.headers,
      },
      ...fetchOptions,
    });

    return select(res, variables);
  };

  return useMutation<TData, unknown, TVariables>(mutationKey, mutationFn, {
    ...options,
  });
}

export function useData<TQueryData = unknown, TData = TQueryData>(
  urlSuffix: string,
  {
    queryKey: customQueryKey,
    ...options
  }: Partial<
    Omit<
      UseQueryOptions<TQueryData, unknown, TData>,
      "queryFn" | "placeholderData" | "initialData" | "structuralSharing"
    > & {
      placeholderData: TQueryData | (() => TQueryData);
      initialData: TQueryData | (() => TQueryData);
    }
  > = {},
) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const queryKey = useKey(customQueryKey, urlSuffix);

  const queryFn: () => Promise<TQueryData> = async (): Promise<TQueryData> => {
    const accessToken = isAuthenticated ? await getAccessTokenSilently() : null;
    const res = await makeAuthenticatedRequest(accessToken, urlSuffix);
    return res.json();
  };

  const data = useQuery<TQueryData, unknown, TData>(queryKey, queryFn, options);
  const redirectUi = useRedirect(data.data);
  data.isFetched;
  return { ...data, redirectUi };
}

export function useProblems() {
  const [cachedData, _, writeCachedData] = useLocalStorage<
    components["schemas"]["ProblemArea"][]
  >("cache/problems", []);

  return useData<components["schemas"]["ProblemArea"][]>("/problems", {
    placeholderData: cachedData,
    select(data) {
      writeCachedData(data);
      return data;
    },
  });
}

export function useActivity({
  idArea,
  idSector,
  lowerGrade,
  fa,
  comments,
  ticks,
  media,
}: {
  idArea: number;
  idSector: number;
  lowerGrade: number;
  fa: boolean;
  comments: boolean;
  ticks: boolean;
  media: boolean;
}) {
  return useData<Success<"getActivity">>(
    `/activity?idArea=${idArea}&idSector=${idSector}&lowerGrade=${lowerGrade}&fa=${fa}&comments=${comments}&ticks=${ticks}&media=${media}`,
    {
      queryKey: [
        `/activity`,
        { idArea, idSector, lowerGrade, fa, comments, ticks, media },
      ],
    },
  );
}

export function useAreas() {
  return useData<Success<"getAreas">>(`/areas`, {
    queryKey: [`/areas`],
  });
}

export function useArea(id: number) {
  return useData<Success<"getAreas">, Success<"getAreas">[number] | undefined>(
    `/areas?id=${id}`,
    {
      queryKey: [`/areas`, { id }],
      enabled: id > 0,
      select(response) {
        if (response?.[0].redirectUrl) {
          window.location.href = response?.[0].redirectUrl;
        }
        return response?.[0];
      },
    },
  );
}

export function useMediaSvg(idMedia: number) {
  const { data, ...dataResult } = useData<any>(`/media?idMedia=${idMedia}`, {
    queryKey: [`/media`, { idMedia }],
  });

  const mutation = usePostData(`/media/svg`);

  return { media: data, save: mutation.mutateAsync, ...dataResult };
}

export function useProblem(id: number, showHiddenMedia: boolean) {
  const client = useQueryClient();
  const problem = useData<Success<"getProblem">>(
    `/problem?id=${id}&showHiddenMedia=${showHiddenMedia}`,
    {
      enabled: id > 0,
      queryKey: [`/problem`, { id, showHiddenMedia }],
    },
  );
  const { data: profile } = useProfile(-1);
  const toggleTodo = usePostData(`/todo?idProblem=${id}`, {
    mutationKey: [`/todo`, { id }],
    onSuccess: () => {
      problem.refetch();
      if (problem.data?.sectorId) {
        client.refetchQueries({
          queryKey: [
            `/sectors`,
            {
              isAuthenticated: true,
              id: problem.data.sectorId,
            },
          ],
        });
      }
      if (problem.data?.areaId) {
        client.refetchQueries({
          queryKey: [
            `/areas`,
            {
              isAuthenticated: true,
              id: problem.data.areaId,
            },
          ],
        });
      }
      if (profile?.id) {
        client.refetchQueries({
          queryKey: [`/profile/todo`, { id: +profile.id }],
        });
      }
    },
    fetchOptions: {
      consistencyAction: "nop",
    },
  });

  return { ...problem, toggleTodo: toggleTodo.mutateAsync };
}

export function useProfile(userId: number = -1) {
  const client = useQueryClient();
  const { isAuthenticated } = useAuth0();
  const profile = useData<components["schemas"]["Profile"]>(
    `/profile?id=${userId}`,
    {
      queryKey: [`/profile`, { id: userId }],
      enabled: userId > 0 || isAuthenticated,
    },
  );

  const addRegion = usePostData<number>(`/user/regions`, {
    createUrl: (regionId) =>
      `/user/regions?regionId=${regionId}&delete=${false}`,
  });

  const removeRegion = usePostData<number>(`/user/regions`, {
    createUrl: (regionId) =>
      `/user/regions?regionId=${regionId}&delete=${true}`,
  });

  const setRegion = usePostData<{
    region: components["schemas"]["UserRegion"];
    del: boolean;
  }>(`/user/regions`, {
    createUrl: ({ region: { id }, del }) =>
      `/user/regions?regionId=${id}&delete=${del}`,
    fetchOptions: {
      consistencyAction: "nop",
    },
    onMutate: ({ region, del }) => {
      client.setQueryData<components["schemas"]["Profile"]>(
        [`/profile`, { id: userId, isAuthenticated }],
        (old) => {
          if (old && typeof old === "object") {
            const next = {
              ...old,
              userRegions: old.userRegions.map((oldRegion) => {
                if (oldRegion.id !== region.id) {
                  return oldRegion;
                }
                return {
                  ...oldRegion,
                  enabled: !del,
                };
              }),
            };
            return next;
          }
          return old;
        },
      );
    },
    onError: () => {
      client.refetchQueries({
        queryKey: [`/profile`, { id: -1 }],
      });
    },
    onSettled: () => {
      client.refetchQueries({
        queryKey: [`/areas`],
      });
      client.refetchQueries({
        queryKey: [`/problems`],
      });
      client.refetchQueries({
        queryKey: [`/dangerous`],
      });
    },
  });

  return {
    ...profile,
    addRegion: addRegion.mutateAsync,
    removeRegion: removeRegion.mutateAsync,
    setRegion: setRegion.mutateAsync,
  };
}

export function useProfileMedia({
  userId,
  captured,
}: {
  userId: number;
  captured: boolean;
}) {
  return useData<Success<"getProfilemedia">>(
    `/profile/media?id=${userId}&captured=${captured}`,
    {
      queryKey: [`/profile/media`, { id: userId, captured }],
    },
  );
}

export function useProfileStatistics(id: number) {
  return useData<components["schemas"]["ProfileStatistics"]>(
    `/profile/statistics?id=${id}`,
    {
      queryKey: [`/profile/statistics`, { id }],
    },
  );
}

export function useProfileTodo(id: number) {
  return useData<Success<"getProfileTodo">>(`/profile/todo?id=${id}`, {
    queryKey: [`/profile/todo`, { id }],
  });
}

export function useSector(id: number | undefined) {
  return useData<Success<"getSectors"> | undefined>(`/sectors?id=${id}`, {
    enabled: !!id && id > 0,
    queryKey: [`/sectors`, { id }],
  });
}

export function useTicks(page: number) {
  return useData<{
    ticks: {
      problemId: number;
      date: string;
      areaName: string;
      areaLockedAdmin: boolean;
      areaLockedSuperadmin: boolean;
      sectorName: string;
      sectorLockedAdmin: boolean;
      sectorLockedSuperadmin: boolean;
      problemName: string;
      problemLockedAdmin: boolean;
      problemLockedSuperadmin: boolean;
      name: string;
      problemGrade: string;
    }[];
    currPage: number | string;
    numPages: number;
    activePage: number;
  }>(`/ticks?page=${page}`, {
    queryKey: [`/ticks`, { page }],
  });
}

export function useTodo({
  idArea,
  idSector,
}: {
  idArea: number;
  idSector: number;
}) {
  return useData<Success<"getTodo">>(
    `/todo?idArea=${idArea}&idSector=${idSector}`,
  );
}

export function useTop({
  idArea,
  idSector,
}: {
  idArea: number;
  idSector: number;
}) {
  return useData<Success<"getTop">>(
    `/top?idArea=${idArea}&idSector=${idSector}`,
  );
}

export function useSearch() {
  const { mutateAsync, data, ...rest } = usePostData<
    { value: string },
    components["schemas"]["Search"][]
  >(`/search`, {
    select(response) {
      return response.json();
    },
    fetchOptions: {
      consistencyAction: "nop",
    },
  });

  return { search: mutateAsync, ...rest, data: data ?? [] };
}

export function useTrash() {
  const { data } = useData<components["schemas"]["Trash"][]>(`/trash`);

  const restore = usePostData<components["schemas"]["Trash"], string>(
    `/trash`,
    {
      fetchOptions: {
        method: "PUT",
        body: undefined,
      },
      createUrl: ({ idArea, idProblem, idSector, idMedia }) =>
        `/trash?idArea=${idArea}&idSector=${idSector}&idProblem=${idProblem}&idMedia=${idMedia}`,
      select(_response, { idArea, idSector, idProblem, idMedia }) {
        let url = `/`;
        if (idArea) {
          url = `/area/${idArea}`;
        } else if (idSector) {
          url = `/sector/${idSector}`;
        } else if (idProblem) {
          url = `/problem/${idProblem}`;
        }
        if (idMedia) {
          url += `?idMedia=${idMedia}`;
        }
        return url;
      },
    },
  );

  return {
    data,
    restore: restore.mutateAsync,
  };
}