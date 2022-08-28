<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import { myCounter } from 'src/store';
  import { browser } from '$app/env';

  export const load: Load = async () => {
    if (browser) {
      myCounter.set({ score: localStorage.myCount ? +localStorage.myCount : 0, increasement: 0 });
    }
  };
</script>

<script lang="ts">
  import Chat from 'src/components/Chat.svelte';
  import Help from 'src/components/Help.svelte';
  import { onDestroy } from 'svelte';
  import { api } from 'src/api';
  import { getRegion } from 'src/functions';

    onDestroy(async () => {
      if (browser) {
        await api<'notMoving'>('POST', '/api/notMoving', { // TODO: 귀1찮아서 따로 함수 안만들었다.
          region: await getRegion()
        });
      }
    });
</script>

<Help />
<Chat />