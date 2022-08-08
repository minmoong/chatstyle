<script lang="ts">
  import Ripple from '@smui/ripple';
  import Icon from 'src/util/Icon.svelte';

  let value = '';

  function getAnswer(question: string) {
    // NLP Model Here ...
  }

  function onSubmit() {
    if (value === '') return;

    console.log(value);
    value = '';
  }
</script>

<!-- <form
  on:submit|preventDefault={onSubmit}
  class="chat">
  <div class="chat-title">
  </div>
  <div class="messages">
  </div>
  <div class="chat-input">
    <div use:Ripple={{ surface: true }}>
      <input
        type="text"
        placeholder="Message"
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
</form> -->

<form on:submit|preventDefault={onSubmit} class="chat">
  <div class="chat-title">
    <h1>민뭉</h1>
    <h2>당신의 AI 아바타</h2>
    <figure class="avatar">
      <Icon name="robot" class="avatar-icon" width="80px" height="80px" />
    </figure>
  </div>
  <div class="messages">
    <div class="messages-content"></div>
  </div>
  <div class="message-box">
    <input
      type="text"
      placeholder="메시지 보내기..."
      bind:value
    />
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
    @include absolute-center;
    width: 100%;
    height: 80vh;
    max-width: 400px;
    max-height: 600px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border-radius: 20px;
    border: 2px solid $primary-color-default;
  }

  .chat-title {
    flex: 0 1 45px;
    position: relative;
    width: 100%;
    border-bottom: 1px solid #ccc;
    color: $text-secondary-color;
    padding: 60px 0 5px;
    text-align: center;

    h1,
    h2 {
      font-size: 20px;
      margin: 0;
      padding: 0;
    }

    h2 {
      font-weight: normal;
      font-size: 15px;
      letter-spacing: 1px;
    }

    .avatar {
      @include flex-center;
      position: absolute;
      left: 0;
      top: -50px;
      right: 0;
      margin: auto;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 2px solid $primary-color-default;
      background: #fff;
    }
  }

  .messages {
    flex: 1 1 auto;
  }

  .message-box {
    flex: 0 1 45px;
    width: 90%;
    margin: 0 auto;
    padding: 10px 0px 10px 15px;
    position: relative;
    height: 14px;
    border: 1px solid #ccc;
    border-radius: 20px;
    bottom: 15px;

    input {
      background: none;
      border: none;
      outline: none;
      font-size: 15px;
      height: 24px;
      padding-right: 20px;
      width: 265px;
      color: $text-primary-color;
    }

    span {
      position: absolute;
      top: 50%;
      right: -5px;
      transform: translateY(-50%);
      border-radius: 50%;
      button {
        @include flex-center;
        border: none;
        outline: none;
        width: 60px;
        height: 60px;
        background: transparent;
        cursor: pointer;
      }
    }
  }
</style>