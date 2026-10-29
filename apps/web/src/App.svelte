<script>
import "@/app.css";
import { Button } from "@/lib/components/ui/button";
import { getLocales, localeName, setLocale, t } from "@/modules/i18n";

let count = $state(0);
</script>

<main class="mx-7 my-6">
	<h1>{t("count.is.{count}", { count })}</h1>
	<div class="mt-2 flex gap-2">
		{#each getLocales() as locale (locale)}
			<Button variant="outline" onclick={() => setLocale(locale)}>{localeName(locale)}</Button>
		{/each}
		<Button variant="default" onclick={() => count++}>{t("count.increment")}</Button>
		<Button variant="secondary" onclick={() => count--}>{t("count.decrement")}</Button>
	</div>
</main>
