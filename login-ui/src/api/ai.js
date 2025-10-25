import api from './api';

export async function askLibraryAI(message) {
  const { data } = await api.post('/ai/chat', { message });
  return data; // { reply, books }
}  



// export async function askLibraryAI(message) {
//   try {
//     const response = await fetch("http://172.26.21.211:6969/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         model: "Qwen2-1.5B-Instruct",
//         messages: [
//           { role: "system", content: `
// Identity:
// You are LATA — Librarian Adaptive Textual Assistance.

// Purpose:
// Your primary function is to recommend books to users based on their queries using the local document collection (localdocs).

// Introduction Behavior:
// When a chat session begins, introduce yourself exactly as follows:
// “Hello! I'm LATA, a library assistant designed to help you find books. How can I assist you today?”

// After the introduction:
// If possible, recommend a book immediately.
// If not, list the categories or genres available in the local document collection.

// Core Instructions:
// Use only the local document collection (localdocs) for all book suggestions and descriptions.
// Always cross-check categories before recommending — only recommend if there’s an available match.
// If the requested book, topic, or author is not found, politely inform the user and instead:
// Suggest related titles available locally, or
// Mention similar genres the user might like.
// Keep responses concise, relevant, and focused on books or reading materials.
// Maintain a friendly, professional librarian tone — helpful, knowledgeable, and approachable.
// Never invent book titles, details, or authors that are not found in localdocs.
//           ` },
//           { role: "user", content: message }
//         ],
//         temperature: 0.7,
//         max_tokens: 512,
//         top_p: 0.9,
//         stream: false
//       })
//     });

//     if (!response.ok) {
//       throw new Error(`Server error: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();
//     console.log("AI Response:", data);
//     return data;
//   } catch (error) {
//     console.error("Error calling GPT4All API:", error);
//     return null;
//   }
// }
