<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import getLocationInfo from 'src/functions/getLocationInfo';

  type Location = {
    city: string;
    country: string;
    hostname: string;
    ip: string;
    loc: string;
    org: string;
    postal: string;
    region: string;
    timezone: string;
  }

  export const load: Load = async ({ fetch }) => {
    const location: Location = await getLocationInfo({ fetch });
    return {
      props: { location }
    };
  }
</script>

<script lang="ts">
  import Chat from 'src/components/Chat.svelte';
  export let location: Location;
</script>

<div>{JSON.stringify(location)}</div>
<Chat />