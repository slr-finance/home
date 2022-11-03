<script lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { defineComponent, h, VNode } from 'vue'

type TextGroup = { isAccent: boolean, chars: string[] }

const processText = (text: string) => {
  const groups: TextGroup[] = [{chars: [], isAccent: false}]
  let length = 0

  for (let i = 0, isAccent = false; i < text.length; i++) {
    const char = text.charAt(i)
    const isDivider = char === '|'

    isAccent = (isAccent && !isDivider) || (!isAccent && isDivider)
    
    let lastGroup = groups[groups.length - 1]
    const needCreateNewGroup = lastGroup.isAccent !== isAccent
            
    if (needCreateNewGroup) {
      lastGroup = {isAccent , chars: []}

      groups.push(lastGroup)
    } else {
      lastGroup.chars.push(char)

      length++
    }
  }

  return {
    groups,
    length,
  }
}

const getTextVNodes = (groups: TextGroup[], maxLength: number) => {
  const textVnodes:VNode[] = []

  for (let index = 0, charIndex = 0; index < groups.length && charIndex < maxLength; index++) {
    textVnodes.push(
      h('span', { className: `ui-typing-text${groups[index].isAccent ? '-accent' : ''}` }, groups[index].chars.slice(0, Math.max(0, maxLength - charIndex)).join(''))
    )

    charIndex += groups[index].chars.length
  }

  return textVnodes
}

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const rootRef = ref<HTMLDivElement>()
    const isShownRef = ref(false)
    const groups = ref<TextGroup[]>([])

    const maxLength = ref(0)
    
    let totalTextLength = ref(0)
    let timerId: NodeJS.Timer

    const stopTyping = () => {
      clearTimeout(timerId)
    }

    const reset = () => {
      stopTyping()
      maxLength.value = 0
    }

    const startTyping = () => {
      timerId = setInterval(() => {
        const newMaxLength = maxLength.value + 1
        maxLength.value = newMaxLength

        if (newMaxLength >= totalTextLength.value) {
          stopTyping()
        }
      }, 50)
    }

    watch([() => props.text, isShownRef], ([text, isShown]) => {
      reset()

      const processedText = processText(text)

      groups.value = processedText.groups
      totalTextLength.value = processedText.length
  
      if (isShown) {
        startTyping()
      }
    }, { immediate: true })

    const { stop } = useIntersectionObserver(rootRef, ([{isIntersecting}]) => {
      if (isIntersecting) {
        isShownRef.value = true
  
        stop()
      }
    }, { threshold: 1 })

    return { groups, maxLength, totalTextLength, rootRef }
  },
  render() {
    const {maxLength, groups, totalTextLength} = this
    const textVnodes = getTextVNodes(groups, maxLength)
    const fullTextVNodes = getTextVNodes(groups, totalTextLength)

    return h(
      'div',
      {
        ref: (el) => this.rootRef = el,
      },
      h(
        'div',
        { className: 'relative' },
        [
          h('div', {className: 'absolute'}, textVnodes),
          h('div', {className: 'opacity-0'}, fullTextVNodes),
        ],
      ),
    )
  }
})
</script>

<style scoped>
.ui-typing-text-accent,
.ui-typing-text {
  @apply selection:bg-green-atomic selection:bg-opacity-50 selection:text-white;
}

.ui-typing-text {
  @apply text-gray;
}
.ui-typing-text-accent {
  @apply text-white;
}
</style>