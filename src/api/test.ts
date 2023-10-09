import axios from "axios";

// [https?,port][]
export const TEST_MODES: [boolean, number][] = [
  [true, 443],
  [false, 3333],
  [true, 80],
  [false, 80],
  [true, 3333],
];

export async function testConnection(
  server: string,
  authCode: string = ""
): Promise<string | false> {
  for (let i = 0; i < TEST_MODES.length; i++) {
    const proto = `http${TEST_MODES[i][0] ? "s" : ""}`;
    const port = TEST_MODES[i][1];
    const url = `${proto}://${server}:${port}/users/get?ac=${authCode}`;

    try {
      await axios.get(url, {});

      return `${proto}://${server}:${port}/`;
    } catch {
      continue;
    }
  }

  return false;
}
