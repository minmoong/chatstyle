<script lang="ts">
  export let name: string;
  export let width = '1rem';
  export let height = '1rem';
  export let focusable = false;
  export let fill: string = '#4880EE';
  const icons = [
      {
        boxWidth: 48,
        boxHeight: 48,
        name: 'send-outlined',
        svg: `<path d="M6 40V8l38 16Zm3-4.65L36.2 24 9 12.5v8.4L21.1 24 9 27Zm0 0V12.5 27Z"/>`
      },
      {
        boxWidth: 48,
        boxHeight: 48,
        name: 'send-filled',
        svg: `<path d="M6 40V27.75L21.1 24 6 20.15V8l38 16Z"/>`
      },
      {
        boxWidth: 640,
        boxHeight: 512,
        name: 'robot',
        svg: `<path d="M9.375 233.4C3.375 239.4 0 247.5 0 256v128c0 8.5 3.375 16.62 9.375 22.62S23.5 416 32 416h32V224H32C23.5 224 15.38 227.4 9.375 233.4zM464 96H352V32c0-17.62-14.38-32-32-32S288 14.38 288 32v64H176C131.8 96 96 131.8 96 176V448c0 35.38 28.62 64 64 64h320c35.38 0 64-28.62 64-64V176C544 131.8 508.3 96 464 96zM256 416H192v-32h64V416zM224 296C201.9 296 184 278.1 184 256S201.9 216 224 216S264 233.9 264 256S246.1 296 224 296zM352 416H288v-32h64V416zM448 416h-64v-32h64V416zM416 296c-22.12 0-40-17.88-40-40S393.9 216 416 216S456 233.9 456 256S438.1 296 416 296zM630.6 233.4C624.6 227.4 616.5 224 608 224h-32v192h32c8.5 0 16.62-3.375 22.62-9.375S640 392.5 640 384V256C640 247.5 636.6 239.4 630.6 233.4z"/>`
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
    viewBox="0 0 {displayIcon.boxWidth} {displayIcon.boxHeight}">{@html displayIcon.svg}</svg>
    {:else}
      <div>아이콘 없음</div>
{/if}