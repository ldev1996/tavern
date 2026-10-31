<script lang="ts">
import "@/app.css";

import { Route, Router } from "svelte5-router";
// import AuthLayout from "@/layouts/auth.svelte";
import MainLayout from "@/layouts/main.svelte";

const url = $state("");
</script>

<Router {url}>
	<!-- <Route path="/auth" component={AuthLayout} {url} />
	<Route path="/auth/*rest" component={AuthLayout} {url} /> -->

	<Route component={MainLayout} {url} />
</Router>
