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
