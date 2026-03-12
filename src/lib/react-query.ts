import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions:{
    queries: {
   
    }
  }
})

// export const refetchInitialPage = async <T>(
//   key: string,
//   refetch: (options?: RefetchOptions) => Promise<any>,
//   ...args: unknown[]
// ): Promise<void> => {
//   queryClient.setQueryData<InfiniteData<T>>([key, ...args], (oldData) => {
//     if (oldData?.pages && oldData.pageParams) {
//       return {
//         ...oldData,
//         pages: oldData.pages.slice(0, 1),
//         pageParams: oldData.pageParams.slice(0, 1)
//       }
//     }
//     return oldData
//   })

//   await refetch()
// }
