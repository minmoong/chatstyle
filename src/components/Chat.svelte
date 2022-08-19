<script lang="ts">
  import { onMount } from 'svelte';
  import { usedWords } from 'src/store';
  import getNewWord from 'src/functions/getNewWord';
  import getStartWord from 'src/functions/getStartWord';
  import Ripple from '@smui/ripple';
  import Icons from './Icons.svelte';
  import getLeaderboardScore from 'src/functions/getLeaderboardScore';

  type message = {
    id: string;
    type: string;
    content: string;
    definition?: string;
    loading?: boolean;
  }

  let value = '';
  let messages: message[] = [];
  let messagesElement: HTMLDivElement;
  let sendWord: string = '';
  let isOpen = false;

  let receiveID = getRandomID();
  receiveMsg('', receiveID, undefined, true);

  onMount(async () => {
    const { startWord, definition } = await getStartWord();
    sendWord = startWord;
    changeMessages(receiveID, startWord, definition, false);
    usedWords.update(usedWords => usedWords.concat(startWord));

    console.log(await getLeaderboardScore());
  });

  function updateScroll() {
    messagesElement?.scrollTo(0, messagesElement.scrollHeight);
  }

  function changeMessages(id: string, content: string, definition?: string, loading?: boolean) {
    messages = messages.map(message => {
      if (message.id === id) {
        message.content = content;
        message.definition = definition;
        message.loading = loading;
      }
      return message;
    });
  }

  function getRandomID() {
    return (Math.random() + 1).toString(36).substring(7);
  }

  function sendMsg(msg: string, id: string) {
    messages = [...messages, { id, type: 'SEND', content: msg }];
  }

  function receiveMsg(msg: string, id: string, definition?: string, loading?: boolean) {
    messages = [...messages, { id, type: 'RECEIVE', content: msg, definition, loading }];
    const spreadScroll = setInterval(updateScroll, 100);
    setTimeout(() => clearInterval(spreadScroll), 1000);
  }

  async function onSubmit() {
    if (value === '') return;
    let word = value;
    value = '';

    let sendID = getRandomID();
    let receiveID = getRandomID();
    sendMsg(word, sendID);
    receiveMsg('', receiveID, undefined, true);

    const res = await getNewWord(sendWord, word);
    if (res.success) sendWord = res.message;
    changeMessages(receiveID, res.message, res.definition, false);
  }
</script>

<form on:submit|preventDefault={onSubmit} class="chat">
  <div class="leaderboard" class:open={isOpen}>
    <span on:click={() => isOpen = !isOpen}  use:Ripple={{ surface: true }}>
      <Icons name="arrow-expand" width="40px" height="40px" fill="#c1c1c1" />
    </span>
  </div>
  <div class="messages" bind:this={messagesElement}>
    <div class="messages-content">
      {#each messages as { type, content, definition, loading }}
        {#if type === 'SEND'}
          <div class="message message-personal">
            {content}
          </div>
          {:else if type === 'RECEIVE'}
          <div class="message" class:loading title={definition ? definition : ''}>
            <figure class="avatar">
              <Icons name="robot" class="avatar-icon" width="25px" height="25px" />
            </figure>
            {content}
            <span></span>
          </div>
        {/if}
      {/each}
    </div>
  </div>
  <div class="message-box">
    <input
      type="text"
      placeholder="보내기..."
      bind:value
    />
    <span use:Ripple={{ surface: true }}>
      <button>
        {#if value === ''}
          <Icons name="send-outlined" width="23" height="23" />
          {:else}
            <Icons name="send-filled" width="23" height="23" />
        {/if}
      </button>
    </span>
  </div>
</form>

<style lang="scss">
  .chat {
    @include desktop {
      @include absolute-center;
      width: 100%;
      height: 90vh;
      max-width: 500px;
      max-height: 700px;
    }
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border-radius: 0 0 20px 20px;
    border-top: none;
  }

  .leaderboard {
    position: absolute;
    top: -50px;
    z-index: 2;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #ccc;
    background: $primary-color-default;
    border-radius: 0 0 20px 20px;
    transition: 0.5s;

    &::after {
      @include mobile {
        width: 170px;
      }
      @include tablet {
        width: 250px;
      }
      @include desktop {
        width: 200px;
      }
      content: '';
      position: absolute;
      left: 50%;
      bottom: 5px;
      transform: translateX(-50%);
      display: block;
      width: 130px;
      height: 4px;
      border-radius: 4px;
      background: $primary-color-second;
    }

    &.open {
      position: absolute;
      height: 500px;
      z-index: 2;
    }

    span {
      position: absolute;
      top: 5px;
      right: 10px;
      display: block;
      width: 40px;
      height: 40px;
      cursor: pointer;
      border-radius: 50%;
    }
  }

  .messages {
    flex: 1 1 auto;
    overflow-y: scroll;
    overflow-x: hidden;

    .messages-content {
      padding: 0 15px;
      width: 100%;
      height: 100%;

      .message {
        @include tablet {
          font-size: 20px;
        }
        @include desktop {
          font-size: 18px;
        }
        position: relative;
        max-width: 310px;
        word-break: break-word;
        clear: both;
        float: left;
        padding: 6px 10px 7px;
        border-radius: 0 10px 10px 10px;
        background: $background-color-primary;
        margin: 8px 0;
        font-size: 15px;
        line-height: 1.4;
        margin-left: 40px;
        color: $text-primary-color;
        transform: scale(0);
        transform-origin: 0 0;
        animation: bounce 500ms linear both;

        &.loading {
          width: 50px;
          height: 30px;
          &::before {
            @include ball;
            border: none;
            animation-delay: .15s;
          }

          & span {
            display: block;
            font-size: 0;
            width: 30px;
            height: 20px;
            position: relative;

            &::before {
              @include ball;
              margin-left: -8px;
            }

            &::after {
              @include ball;
              margin-left: 8px;
              animation-delay: .3s;
            }
          }
        }

        .avatar {
          @include flex-center;
          position: absolute;
          top: 0;
          left: -40px;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: 1px solid $primary-color-default;
        }
      }

      .message-personal {
        float: right;
        text-align: right;
        border-radius: 10px 10px 0 10px;
        background: $primary-color-default;
        color: $text-color-white;
        margin: 2px 0;
      }
    }
  }

  .message-box {
    flex: 0 1 45px;
    width: 90%;
    margin: 15px auto;
    padding: 8px 0 8px 15px;
    position: relative;
    height: 14px;
    border: 1px solid #ccc;
    border-radius: 40px;
    height: 100%;
    display: flex;
    align-items: center;

    input {
      background: none;
      border: none;
      outline: none;
      font-size: 15px;
      height: 24px;
      width: 85%;
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