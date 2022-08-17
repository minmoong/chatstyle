<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    setInterval(async () => {
      console.log('5초에 한번씩 실행됩니다.');
    }, 5000);
  });
</script>

<div>
</div>

<style lang="scss">
</style>
