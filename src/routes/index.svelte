<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import getRegion from 'src/functions/getRegion';

  export const load: Load = async ({ fetch }) => {
    const region = await getRegion();
    // const res = await getLeaderboardScore(fetch);

    return {
      props: { region }
    };
  };
</script>

<script lang="ts">
  import Chat from 'src/components/Chat.svelte';
  export let region;
  // console.log(region);
</script>

<Chat />