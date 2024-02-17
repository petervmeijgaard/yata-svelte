type Todo = {
	text: string;
	completed: boolean;
};

export const useTodos = (initialState: Array<Todo> = []) => {
	const todos = $state<Array<Todo>>(initialState);

	const addTodo = (input: string) => {
		todos.unshift({
			text: input,
			completed: false,
		});
	};

	const toggleTodo = (index: number) => {
		todos[index].completed = !todos[index].completed;
	};

	const removeTodo = (index: number) => {
		todos.splice(index, 1);
	};

	return {
		todos,
		toggleTodo,
		addTodo,
		removeTodo,
	};
};
