function App() {
  return (
    <>
      <div>
        <h1>Scriptly</h1>
        <p className=" font-extrabold">
          Welcome to Scriptly, your AI-powered script writing assistant!
        </p>
        <p>Start by creating a new script or uploading an existing one.</p>
        <button onClick={() => alert("Create New Script")}>
          Create New Script
        </button>
        <button onClick={() => alert("Upload Script")}>Upload Script</button>
      </div>
    </>
  );
}

export default App;
