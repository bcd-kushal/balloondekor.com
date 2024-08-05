export default function getUserHasVisited() {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `api/cookie`;
      const response: Response = await fetch(url);
      const data = await response.json();

      if (data.ok) {
        resolve(data);
      } else {
        reject([]);
      }
    } catch (err: any) {
      console.error("Error getting isVisited");
      reject([]);
    }
  });
}
