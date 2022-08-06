<script lang="ts">
  import Ripple from '@smui/ripple';
  import Icon from 'src/util/Icon.svelte';

  let value = '';

  function onSubmit() {
    console.log(value);
    value = '';
  }
</script>

<form
  on:submit|preventDefault={onSubmit}
  class="chat">
  <div class="chat-input">
    <div use:Ripple={{ surface: true }}>
      <input
        type="text"
        placeholder="Aa"
        bind:value
      />
    </div>
    <span use:Ripple={{ surface: true }}>
      <button>
        {#if value === ''}
          <Icon name="send-outlined" width="23" height="23" />
          {:else}
            <Icon name="send-filled" width="23" height="23" />
        {/if}
      </button>
    </span>
  </div>
</form>

<style lang="scss">
  .chat {
    .chat-input {
      position: relative;
      div {
        border-radius: 50px;
        input {
          cursor: pointer;
          width: 100%;
          height: 30px;
          border-radius: 50px;
          padding: 15px;
          border: 1.5px solid $primary-color-default;
          outline: none;
          font-size: 1rem;
        }
      }
      span {
        position: absolute;
        bottom: 50%;
        right: 0;
        transform: translate(0, 50%);
        border-radius: 30px;
        width: 32px;
        height: 32px;
        button {
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          cursor: pointer;
          :global(svg) {
            vertical-align: middle;
          }
        }
      }
    }
  }
</style>