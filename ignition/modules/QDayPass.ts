import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

/**
 * Deploys QDayPass. On QoreChain the deployer needs a registered ML-DSA-87 key
 * and a live EVM authorisation window first (see README: npm run window open).
 */
export default buildModule("QDayPassModule", (m) => {
    const qdayPass = m.contract("QDayPass", []);
    return { qdayPass };
});
