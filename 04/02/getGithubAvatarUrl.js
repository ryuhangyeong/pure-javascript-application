export default async (user) => {
  if (!user) return;

  const url = `https://api.github.com/users/${user}`;

  const response = await fetch(url);

  console.log(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data.avatar_url;
};
