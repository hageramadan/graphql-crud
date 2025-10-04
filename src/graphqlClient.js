const API_URL = "http://localhost:4000/graphql"; 

export async function graphqlRequest(query, variables = {}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors.map(e => e.message).join(", "));
  }
  return result.data;
}
