<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import getLocationInfo from 'src/functions/getLocationInfo';
  import getLeaderboardScore from 'src/functions/getLeaderboardScore';

  export const load: Load = async ({ fetch }) => {
    let isDomestic: boolean;
    let region: string;

    const location = await getLocationInfo();
    if (location.country === 'KR') {
      isDomestic = true;
      region = await translateRegion('Daejeon');
    } else {
      isDomestic = false;
      region = '다른 나라';
    }

    const res = await getLeaderboardScore(fetch);
    return {
      props: { isDomestic, region }
    };
  };
</script>

<script lang="ts">
  import Chat from 'src/components/Chat.svelte';
  import Leaderboard from 'src/components/Leaderboard.svelte';
  import translateRegion from 'src/util/translateRegion';
  export let isDomestic: boolean;
  export let region: string;

  console.log(isDomestic, region);
</script>

<Chat />
<Leaderboard />