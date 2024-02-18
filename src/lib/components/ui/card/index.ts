import { default as Card } from "./card.svelte";
import { default as Content } from "./card-content.svelte";
import { default as Description } from "./card-description.svelte";
import { default as Footer } from "./card-footer.svelte";
import { default as Header } from "./card-header.svelte";
import { default as Title } from "./card-title.svelte";
export { type HeadingLevel } from "./types";

export { Card as Root, Content, Description, Footer, Header, Title };

export {
	Card,
	Content as CardContent,
	Description as CardDescription,
	Footer as CardFooter,
	Header as CardHeader,
	Title as CardTitle,
};
