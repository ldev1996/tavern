<script>
import "./app.css";
import Button from "./lib/components/ui/button/button.svelte";

let count = $state(0);
</script>

<main class="mx-7 my-6">
	<h1>Count is {count}</h1>
	<Button variant="default" onclick={() => count++}>Increment</Button>
	<Button variant="secondary" onclick={() => count--}>Decrement</Button>
</main>
