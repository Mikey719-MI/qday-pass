/**
 * claim.ts - claim the first Q-Day Pass for the deployer account.
 *
 * Run after the contract is deployed and while an EVM authorisation window is
 * open (the window covers a handful of transactions; the deploy usually leaves
 * room, otherwise run `npm run window -- open` again first):
 *
 *   PASS_NAME="Your Name" npm run claim:testnet
 *
 * The pass name comes from $PASS_NAME or defaults to the GitHub handle of
 * the author.
 */
import { readFileSync } from "node:fs";

import { network } from "hardhat";

const DEPLOYED =
  "ignition/deployments/chain-9800/deployed_addresses.json";

function deployedAddress(): string {
  const addresses = JSON.parse(readFileSync(DEPLOYED, "utf8")) as Record<
    string,
    string
  >;
  const key = Object.keys(addresses).find((k) => k.endsWith("#QDayPass"));
  const address = key ? addresses[key] : undefined;
  if (!address) {
    throw new Error(
      `QDayPass address not found in ${DEPLOYED}. Deploy first: npm run deploy:testnet`,
    );
  }
  return address;
}

// The pass name comes from $PASS_NAME (CLI args are Hardhat's own, so they
// cannot carry it). Defaults to the GitHub handle of the author.
const name = process.env.PASS_NAME ?? "Mikey719-MI";

const { viem } = await network.create();
const [wallet] = await viem.getWalletClients();
const publicClient = await viem.getPublicClient();
const qdayPass = await viem.getContractAt("QDayPass", deployedAddress() as `0x${string}`);

console.log(`Claiming a Q-Day Pass for ${wallet.account.address} as "${name}"...`);
const hash = await qdayPass.write.claimPass([name]);
console.log(`claim tx: ${hash}`);
await publicClient.waitForTransactionReceipt({ hash });
console.log("claim confirmed on chain");

const [passName, claimedAt, exists] = (await qdayPass.read.getPass([
  wallet.account.address,
])) as unknown as [string, bigint, boolean];
const total = (await qdayPass.read.totalPasses()) as unknown as bigint;
console.log(
  `pass on chain: name="${passName}" claimedAt=${claimedAt} exists=${exists} totalPasses=${total}`,
);
