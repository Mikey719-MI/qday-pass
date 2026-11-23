import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { network } from "hardhat";

describe("QDayPass", async () => {
  // Runs on Hardhat's simulated network; no QoreChain endpoint is needed.
  const { viem } = await network.create();

  it("starts with no passes", async () => {
    const pass = await viem.deployContract("QDayPass");
    assert.equal(await pass.read.totalPasses(), 0n);
  });

  it("claims a pass and records holder, name and order", async () => {
    const pass = await viem.deployContract("QDayPass");
    const [holder] = await viem.getWalletClients();

    await viem.assertions.emit(pass.write.claimPass(["Mikey"]), pass, "PassClaimed");

    const [name, claimedAt, exists] = (await pass.read.getPass([
      holder.account.address,
    ])) as unknown as [string, bigint, boolean];
    assert.equal(name, "Mikey");
    assert.ok(claimedAt > 0n);
    assert.equal(exists, true);
    assert.equal(await pass.read.totalPasses(), 1n);
    const holderAt0 = (await pass.read.holderAt([0n])) as unknown as string;
    assert.equal(holderAt0.toLowerCase(), holder.account.address.toLowerCase());
  });

  it("rejects a second claim from the same address", async () => {
    const pass = await viem.deployContract("QDayPass");
    await pass.write.claimPass(["Mikey"]);
    await assert.rejects(pass.write.claimPass(["Mikey again"]));
  });

  it("rejects an empty name", async () => {
    const pass = await viem.deployContract("QDayPass");
    await assert.rejects(pass.write.claimPass([""]));
  });
});
