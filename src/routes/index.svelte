<!-- <script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {

    // return {
    //   props: { region }
    // };
  };
</script> -->

<script lang="ts">
  import Chat from 'src/components/Chat.svelte';
</script>

<Chat />