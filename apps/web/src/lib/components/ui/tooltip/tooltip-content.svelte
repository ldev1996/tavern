<script lang="ts">
import { Tooltip as TooltipPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "@/lib/utils.js";
import type { WithoutChildrenOrChild } from "@/lib/utils.js";
import TooltipPortal from "./tooltip-portal.svelte";

let {
	ref = $bindable(null),
	class: className,
	sideOffset = 0,
	side = "top",
	children,
	arrowClasses,
	portalProps,
	...restProps
}: TooltipPrimitive.ContentProps & {
	arrowClasses?: string;
	portalProps?: WithoutChildrenOrChild<ComponentProps<typeof TooltipPortal>>;
} = $props();
</script>

<TooltipPortal {...portalProps}>
	<TooltipPrimitive.Content
		bind:ref
		data-slot="tooltip-content"
		{sideOffset}
		{side}
		class={cn(
			"z-50 inline-flex w-fit max-w-xs items-center gap-1.5",
			"border-foreground/10 rounded-md border",
			"bg-foreground text-background px-3 py-1.5 text-xs",
			"shadow-md",
			"data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
			"data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
			"data-[side=bottom]:slide-in-from-top-1",
			"data-[side=left]:slide-in-from-right-1",
			"data-[side=right]:slide-in-from-left-1",
			"data-[side=top]:slide-in-from-bottom-1",
			className,
		)}
		{...restProps}
	>
		{@render children?.()}
		<TooltipPrimitive.Arrow>
			{#snippet child({ props })}
				<div
					class={cn(
						"bg-foreground fill-foreground z-50 size-2.5",
						"translate-y-[calc(-50%-2px)] rotate-45",
						"data-[side=bottom]:-translate-x-1/2 data-[side=bottom]:-translate-y-[calc(-50%+1px)]",
						"data-[side=left]:translate-x-[-1.5px] data-[side=left]:-translate-y-[calc(50%-3px)]",
						"data-[side=right]:translate-x-[calc(50%+2px)] data-[side=right]:translate-y-1/2",
						"data-[side=top]:translate-x-1/2 data-[side=top]:translate-y-[calc(-50%+2px)]",
						arrowClasses,
					)}
					{...props}
				></div>
			{/snippet}
		</TooltipPrimitive.Arrow>
	</TooltipPrimitive.Content>
</TooltipPortal>
