<script lang="ts">
  export let name: string;
  export let width = '1rem';
  export let height = '1rem';
  export let focusable = false;
  export let fill: string = '#4880EE';
  const icons = [
      {
        box: 48,
        name: 'send-outlined',
        svg: `<path d="M6 40V8l38 16Zm3-4.65L36.2 24 9 12.5v8.4L21.1 24 9 27Zm0 0V12.5 27Z"/>`
      },
      {
        box: 48,
        name: 'send-filled',
        svg: `<path d="M6 40V27.75L21.1 24 6 20.15V8l38 16Z"/>`
      }
  ];
  const displayIcon: any = icons.find(e => e.name === name);
</script>

{#if displayIcon !== undefined}
  <svg
    class={$$props.class}
    focusable={String(focusable)}
    {width}
    {height}
    {fill}
    viewBox="0 0 {displayIcon.box} {displayIcon.box}">{@html displayIcon.svg}</svg>
    {:else}
      <div>아이콘 없음</div>
{/if}