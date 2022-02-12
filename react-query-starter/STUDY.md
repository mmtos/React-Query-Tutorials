# React Query

## Query 상태

- fresh
- fetching
- stale
- inactive

## Query Actions

- Refetch
- Invalidate
- Reset
- Remove

## Caching Option

### cacheTime

- query 결과가 이미 cache되어 있다면 먼저 사용자에게 보여주고 난 후 background에서 re-fetch를 수행한다.
- 이 경우엔 fetch 수행중이라도 isLoading은 false로 유지되고, 대신 isFetching이 true가 된다.
- query 결과에 변경사항이 있다면 해당 컴포넌트가 re-rendering된다.
- 단지 캐시된 쿼리결과를 먼저 보여줄뿐, 서버로의 request의 횟수를 줄이는 건 아니다.

### staleTime

- staleTime 동안 refetching 없이 캐시데이터만 사용자에게 보여준다.
- 따라서 서버로의 request의 횟수를 줄일 수 있다.
- staleTime의 기본값은 0이다.

### refetchingOnMount

- true(기본값)
  - stale query인 경우 컴포넌트 마운트시에 refetch(background fetch)를 시도함.
- false
  - 컴포넌트 마운트시에 refetch를 시도하지 않음.
- 'always'
  - 컴포넌트 마운트시에 stale 여부와 상관없이 항상 refetch 함

### refetchOnWindowFocus

- true(기본값)
- false
- 'always'
  - window focusing 시에 stale 여부와 상관없이 항상 refetch 함

## 여러개의 쿼리를 사용하는 경우

- 정해진 개수 병렬 실행 : parallel query .. 그냥 useQuery 두번 쓰면됨.
- 개수 동적 변경 + 병렬실행 : dynamic parallel query.. useQueries
- 순서가 있는 쿼리들 실행하기 : dependent Queries.. 이전 쿼리가 실행 완료 되었을때만 config obj에 enable을 true가 되도록 설정.

## Initial Query data

- 리스트에서 상세정보를 일부 들고 있는 경우 상세쿼리의 initial data로 넘겨줘서 상세쿼리 fetching시 미리 보여줄 수 있다.
- 리스트에서 상세정보를 모두 들고 있는 경우는 추가적인 상세쿼리가 필요 없을 수 있다.

## 페이징

- keepPreviousData: true (이전 데이터를 화면에 남긴 상태에서 새로운 페이지를 fetch함.)

- infinite paging
  - useInfiniteQuery 사용
  - return 받는 data가 pages로 그룹화되어있음.
  - fetchNextPage
  - getNextPageParam

## mutation

- optimistic update : mutate를 위한 post요청을 보내기 전에 미리 화면을 업데이트 함.

- 문제시 rollback

- useMutate의 onMutate,onError,onSettled Callback을 이용해서 구현

## RQ devtool 사용법

```
import { ReactQueryDevtools } from "react-query/devtools";

...

<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />

```

## TIP

- chrome throttring 기능
  - dev tool > Network > throttring preset 중 선택
-

## URLs

- SWR : https://web.dev/i18n/ko/stale-while-revalidate/
- out of the box : https://web-front-end.tistory.com/84
