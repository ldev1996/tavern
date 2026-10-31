<script lang="ts">
import * as Icon from "@lucide/svelte";
import { onMount } from "svelte";
import { link, listen, Route, Router } from "svelte5-router";
import * as Sidebar from "@/lib/components/ui/sidebar";
import * as Tooltip from "@/lib/components/ui/tooltip";
import { t } from "@/modules/i18n";
import { CreatePage, ExplorePage, PartiesPage, ProfilePage } from "@/pages";

let { url = "" }: { url?: string } = $props();
let currentPath = $state("");

const navigation = [
	{
		href: "/",
		label: "page.parties",
		icon: Icon.Users,
		page: PartiesPage,
	},
	{
		href: "/explore",
		label: "page.explore",
		icon: Icon.Compass,
		page: ExplorePage,
	},
	{
		href: "/create",
		label: "page.create",
		icon: Icon.Plus,
		page: CreatePage,
	},
	{
		href: "/profile",
		label: "page.profile",
		icon: Icon.UserRound,
		page: ProfilePage,
	},
];

type Route = (typeof navigation)[0];

onMount(() => {
	currentPath = window.location.pathname;

	return listen(({ location }) => {
		currentPath = location.pathname;
	});
});
</script>

<!-- Reusable navigation item -->
{#snippet navItem(item: Route)}
	{@const NavIcon = item.icon}

	<Sidebar.MenuItem>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{#snippet child({ props: triggerProps })}
					<Sidebar.MenuButton
						{...triggerProps}
						isActive={currentPath === item.href}
						class="h-10 min-h-10"
					>
						{#snippet child({ props })}
							<a href={item.href} use:link {...props}>
								<NavIcon class="size-5 shrink-0" />
								<span>{t(item.label)}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				{/snippet}
			</Tooltip.Trigger>

			<Tooltip.Content side="right">
				{t(item.label)}
			</Tooltip.Content>
		</Tooltip.Root>
	</Sidebar.MenuItem>
{/snippet}

<!-- Reusable route -->
{#snippet pageRoute(item: Route)}
	<Route path={item.href} component={item.page} />
{/snippet}

{#snippet logo()}
	<div
		class="flex h-10 min-h-10 items-center gap-2
        overflow-hidden rounded-md px-2
        group-data-[collapsible=icon]:justify-center"
	>
		<Icon.Beer class="size-5 shrink-0" />
		<span
			class="truncate font-semibold
            group-data-[collapsible=icon]:hidden"
		>
			Tavern
		</span>
	</div>
{/snippet}

<Sidebar.Provider>
	<Sidebar.Root collapsible="icon" variant="inset">
		<Sidebar.Header>
			{@render logo()}
		</Sidebar.Header>

		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each navigation as item (item.href)}
							{@render navItem(item)}
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		</Sidebar.Content>

		<Sidebar.Rail />
	</Sidebar.Root>

	<Sidebar.Inset>
		<header class="flex h-14 shrink-0 items-center gap-3 border-b px-4 md:hidden">
			<Sidebar.Trigger />
			{@render logo()}
		</header>

		<main class="mx-auto min-h-[calc(100svh-3.5rem)] w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
			<Router {url}>
				{#each navigation as item (item.href)}
					{@render pageRoute(item)}
				{/each}
			</Router>
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>
