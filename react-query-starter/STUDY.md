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
