<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import getLocationInfo from 'src/functions/getLocationInfo';

  export const load: Load = async () => {
    const location = await getLocationInfo();
    return {
      props: { location }
    };
  }
</script>

<script lang="ts">
  import Chat from 'src/components/Chat.svelte';
  export let location;

  console.log(location);
</script>

<Chat />