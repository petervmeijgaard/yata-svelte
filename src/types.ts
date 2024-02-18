import { type Snippet } from "svelte";

export type PropsWithChildren<P = object> = P & {
	children?: Snippet | undefined;
};
