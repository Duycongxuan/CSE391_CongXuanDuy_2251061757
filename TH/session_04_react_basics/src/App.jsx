import ConditionalRendering from "./components/ConditionalRendering"
import ListRendering from "./components/ListRendering"
import SimpleVariables from "./components/SimpleVariables"

function App() {

  return (
    <>
    <div>
      <h1>Simple Variables</h1>
      <SimpleVariables />
    </div>
    <div>
      <h1>Conditional Rendering</h1>
      <ConditionalRendering />
    </div>
    <div>
      <h1>List Rendering</h1>
      <ListRendering />
    </div>
    </>
  )
}

export default App
