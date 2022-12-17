import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"/>
      </Head>

      <main className={styles.main}>
      <p>{result}</p>
        <form onSubmit={onSubmit}>
          <textarea 
            rows="5"
            cols="100"
            type="text"
            name="animal"
            placeholder="Enter prompt..."
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <br/>
          <input type="submit" value="Submit" class="btn"/>
        </form>
      </main>
    </div>
  );
}
