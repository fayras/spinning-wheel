import { defineComponent } from "vue";
import { NButton } from "naive-ui";

export const App = defineComponent({
  setup() {

  },

  render() {
    return <div>
      <NButton onClick={() => console.log("test")}>test</NButton>
    </div>
  }
})
