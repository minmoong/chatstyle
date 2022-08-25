<script lang="ts">
  import { browser } from '$app/env';

  let showModal: boolean;
	let checked = false;

  if (browser) {
    if (localStorage.showModal === undefined) {
      showModal = true;
      localStorage.showModal = true;
    } else if (localStorage.showModal === 'false') {
      showModal = false;
    } else {
      showModal = true;
    }
  }
</script>

<div class="help">
	{#if showModal}
		<div class="modal">
			<div class="body">
				<div class="title">플레이 방법 😎</div>
				<div class="desc">
          1. 로봇의 단어를 이은 <span class="highlight">단어 길이에 비례한 랜덤 점수</span> 만큼 증가합니다. <br />
          2. 만약 로봇을 이겼을 경우 <span class="highlight">1,000점</span>이 주어집니다!
				</div>
				<div class="checkbox">
					<input type="checkbox" id="cb" bind:checked />
					<label for="cb">다시 열지 않음</label>
				</div>
				<div
					class="button focus-shadow"
					on:click={() => {
						if (checked) {
							localStorage.showModal = false;
							showModal = false;
						} else {
							showModal = false;
						}
					}}>확인</div>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.2);
    padding: 20px;
		.body {
			position: relative;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			min-width: 250px;
      max-width: 400px;
      width: 100%;
			border-radius: 10px;
			text-align: center;
			background: white;
			padding: 20px;
			.title {
				font-size: 20px;
				margin-bottom: 30px;
        font-weight: bold;
			}
			.desc {
				font-weight: bold;
				margin-bottom: 30px;
				.highlight {
					color: $color-default;
					text-decoration: underline;
				}
			}
			.checkbox {
				margin-bottom: 20px;
			}
			.button {
				padding: 10px;
				background: $color-default;
				color: #fff;
				cursor: pointer;
				font-size: 14px;
				border-radius: 10px;
			}
		}
	}
</style>